import {
  percentAmount,
  generateSigner,
  signerIdentity,
  createSignerFromKeypair,
  publicKey,
} from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createAndMint,
  mplTokenMetadata,
  updateMetadataAccountV2,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  TOKEN_PROGRAM_ID,
  setAuthority,
  AuthorityType,
} from "@solana/spl-token";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

const umi = createUmi("https://api.mainnet-beta.solana.com"); //Replace with your QuickNode RPC Endpoint

const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([]));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

const userWallet1 = Keypair.fromSecretKey(new Uint8Array([]));
// Use Keypair from solana/web3.js
// Use Connection from @solana/web3.js for SPL token program actions
const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

const metadata = {
  name: "BitcoinPizza",
  symbol: "BTPZ",
  description:
    "Inspired by Bitcoin Pizza Day, $BTPZ is a fast, secure, and scalable token powered by AI-enhanced RoAI consensus. Built for DeFi, smart contracts, and the future of blockchain.",
  uri: "https://gateway.pinata.cloud/ipfs/bafkreiagima7w6igexy6entwptkmtse5dfc7mhtycuoqk6rwnlegwr7d4q",
  image:
    "https://gateway.pinata.cloud/ipfs/bafkreiagima7w6igexy6entwptkmtse5dfc7mhtycuoqk6rwnlegwr7d4q",
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplTokenMetadata());

const mintPublicKey = new PublicKey(
  "5bHcjPrRAMAue4JiMN2kGoyvq5USx8Uz4ZxkXEpnnxnN"
);

const setAuth = async () => {
  await setAuthority(
    connection, // connection
    userWallet1, // payer
    mintPublicKey, // mint address
    userWallet1.publicKey, // current mint authority
    AuthorityType.MintTokens, // revoke mint authority
    null, // new authority (null to revoke)
    [userWallet1] // signer
  );
  console.log("Mint authority revoked.");

  // Revoke Freeze Authority
  await setAuthority(
    connection, // connection
    userWallet1, // Use userWallet as Signer, not just the public key
    mintPublicKey, // mint address
    userWallet1.publicKey, // current freeze authority
    AuthorityType.FreezeAccount, // revoke freeze authority
    null, // new authority (null to revoke)
    [userWallet1] // signer
  );
  console.log("Freeze authority revoked.");
};

setAuth()
  .then(() => {
    console.log("Successfully revoked authorities.");
  })
  .catch((err) => {
    console.error("Error revoking authorities:", err);
  });

// createAndMint(umi, {
//   mint,
//   authority: umi.identity,
//   name: metadata.name,
//   symbol: metadata.symbol,
//   uri: metadata.uri,
//   sellerFeeBasisPoints: percentAmount(0),
//   decimals: 9,
//   amount: 2_500_000_000_000_000_000n,
//   tokenOwner: userWallet.publicKey,
//   tokenStandard: TokenStandard.Fungible,
// })
//   .sendAndConfirm(umi)
//   .then(async () => {
//     console.log(
//       "Successfully minted 2.5 billion tokens (",
//       mint.publicKey,
//       ")"
//     );
//     await setAuthority(
//       connection, // connection
//       userWallet1, // payer
//       mintPublicKey, // mint address
//       userWallet1.publicKey, // current mint authority
//       AuthorityType.MintTokens, // revoke mint authority
//       null, // new authority (null to revoke)
//       [userWallet1] // signer
//     );
//     console.log("Mint authority revoked.");

//     // Revoke Freeze Authority
//     await setAuthority(
//       connection, // connection
//       userWallet1, // Use userWallet as Signer, not just the public key
//       mintPublicKey, // mint address
//       userWallet1.publicKey, // current freeze authority
//       AuthorityType.FreezeAccount, // revoke freeze authority
//       null, // new authority (null to revoke)
//       [userWallet1] // signer
//     );
//     console.log("Freeze authority revoked.");
//   })
//   .catch((err) => {
//     console.error("Error minting tokens:", err);
//   });
