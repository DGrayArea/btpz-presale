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
import { setAuthority, AuthorityType } from "@solana/spl-token";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

const umi = createUmi("https://api.devnet.solana.com/"); //Replace with your QuickNode RPC Endpoint

const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([]));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

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

createAndMint(umi, {
  mint,
  authority: umi.identity,
  name: metadata.name,
  symbol: metadata.symbol,
  uri: metadata.uri,
  sellerFeeBasisPoints: percentAmount(0),
  decimals: 9,
  amount: 2_500_000_000_000_000_000n,
  tokenOwner: userWallet.publicKey,
  tokenStandard: TokenStandard.Fungible,
})
  .sendAndConfirm(umi)

  .then(() => {
    console.log(
      "Successfully minted 2.5 billion tokens (",
      mint.publicKey,
      ")"
    );
  })
  .catch((err) => {
    console.error("Error minting tokens:", err);
  });
