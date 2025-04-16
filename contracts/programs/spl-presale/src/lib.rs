use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Mint};

declare_id!("YourProgramIDHere111111111111111111111111111111");

const CLAIM_FEE_LAMPORTS: u64 = 1_000_000; // 0.001 SOL

#[program]
pub mod solana_presale {
    use super::*;

    pub fn initialize_presale(
        ctx: Context<InitializePresale>,
        token_price_lamports: u64,
        total_tokens: u64,
        owner: Pubkey,
    ) -> Result<()> {
        // Input validation
        require!(token_price_lamports > 0, PresaleError::InvalidPrice);
        require!(total_tokens > 0, PresaleError::InvalidTokenAmount);

        let state = &mut ctx.accounts.presale_state;
        state.token_mint = ctx.accounts.token_mint.key();
        state.token_price_lamports = token_price_lamports;
        state.total_tokens = total_tokens;
        state.tokens_sold = 0;
        state.is_presale_active = true;
        state.claim_started = false;
        state.fee_collector = ctx.accounts.fee_collector.key();
        state.token_vault = ctx.accounts.token_vault.key();
        state.buy_receiver = ctx.accounts.buy_receiver.key();
        state.owner = owner;
        Ok(())
    }

    pub fn buy_tokens(ctx: Context<BuyTokens>, amount_in_lamports: u64) -> Result<()> {
        let state = &mut ctx.accounts.presale_state;
        require!(state.is_presale_active, PresaleError::PresaleEnded);

        let max_tokens = amount_in_lamports / state.token_price_lamports;
        let available_tokens = state.total_tokens - state.tokens_sold;
        let tokens_to_give = max_tokens.min(available_tokens);
        let actual_cost = tokens_to_give * state.token_price_lamports;
        
        require!(tokens_to_give > 0, PresaleError::NotEnoughTokens);

        state.tokens_sold += tokens_to_give;

        ctx.accounts.user_state.buyer = ctx.accounts.buyer.key();
        ctx.accounts.user_state.purchased_tokens += tokens_to_give;

        // Process payment
        **ctx.accounts.buyer.try_borrow_mut_lamports()? -= actual_cost;
        **ctx.accounts.buy_receiver.try_borrow_mut_lamports()? += actual_cost;

        // Process refund if necessary
        process_refund(
            ctx.accounts.buyer.to_account_info(),
            amount_in_lamports,
            actual_cost
        )?;

        Ok(())
    }

    pub fn end_presale(ctx: Context<EndPresale>) -> Result<()> {
        // Check that the caller is the owner
        require!(
            ctx.accounts.presale_state.owner == ctx.accounts.owner.key(),
            PresaleError::Unauthorized
        );
        
        let state = &mut ctx.accounts.presale_state;
        state.is_presale_active = false;
        state.claim_started = true;
        Ok(())
    }

    pub fn claim_tokens(ctx: Context<ClaimTokens>) -> Result<()> {
        let state = &ctx.accounts.presale_state;
        let user = &mut ctx.accounts.user_state;

        require!(!state.is_presale_active, PresaleError::PresaleStillActive);
        require!(state.claim_started, PresaleError::ClaimNotStarted);
        require!(user.purchased_tokens > 0, PresaleError::NoTokensToClaim);
        require!(!user.has_claimed, PresaleError::AlreadyClaimed);
        require!(
            ctx.accounts.buyer.lamports() >= CLAIM_FEE_LAMPORTS,
            PresaleError::InsufficientClaimFee
        );

        **ctx.accounts.buyer.try_borrow_mut_lamports()? -= CLAIM_FEE_LAMPORTS;
        **ctx.accounts.fee_collector.try_borrow_mut_lamports()? += CLAIM_FEE_LAMPORTS;

        let cpi_accounts = Transfer {
            from: ctx.accounts.token_vault.to_account_info(),
            to: ctx.accounts.buyer_token_account.to_account_info(),
            authority: ctx.accounts.vault_authority.clone(),
        };
        
        // Using presale state key as part of the seed for better uniqueness
        let vault_seeds = &[
            b"vault", 
            ctx.accounts.presale_state.to_account_info().key.as_ref(),
            &[ctx.bumps.vault_authority]
        ];
        let signer = &[&vault_seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                cpi_accounts,
                signer,
            ),
            user.purchased_tokens,
        )?;

        user.has_claimed = true;
        Ok(())
    }

    pub fn withdraw_unsold_tokens(ctx: Context<WithdrawUnsoldTokens>) -> Result<()> {
        let state = &ctx.accounts.presale_state;

        require!(!state.is_presale_active, PresaleError::PresaleStillActive);
        require!(state.claim_started, PresaleError::ClaimNotStarted);

        let vault_balance = ctx.accounts.vault.amount;
        require!(vault_balance > 0, PresaleError::NothingToWithdraw);

        // Using presale state key as part of the seed for better uniqueness
        let signer_seeds: &[&[u8]] = &[
            b"vault",
            ctx.accounts.presale_state.to_account_info().key.as_ref(),
            &[ctx.bumps.vault_authority],
        ];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.owner_token_account.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        };

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            &[signer_seeds],
        );

        token::transfer(cpi_ctx, vault_balance)?;
        Ok(())
    }
}

