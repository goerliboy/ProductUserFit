import { questions } from './questions';

export interface PeerProduct {
  name: string;
  category: string;
  website: string;
  twitter: string;
  logo: string;
}

// Get products based on difficulty level (1-10)
const getProductsByDifficulty = (difficulty: number): PeerProduct[] => {
  const difficultyMap: Record<number, PeerProduct[]> = {
    1: [
      {
        name: "PayPal Crypto",
        category: "Onramp",
        website: "https://paypal.com",
        twitter: "https://twitter.com/PayPal",
        logo: "https://logo.clearbit.com/paypal.com"
      },
      {
        name: "Robinhood Crypto",
        category: "Onramp",
        website: "https://robinhood.com",
        twitter: "https://twitter.com/RobinhoodApp",
        logo: "https://logo.clearbit.com/robinhood.com"
      },
      {
        name: "Revolut Crypto",
        category: "Onramp",
        website: "https://revolut.com",
        twitter: "https://twitter.com/RevolutApp",
        logo: "https://logo.clearbit.com/revolut.com"
      },
      {
        name: "Venmo Crypto",
        category: "Onramp",
        website: "https://venmo.com",
        twitter: "https://twitter.com/Venmo",
        logo: "https://logo.clearbit.com/venmo.com"
      },
      {
        name: "MoonPay",
        category: "Onramp",
        website: "https://moonpay.com",
        twitter: "https://twitter.com/moonpay",
        logo: "https://i.ibb.co/Kc211ZwB/moonpay-logo.jpg"
      }
    ],
    2: [
      {
        name: "Coinbase",
        category: "Exchange",
        website: "https://www.coinbase.com/",
        twitter: "https://x.com/coinbase",
        logo: "https://logo.clearbit.com/coinbase.com"
      },
      {
        name: "Binance",
        category: "Exchange",
        website: "https://www.binance.com/",
        twitter: "https://x.com/binance",
        logo: "https://logo.clearbit.com/binance.com"
      },
      {
        name: "Kraken",
        category: "Exchange",
        website: "https://www.kraken.com/",
        twitter: "https://x.com/krakenfx",
        logo: "https://logo.clearbit.com/kraken.com"
      },
      {
        name: "Gemini",
        category: "Exchange",
        website: "https://www.gemini.com/",
        twitter: "https://x.com/gemini",
        logo: "https://logo.clearbit.com/gemini.com"
      },
      {
        name: "OKX",
        category: "Exchange",
        website: "https://www.okx.com/",
        twitter: "https://x.com/okx",
        logo: "https://i.ibb.co/wFzJF2TN/okx-logo.jpg"
      }
    ],
    3: [
      {
        name: "Infinex",
        category: "DeFi",
        website: "https://infinex.xyz/",
        twitter: "https://x.com/infinex",
        logo: "https://i.ibb.co/20RqVZrM/infinex-logo.jpg"
      },
      {
        name: "Defi App",
        category: "DeFi",
        website: "https://defi.app/",
        twitter: "https://x.com/defidotapp",
        logo: "https://i.ibb.co/5gWZySv4/defi-logo.jpg"
      },
      {
        name: "Argent Wallet",
        category: "Wallet",
        website: "https://argent.xyz",
        twitter: "https://twitter.com/argentHQ",
        logo: "https://i.ibb.co/hR96XDJC/argent-logo.jpg"
      },
      {
        name: "Phantom",
        category: "Wallet",
        website: "https://phantom.app",
        twitter: "https://twitter.com/phantom",
        logo: "https://logo.clearbit.com/phantom.app"
      },
      {
        name: "Farcaster",
        category: "Social",
        website: "https://farcaster.xyz/",
        twitter: "https://x.com/farcaster_xyz",
        logo: "https://logo.clearbit.com/farcaster.xyz"
      },
      {
        name: "Zora",
        category: "Social",
        website: "https://zora.co/",
        twitter: "https://x.com/zora",
        logo: "https://logo.clearbit.com/zora.co"
      }
    ],
    4: [
      {
        name: "MetaMask",
        category: "Wallet",
        website: "https://metamask.io",
        twitter: "https://twitter.com/MetaMask",
        logo: "https://i.ibb.co/PZrP30Cn/metamask-logo.jpg"
      },
      {
        name: "Coinbase Wallet",
        category: "Wallet",
        website: "https://wallet.coinbase.com/",
        twitter: "https://x.com/CoinbaseWallet",
        logo: "https://logo.clearbit.com/coinbase.com"
      },
      {
        name: "Rabby Wallet",
        category: "Wallet",
        website: "https://rabby.io/",
        twitter: "https://x.com/Rabby_io",
        logo: "https://logo.clearbit.com/rabby.io"
      },
      {
        name: "Rainbow",
        category: "Wallet",
        website: "https://rainbow.me",
        twitter: "https://twitter.com/rainbowdotme",
        logo: "https://logo.clearbit.com/rainbow.me"
      },
      {
        name: "ENS",
        category: "Identity",
        website: "https://ens.domains/",
        twitter: "https://x.com/ensdomains",
        logo: "https://logo.clearbit.com/ens.domains"
      },
      {
        name: "Bankr Bot",
        category: "DeFAI",
        website: "https://bankr.bot/",
        twitter: "https://x.com/bankrbot",
        logo: "https://i.ibb.co/BH00LhNm/bankr-logo.jpg"
      }
    ],
    5: [
      {
        name: "Uniswap",
        category: "DEX",
        website: "https://uniswap.org",
        twitter: "https://twitter.com/Uniswap",
        logo: "https://i.ibb.co/W491dPqK/uniswap-logo.jpg"
      },
      {
        name: "OpenSea",
        category: "NFT",
        website: "https://opensea.io",
        twitter: "https://twitter.com/opensea",
        logo: "https://i.ibb.co/Hf4hM15X/opensea-logo.png"
      },
      {
        name: "PancakeSwap",
        category: "DEX",
        website: "https://pancakeswap.finance",
        twitter: "https://twitter.com/PancakeSwap",
        logo: "https://logo.clearbit.com/pancakeswap.finance"
      },
      {
        name: "Stargate",
        category: "Bridge",
        website: "https://stargate.finance",
        twitter: "https://twitter.com/StargateFinance",
        logo: "https://logo.clearbit.com/stargate.finance"
      },
      {
        name: "Layerswap",
        category: "Bridge",
        website: "https://layerswap.io/",
        twitter: "https://x.com/layerswap",
        logo: "https://logo.clearbit.com/layerswap.io"
      }
    ],
    6: [
      {
        name: "Hyperliquid",
        category: "Layer 1",
        website: "https://hyperliquid.xyz",
        twitter: "https://twitter.com/hyperliquid_x",
        logo: "https://logo.clearbit.com/hyperliquid.xyz"
      },
      {
        name: "dYdX",
        category: "Perpetuals",
        website: "https://dydx.exchange",
        twitter: "https://twitter.com/dYdX",
        logo: "https://logo.clearbit.com/dydx.exchange"
      },
      {
        name: "Synthetix",
        category: "DeFi",
        website: "https://synthetix.io",
        twitter: "https://twitter.com/synthetix_io",
        logo: "https://logo.clearbit.com/synthetix.io"
      },
      {
        name: "Virtuals Protocol",
        category: "Launchpad",
        website: "https://virtuals.io",
        twitter: "https://twitter.com/virtuals_io",
        logo: "https://logo.clearbit.com/virtuals.io"
      },
      {
        name: "Safe Wallet",
        category: "Wallet",
        website: "https://safe.global/",
        twitter: "https://x.com/safe",
        logo: "https://logo.clearbit.com/safe.global"
      }
    ],
    7: [
      {
        name: "Aave",
        category: "DeFi",
        website: "https://aave.com",
        twitter: "https://twitter.com/AaveAave",
        logo: "https://logo.clearbit.com/aave.com"
      },
      {
        name: "Lido",
        category: "DeFi",
        website: "https://lido.fi",
        twitter: "https://twitter.com/LidoFinance",
        logo: "https://i.ibb.co/1fpMNxDh/lido-logo.jpg"
      },
      {
        name: "Pendle",
        category: "DeFi",
        website: "https://pendle.finance",
        twitter: "https://twitter.com/pendle_fi",
        logo: "https://logo.clearbit.com/pendle.finance"
      },
      {
        name: "Curve Finance",
        category: "DeFi",
        website: "https://curve.finance",
        twitter: "https://twitter.com/CurveFinance",
        logo: "https://logo.clearbit.com/curve.fi"
      },
      {
        name: "EigenLayer",
        category: "Restaking",
        website: "https://eigenlayer.xyz",
        twitter: "https://twitter.com/eigenlayer",
        logo: "https://i.ibb.co/gLGM84y8/eigen-logo.jpg"
      }
    ],
    8: [
      {
        name: "Chainlink",
        category: "Oracle",
        website: "https://chain.link",
        twitter: "https://twitter.com/chainlink",
        logo: "https://logo.clearbit.com/chain.link"
      },
      {
        name: "The Graph",
        category: "Indexing",
        website: "https://thegraph.com",
        twitter: "https://twitter.com/graphprotocol",
        logo: "https://logo.clearbit.com/thegraph.com"
      },
      {
        name: "Infura",
        category: "Node",
        website: "https://infura.io",
        twitter: "https://twitter.com/infura_io",
        logo: "https://logo.clearbit.com/infura.io"
      },
      {
        name: "Alchemy",
        category: "Infra",
        website: "https://alchemy.com",
        twitter: "https://twitter.com/alchemyplatform",
        logo: "https://logo.clearbit.com/alchemy.com"
      },
      {
        name: "Biconomy",
        category: "Infra",
        website: "https://biconomy.io",
        twitter: "https://twitter.com/biconomy",
        logo: "https://logo.clearbit.com/biconomy.io"
      }
    ],
    9: [
      {
        name: "OP Stack",
        category: "Layer 2",
        website: "https://optimism.io",
        twitter: "https://twitter.com/optimismFND",
        logo: "https://logo.clearbit.com/optimism.io"
      },
      {
        name: "StarkNet",
        category: "Layer 2",
        website: "https://www.starknet.io/",
        twitter: "https://x.com/Starknet",
        logo: "https://logo.clearbit.com/starknet.io"
      },
      {
        name: "Solana",
        category: "Layer 1",
        website: "https://solana.com/",
        twitter: "https://x.com/solana",
        logo: "https://logo.clearbit.com/solana.com"
      },
      {
        name: "Celestia",
        category: "Data Availablity",
        website: "https://celestia.org",
        twitter: "https://twitter.com/CelestiaOrg",
        logo: "https://logo.clearbit.com/celestia.org"
      },
      {
        name: "MegaETH",
        category: "Layer 2",
        website: "https://megaeth.com",
        twitter: "https://twitter.com/megaeth_xyz",
        logo: "https://i.ibb.co/4Rm51dk4/megaeth-logo.jpg"
      }
    ],
    10: [
      {
        name: "Flashbots MEV",
        category: "MEV",
        website: "https://flashbots.net",
        twitter: "https://twitter.com/flashbots",
        logo: "https://logo.clearbit.com/flashbots.net"
      },
      {
        name: "Geth",
        category: "Execution Client",
        website: "https://geth.ethereum.org",
        twitter: "https://twitter.com/ethdotorg",
        logo: "https://logo.clearbit.com/geth.ethereum.org"
      },
      {
        name: "Lighthouse",
        category: "Consensus Client",
        website: "https://lighthouse.sigmaprime.io",
        twitter: "https://twitter.com/sigp_io",
        logo: "https://logo.clearbit.com/lighthouse.sigmaprime.io"
      },
      {
        name: "Risc Zero",
        category: "zkVM",
        website: "https://risczero.com/",
        twitter: "https://x.com/RiscZero",
        logo: "https://i.ibb.co/XfdyxSnB/risczero-logo.jpg"
      },
      {
        name: "Noir",
        category: "Privacy",
        website: "https://noir-lang.org/",
        twitter: "https://x.com/NoirLang",
        logo: "https://i.ibb.co/CsBKYQtY/noir-logo.png"
      }
    ]
  };

  return difficultyMap[difficulty] || [];
};

export const getSimilarProducts = (score: number): PeerProduct[] => {
  // Round the score to the nearest integer
  const roundedScore = Math.round(score);
  return getProductsByDifficulty(roundedScore);
};