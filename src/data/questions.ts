export interface OptionType {
  label: string;
  text: string;
  weight: number;
}

export interface QuestionType {
  id: number;
  category: string;
  text: string;
  options: OptionType[];
}

export const questions: QuestionType[] = [
  // I. Product Concept Clarity
  {
    id: 0,
    category: "Product Concept Clarity",
    text: "How easily can someone understand your product's core value proposition without crypto knowledge?",
    options: [
      { label: "A", text: "Instantly clear, solves a universal problem with an invisible crypto backend.", weight: 1 },
      { label: "B", text: "Clear with a brief explanation, relates to a familiar web2 concept.", weight: 3 },
      { label: "C", text: "Understandable if they know basic crypto concepts.", weight: 5 },
      { label: "D", text: "Requires understanding of a specific crypto niche (e.g. DeFi, NFTs).", weight: 6 },
      { label: "E", text: "Relies on understanding multiple crypto concepts and their interplay.", weight: 8 },
      { label: "F", text: "Highly abstract or theoretical, requires deep crypto expertise to comprehend its value.", weight: 10 }
    ]
  },
  {
    id: 1,
    category: "Product Concept Clarity",
    text: "How many new concepts must a user learn to understand what your product does?",
    options: [
      { label: "A", text: "Zero to one; it's analogous to existing fintech services.", weight: 1 },
      { label: "B", text: "A few basic crypto concepts (e.g. wallet, transaction).", weight: 3 },
      { label: "C", text: "Some crypto concepts specific to your domain (e.g. staking, liquidity pool, trading).", weight: 5 },
      { label: "D", text: "Many new and potentially complex concepts, including niche terminology.", weight: 7 },
      { label: "E", text: "Requires a foundational education in a specific crypto subfield.", weight: 9 },
      { label: "F", text: "Requires an almost academic level of understanding of underlying theories.", weight: 10 }
    ]
  },
  // II. Industry Jargon Usage
  {
    id: 2,
    category: "Industry Jargon Usage",
    text: "How much crypto-specific jargon is present in your marketing materials and website copy?",
    options: [
      { label: "A", text: "Minimal to none; uses everyday language.", weight: 1 },
      { label: "B", text: "A few basic crypto terms, often explained or contextualized.", weight: 2 },
      { label: "C", text: "Moderate use of common crypto terms, assuming some user familiarity.", weight: 4 },
      { label: "D", text: "Frequent use of niche-specific jargon (e.g. advanced DeFi terms).", weight: 6 },
      { label: "E", text: "Heavy use of technical and advanced crypto terminology.", weight: 8 },
      { label: "F", text: "Copy is almost entirely composed of highly specialized jargon and acronyms.", weight: 10 }
    ]
  },
  {
    id: 3,
    category: "Industry Jargon Usage",
    text: "Within the product interface (UI), how prevalent is crypto jargon?",
    options: [
      { label: "A", text: "All terms are self-explanatory or common fintech terms.", weight: 1 },
      { label: "B", text: "Basic crypto terms are used but often with tooltips or guides.", weight: 2 },
      { label: "C", text: "Assumes users understand common crypto action terms (e.g. 'Swap,' 'Mint,' 'Stake').", weight: 4 },
      { label: "D", text: "Uses jargon specific to the protocol or advanced features without immediate explanation.", weight: 6 },
      { label: "E", text: "UI navigation and actions require a fluent understanding of specialized crypto terms.", weight: 8 },
      { label: "F", text: "The UI is incomprehensible without an expert-level grasp of the specific crypto domain.", weight: 10 }
    ]
  },
  // III. Onboarding Experience
  {
    id: 4,
    category: "Onboarding Experience",
    text: "What is the primary mode of guidance during onboarding?",
    options: [
      { label: "A", text: "Intuitive UI, requires no guidance (e.g. fintech app flow).", weight: 1 },
      { label: "B", text: "Minimal guided walkthroughs and interactive tooltips.", weight: 2 },
      { label: "C", text: "Step-by-step instructions, FAQs, and short video tutorials.", weight: 4 },
      { label: "D", text: "Requires reading documentation or articles; community support is important.", weight: 6 },
      { label: "E", text: "Relies on users having prior similar experiences or finding external guides.", weight: 9 },
      { label: "F", text: "No structured onboarding; users are expected to figure it out or seek expert help.", weight: 10 }
    ]
  },
  {
    id: 5,
    category: "Onboarding Experience",
    text: "What's the 'time-to-value'? How quickly can a new user experience a core benefit of your product?",
    options: [
      { label: "A", text: "Almost immediately after a very short sign-up.", weight: 1 },
      { label: "B", text: "Within a few minutes of setup (e.g. 2-3 minutes).", weight: 3 },
      { label: "C", text: "After completing initial setup and a first key action (e.g. bridging assets).", weight: 5 },
      { label: "D", text: "May take more than one session or require some waiting period (e.g. a day for staking rewards to appear).", weight: 7 },
      { label: "E", text: "Takes several days or requires significant interaction/capital commitment.", weight: 9 },
      { label: "F", text: "Value realization is long-term or dependent on complex external factors.", weight: 10 }
    ]
  },
  // IV. Wallet Knowledge
  {
    id: 6,
    category: "Wallet Knowledge",
    text: "What level of understanding of crypto wallets (e.g. MetaMask, Phantom, Argent) is required to use your product?",
    options: [
      { label: "A", text: "No wallet knowledge needed; custodial or embedded wallet.", weight: 1 },
      { label: "B", text: "User needs a wallet but only for basic 'connect' and 'approve' functions.", weight: 2 },
      { label: "C", text: "User should understand transaction signing, gas fees, and basic wallet security.", weight: 4 },
      { label: "D", text: "User needs to manage multiple assets, understand different network interactions (e.g. bridging, adding network).", weight: 6 },
      { label: "E", text: "User must be comfortable with advanced wallet features, hardware wallets, and potential contract interactions.", weight: 8 },
      { label: "F", text: "Requires deep understanding of wallet mechanics, seed phrases, derivation paths, and potential security risks of complex interactions.", weight: 10 }
    ]
  },
  {
    id: 7,
    category: "Wallet Knowledge",
    text: "How equipped is your product to help users recover from wallet-related errors?",
    options: [
      { label: "A", text: "Errors are caught before they reach the user (e.g. can't send to a contract address).", weight: 1 },
      { label: "B", text: "Product provides plain, human-readable error hints.", weight: 3 },
      { label: "C", text: "Errors are shown but users must retry actions manually. (e.g. tx failed)", weight: 5 },
      { label: "D", text: "Requires user diagnosis (e.g. nonce issues, stuck txs).", weight: 7 },
      { label: "E", text: "External tools like block explorers often needed. (e.g. check tx on Etherscan)", weight: 8 },
      { label: "F", text: "Recovery depends on advanced wallet or contract debugging. (e.g. send RAW tx via CLI)", weight: 10 }
    ]
  },
  // VI. Protocol Architecture
  {
    id: 8,
    category: "Protocol Architecture",
    text: "How much does a user need to understand about the underlying protocol architecture your product is built on?",
    options: [
      { label: "A", text: "Zero understanding required; it's completely abstracted.", weight: 1 },
      { label: "B", text: "Awareness of being on 'a blockchain' is enough.", weight: 2 },
      { label: "C", text: "Basic understanding of the specific chain's properties (e.g. 'Ethereum is slower but secure').", weight: 4 },
      { label: "D", text: "Understanding of specific technical advantages or limitations of the chosen L1/L2.", weight: 6 },
      { label: "E", text: "Requires knowledge of cross-chain bridges, L2 scaling solutions, or specific protocol integrations.", weight: 8 },
      { label: "F", text: "Deep understanding of the protocol's whitepaper, consensus, and technical trade-offs is necessary for optimal use.", weight: 10 }
    ]
  },
  {
    id: 9,
    category: "Protocol Architecture",
    text: "Are users exposed to concepts like block confirmations, MEV, or chain-level finality?",
    options: [
      { label: "A", text: "No, these are entirely hidden or irrelevant to the user experience.", weight: 1 },
      { label: "B", text: "Users might see \"pending confirmation\" but don't need to understand why.", weight: 3 },
      { label: "C", text: "Users may need to understand that transactions take time to confirm and why", weight: 5 },
      { label: "D", text: "Users might need to manually adjust gas for certain actions (e.g. DEX trading).", weight: 7 },
      { label: "E", text: "Understanding these concepts is important for power users to optimize their interactions.", weight: 8 },
      { label: "F", text: "Core functionality is deeply tied to exploiting or mitigating these low-level blockchain features.", weight: 10 }
    ]
  },
  // VII. Community Entry Barriers
  {
    id: 10,
    category: "Community Entry Barriers",
    text: "How reliant is your product on community platforms (Discord, Telegram) for support and key information?",
    options: [
      { label: "A", text: "Not reliant at all; all info and support are in-app or on the website.", weight: 1 },
      { label: "B", text: "Community is a supplementary resource for help and announcements.", weight: 3 },
      { label: "C", text: "Key information and support often first appear or are best found in community channels.", weight: 5 },
      { label: "D", text: "Active participation in the community (e.g. Discord) is almost necessary to stay updated or get support.", weight: 7 },
      { label: "E", text: "Understanding community jargon, culture, and navigating complex Discord servers is essential.", weight: 9 },
      { label: "F", text: "Product is community-governed to an extent that non-participation means missing out on critical decisions or utility.", weight: 10 }
    ]
  },
  {
    id: 11,
    category: "Community Entry Barriers",
    text: "What is the general tone and technical depth of discussions in your main community channels?",
    options: [
      { label: "A", text: "Beginner-friendly, welcoming, non-technical.", weight: 1 },
      { label: "B", text: "Mostly non-technical, but some crypto basics are assumed.", weight: 3 },
      { label: "C", text: "Mix of beginner and intermediate users; some technical discussions.", weight: 5 },
      { label: "D", text: "Predominantly crypto-savvy users; technical discussions are common.", weight: 7 },
      { label: "E", text: "Highly technical, developer-focused, or advanced DeFi strategy discussions.", weight: 9 },
      { label: "F", text: "Extremely niche or academic discussions requiring deep pre-existing knowledge.", weight: 10 }
    ]
  },
  // VIII. Developer UX
  {
    id: 12,
    category: "Developer UX",
    text: "How comprehensive and clear is your developer documentation?",
    options: [
      { label: "A", text: "N/A or no developer interaction needed.", weight: 1 },
      { label: "B", text: "Basic, clear documentation for simple integrations.", weight: 2 },
      { label: "C", text: "Good quality documentation with tutorials and examples for common use cases.", weight: 4 },
      { label: "D", text: "Extensive documentation, but may require existing blockchain development knowledge.", weight: 6 },
      { label: "E", text: "Documentation is highly technical, assumes expertise in specific languages/frameworks.", weight: 8 },
      { label: "F", text: "Sparse or overly academic documentation; requires reverse-engineering or deep expertise.", weight: 10 }
    ]
  },
  {
    id: 13,
    category: "Developer UX",
    text: "What is the learning curve for a developer to build effectively with your product?",
    options: [
      { label: "A", text: "N/A or plug-and-play; minimal learning curve.", weight: 1 },
      { label: "B", text: "Can build/integrate simple apps/tools within a day, with clear guides.", weight: 3 },
      { label: "C", text: "Requires a few days to understand key concepts and build something meaningful.", weight: 5 },
      { label: "D", text: "Steep learning curve, needing to understand new paradigms or complex APIs.", weight: 7 },
      { label: "E", text: "Requires deep specialization and significant time investment to master.", weight: 9 },
      { label: "F", text: "Extremely challenging, few developers can use it effectively without extensive prior experience.", weight: 10 }
    ]
  },
  // IX. DeFi/Crypto Primitives
  {
    id: 14,
    category: "DeFi/Crypto Primitives",
    text: "How much understanding of core DeFi primitives (e.g. AMMs, lending/borrowing, yield farming) does your product assume?",
    options: [
      { label: "A", text: "None; product might use them in the backend but it's invisible to the user.", weight: 1 },
      { label: "B", text: "User might see terms like 'Staking' but it's presented as a simple 'Earning interest'.", weight: 2 },
      { label: "C", text: "Requires basic understanding of one or two primitives. (e.g. slippage, unstaking delay).", weight: 4 },
      { label: "D", text: "Requires understanding of the interplay of several DeFi primitives (e.g. impermanent loss).", weight: 7 },
      { label: "E", text: "Assumes a strong working knowledge of advanced DeFi concepts, derivatives, or structured products.", weight: 8 },
      { label: "F", text: "Product is built for DeFi power users who can architect complex strategies using multiple primitives.", weight: 10 }
    ]
  },
  {
    id: 15,
    category: "DeFi/Crypto Primitives",
    text: "Does your product involve novel or experimental crypto mechanisms that lack established parallels?",
    options: [
      { label: "A", text: "No, it mirrors well-established traditional finance mechanisms.", weight: 1 },
      { label: "B", text: "Uses well-known basic crypto mechanisms. (e.g. AMM, staking)", weight: 3 },
      { label: "C", text: "A few minor variations on known crypto mechanisms. (e.g. onchain limit order)", weight: 5 },
      { label: "D", text: "Features experimental mechanisms that require users to learn and trust new models. (e.g. restaking with slashing risk)", weight: 7 },
      { label: "E", text: "Core functionality relies on unproven, cutting-edge crypto theories or economic models. (e.g. Olympus DAO)", weight: 9 },
      { label: "F", text: "The entire product is a research-level experiment in new crypto primitives.", weight: 10 }
    ]
  },
  // X. UI/UX Simplicity
  {
    id: 16,
    category: "UI/UX Simplicity",
    text: "How effectively does your UI/UX abstract away underlying crypto complexities?",
    options: [
      { label: "A", text: "Completely abstracts; feels like a fintech app.", weight: 1 },
      { label: "B", text: "Significant abstraction; crypto elements are present but simplified and guided.", weight: 2 },
      { label: "C", text: "Moderate abstraction; users are aware of crypto operations but don't need to be experts.", weight: 4 },
      { label: "D", text: "Some abstraction, but functional use depends on prior crypto experience.", weight: 5 },
      { label: "E", text: "Minimal abstraction; UI mirrors the underlying crypto protocol's functions and demands.", weight: 8 },
      { label: "F", text: "No abstraction; UI is a direct interface to complex blockchain operations.", weight: 10 }
    ]
  },
  {
    id: 17,
    category: "UI/UX Simplicity",
    text: "How forgiving is the UI/UX to user errors? Are there safeguards against common crypto mistakes?",
    options: [
      { label: "A", text: "Extensive safeguards, clear warnings, reversible actions where possible. (e.g. contact support to recover assets)", weight: 1 },
      { label: "B", text: "Good safeguards, clear confirmations, and warnings for critical actions. (e.g. color-coded alerts)", weight: 3 },
      { label: "C", text: "Standard crypto confirmations assumes user diligence. (e.g. staking flow without lock-up warning)", weight: 5 },
      { label: "D", text: "Users need to be careful; errors can lead to loss of funds. (e.g. manual configuration of slippage or gas)", weight: 7 },
      { label: "E", text: "High risk of error for inexperienced users; UI requires precision and understanding of implications.", weight: 9 },
      { label: "F", text: "Unforgiving; small mistakes can have irreversible consequences. Product expects expert-level caution.", weight: 10 }
    ]
  }
];