// Helper function to process refunds
fn process_refund(
    buyer: AccountInfo,
    amount_paid: u64,
    actual_cost: u64
) -> Result<()> {
    let refund = amount_paid.checked_sub(actual_cost)
    .ok_or(PresaleError::ArithmeticOverflow)?;
    
    if refund > 0 {
        **buyer.try_borrow_mut_lamports()? += refund;
    }
    
    Ok(())
}

#[derive(Accounts)]
#[instruction(token_price_lamports: u64, total_tokens: u64, owner: Pubkey)]
pub struct InitializePresale<'info> {
    #[account(
        init, 
        payer = payer, 
        space = 8 + // discriminator
               32 + // token_mint: Pubkey
               8 +  // token_price_lamports: u64
               8 +  // total_tokens: u64
               8 +  // tokens_sold: u64
               1 +  // is_presale_active: bool
               1 +  // claim_started: bool
               32 + // fee_collector: Pubkey
               32 + // token_vault: Pubkey
               32 + // buy_receiver: Pubkey
               32,  // owner: Pubkey
        seeds = [b"presale"], 
        bump
    )]
    pub presale_state: Account<'info, PresaleState>,
    pub token_mint: Account<'info, Mint>,
    #[account(mut)]
    pub token_vault: Account<'info, TokenAccount>,
    /// CHECK: Used only as a recipient of fees
    pub fee_collector: AccountInfo<'info>,
    /// CHECK: The receiver of SOL from buys
    pub buy_receiver: AccountInfo<'info>,
    /// CHECK: Owner passed in from frontend
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyTokens<'info> {
    #[account(mut, seeds = [b"presale"], bump)]
    pub presale_state: Account<'info, PresaleState>,
    #[account(
        init_if_needed, 
        payer = buyer, 
        space = 8 + // discriminator
               32 + // buyer: Pubkey
               8 +  // purchased_tokens: u64
               1,   // has_claimed: bool
        seeds = [b"user", buyer.key().as_ref()], 
        bump
    )]
    pub user_state: Account<'info, UserState>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    /// CHECK: Receiver of the SOL
    #[account(mut)]
    pub buy_receiver: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct EndPresale<'info> {
    #[account(mut, seeds = [b"presale"], bump)]
    pub presale_state: Account<'info, PresaleState>,
    #[account(mut)]
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct ClaimTokens<'info> {
    #[account(mut, seeds = [b"presale"], bump)]
    pub presale_state: Account<'info, PresaleState>,
    #[account(mut, seeds = [b"user", buyer.key().as_ref()], bump)]
    pub user_state: Account<'info, UserState>,
    #[account(mut)]
    pub token_vault: Account<'info, TokenAccount>,
    /// CHECK: Used as vault signer
    #[account(
        seeds = [
            b"vault", 
            presale_state.to_account_info().key.as_ref()
        ], 
        bump
    )]
    pub vault_authority: AccountInfo<'info>,
    #[account(mut)]
    pub buyer_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    /// CHECK: Fee receiver
    #[account(mut)]
    pub fee_collector: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct WithdrawUnsoldTokens<'info> {
    #[account(mut, has_one = owner)]
    pub presale_state: Account<'info, PresaleState>,

    #[account(mut, address = presale_state.owner)]
    pub owner: Signer<'info>,

    /// CHECK: Vault authority PDA
    #[account(
        seeds = [
            b"vault", 
            presale_state.to_account_info().key.as_ref()
        ],
        bump
    )]
    pub vault_authority: UncheckedAccount<'info>,

    #[account(
        mut,
        associated_token::mint = presale_state.token_mint,
        associated_token::authority = vault_authority,
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub owner_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[account]
pub struct PresaleState {
    pub token_mint: Pubkey,
    pub token_price_lamports: u64,
    pub total_tokens: u64,
    pub tokens_sold: u64,
    pub is_presale_active: bool,
    pub claim_started: bool,
    pub fee_collector: Pubkey,
    pub token_vault: Pubkey,
    pub buy_receiver: Pubkey,
    pub owner: Pubkey,
}

#[account]
pub struct UserState {
    pub buyer: Pubkey,
    pub purchased_tokens: u64,
    pub has_claimed: bool,
}

#[error_code]
pub enum PresaleError {
    #[msg("Presale has ended.")]
    PresaleEnded,
    #[msg("Presale is still active.")]
    PresaleStillActive,
    #[msg("You already claimed your tokens.")]
    AlreadyClaimed,
    #[msg("No tokens to claim.")]
    NoTokensToClaim,
    #[msg("Not enough tokens left.")]
    NotEnoughTokens,
    #[msg("Insufficient claim fee.")]
    InsufficientClaimFee,
    #[msg("Claim phase has not started.")]
    ClaimNotStarted,
    #[msg("Nothing to withdraw.")]
    NothingToWithdraw,
    #[msg("Unauthorized operation.")]
    Unauthorized,
    #[msg("Token price must be greater than zero.")]
    InvalidPrice,
    #[msg("Total tokens must be greater than zero.")]
    InvalidTokenAmount,
    #[msg("Arithmetic overflow occurred.")]
    ArithmeticOverflow,
}