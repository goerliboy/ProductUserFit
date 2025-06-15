// Score interpretations based on score ranges
export const getInterpretation = (score: number): string => {
  if (score >= 1.0 && score <= 1.9) {
    return `Your product scores a ${score} on the Friction Index. It is designed to minimize friction and align with user habits from traditional finance apps. This includes a hidden or softly introduced blockchain layer. It suits users who are unfamiliar with crypto and prefer simple, guided experiences within a trusted environment.`;
  } else if (score >= 2.0 && score <= 2.9) {
    return `Your product scores a ${score} on the Friction Index. It introduces crypto in a familiar and approachable way similar to logging into a standard banking or investment app. It supports entry-level crypto usage such as buying, holding, or trading small amounts, while minimizing perceived risk through clear guidance and user-friendly design.`;
  } else if (score >= 3.0 && score <= 3.9) {
    return `Your product scores a ${score} on the Friction Index. It's designed for users who've moved beyond first-time onboarding. These individuals are curious, open to exploration, and eager to deepen their understanding. They value clarity, control, and actionable insights to guide their journey.`;
  } else if (score >= 4.0 && score <= 4.9) {
    return `Your product scores a ${score} on the Friction Index. It's for users who moved far beyond basic crypto interactions. They're seasoned participants in the ecosystem, switching between L1s and L2s, managing multiple wallets, and actively using a wide range of dapps. They value speed, autonomy, and control.`;
  } else if (score >= 5.0 && score <= 5.9) {
    return `Your product scores a ${score} on the Friction Index. It is for truly crypto-fluent users who appreciate user-friendly UX. They are highly active across chains and DeFi, and they gravitate toward products that give them more control, faster execution, and less fluff.`;
  } else if (score >= 6.0 && score <= 6.9) {
    return `Your product scores a ${score} on the Friction Index. It serves confident DeFi users who trade with size, act on insider alpha, and chase high-yield opportunities from new protocols. They're comfortable with price charts, protocol mechanics, and DeFi interfaces. Your product should help them move fast, stay informed, and act decisively with minimal friction.`;
  } else if (score >= 7.0 && score <= 7.9) {
    return `Your product scores a ${score} on the Friction Index. It's built for veteran DeFi users who operate at a high level of strategy and sophistication. They've seen multiple market cycles, actively manage complex portfolios, and demand tools that streamline execution while maximizing control.`;
  } else if (score >= 8.0 && score <= 8.9) {
    return `Your product scores a ${score} on the Friction Index. It's tailored for devs and infra experts, the kind of users building the backbone or tooling of the crypto ecosystem. They might be deploying smart contracts, running nodes, using advanced APIs, or building dapps themselves. Your product should provide a robust, flexible platform that these users can bend to their will, saving them time and headaches in the development or integration process.`;
  } else if (score >= 9.0 && score <= 9.9) {
    return `Your product scores a ${score} on the Friction Index. You're building for devs who are actively choosing a stack to launch dapps, or protocol-level primitives on L1s and L2s. They aren't browsing, they're deploying. They're selecting which chain infra to commit to, where to spend months building, and which dev ecosystems provide the shortest path from prototype to production. Their goal: ship something that scales, survives, and thrives. Your goal: remove blockers, reduce ambiguity, and make your platform the easiest decision they'll make.`;
  } else if (score === 10.0) {
    return `Your product scores a ${score} on the Friction Index. You're not just a tool, you're an integral piece of blockchain infra designed by and for the most advanced engineers in the space. Your users are protocol engineers, zero-knowledge circuit builders, MEV researchers, and client maintainers. This product is essentially a platform for experts to build further infrastructure.`;
  } else {
    return "Your product score could not be determined. Please complete the questionnaire.";
  }
};

// Ideal user profiles based on score ranges
export const getIdealUserProfile = (score: number): {
  experienceLevel: string;
  knowledgeBase: string;
  behavior: string;
  expectations: string;
} => {
  if (score >= 1.0 && score <= 1.9) {
    return {
      experienceLevel: "No crypto background. Regularly uses apps like PayPal, Venmo, or Revolut. May notice a \"Crypto\" tab but won't engage unless prompted in a familiar, risk-free way.",
      knowledgeBase: "Familiar with Bitcoin as a term, but cannot define a wallet. Terms like \"self-custody\" or \"gas fees\" are unfamiliar and likely to be ignored.",
      behavior: "Follows UI prompts without deviation. Prefers defaults and avoids making decisions that introduce complexity or uncertainty. Trusts brands with a strong reputation and high app store ratings.",
      expectations: "Wants an experience that mirrors their existing banking apps: fast results, clear actions, no surprises, and no technical vocabulary."
    };
  } else if (score >= 2.0 && score <= 2.9) {
    return {
      experienceLevel: "Comfortable using apps for trading, banking, or investing. May have used platforms like Coinbase or Binance but only for basic crypto transactions.",
      knowledgeBase: "Understands what it means to buy a coin. Likely unaware of deeper crypto functions like wallets, self-custody, or cross-chain transfers. Typically stores crypto on the exchange where it was purchased.",
      behavior: "Open to trying crypto if the benefits are clear. Avoids anything that seems technical or irreversible. Makes decisions cautiously and values reassurance, especially around security and support.",
      expectations: "Expects speed, simplicity, and safeguards. If it looks or feels like a polished fintech app, they are comfortable. They want crypto tools to be intuitive and free from unnecessary complexity."
    };
  } else if (score >= 3.0 && score <= 3.9) {
    return {
      experienceLevel: "Has dabbled in crypto, maybe bought a few coins or signed up for a wallet app. May have used an exchange or mobile wallet but still depends on guidance for most actions.",
      knowledgeBase: "Understands what a wallet is and may have heard of self-custody, but doesn't fully grasp the implications. Terms like blockchain, Ethereum, and gas fees are recognized but not internalized.",
      behavior: "Comfortable experimenting but still prefers reassurance. Will complete slightly more complex flows like transferring funds between wallets if support and instructions are clear. Avoids anything perceived as irreversible or highly technical.",
      expectations: "Looks for tools that offer flexibility without risk. Prefers a mix of automation and control. Appreciates seeing progress, learning, and some light gamification to build confidence."
    };
  } else if (score >= 4.0 && score <= 4.9) {
    return {
      experienceLevel: "These users comfortably navigate across L1s and L2s, operate multiple wallets, and regularly engage with DeFi protocols (swapping, lending, farming). They may also manage NFTs, participate in DAOs, and constantly explore new tools as they emerge.",
      knowledgeBase: "They understand the differences between wallet types (hardware vs. software), comprehend custody trade-offs, and know how to back up a seed phrase securely. They're familiar with setting custom gas fees, adjusting slippage, and may have claimed an onchain ID like ENS.",
      behavior: "They are curious and self-sufficient. Rather than relying on step-by-step instructions, they prefer to dive in and explore. They'll read a guide or consult support only when necessary. They can customize settings and are the type to provide feedback or report bugs. Any unnecessary friction can prompt them to abandon a product.",
      expectations: "They expect the product to be efficient, responsive, and fast. While they value access to information (like a tooltip explaining a new term), they demand the freedom to bypass onboarding or default flows when confident. A clean, optimized experience earns their trust and retention."
    };
  } else if (score >= 5.0 && score <= 5.9) {
    return {
      experienceLevel: "They swap assets daily on DEXs, bridge between networks, provide liquidity, farm yields, operate multiple wallets, and might rely on hardware wallets for securing large funds. They're often first movers, participating in new protocol launches and managing diversified portfolios across platforms.",
      knowledgeBase: "They understand AMMs, evaluate gas fees across networks, and assess yield strategies. They are familiar with concepts like impermanent loss and secure wallet management (e.g. multisigs or hardware), but not experts.",
      behavior: "They enter an app with a specific goal and expect to complete it quickly. They avoid apps with sluggish performance, excessive steps, or bugs, and will leave if standards aren't met. Security is a priority. If something seems off, they'll pause or disengage. They are highly vocal in communities and provide feedback.",
      expectations: "They want minimal friction: fast UIs, reliable execution, and customizable interfaces. Defaults are acceptable but must be overridable. Advanced settings should be easy to locate and configure. They appreciate transparency and subtle, non-intrusive guidance such as prompts when they're about to make suboptimal decisions."
    };
  } else if (score >= 6.0 && score <= 6.9) {
    return {
      experienceLevel: "They're comfortable with leverage trading, arbitrage trading, synthetic assets, earning yields, staking across multiple protocols, voting on governance proposals. They continue to rely on platforms that prioritize clean UI and accessible support.",
      knowledgeBase: "They are well-versed in DeFi fundamentals, able to adjust slippage, tweak leverage, and interpret gas costs. They follow protocol updates and ecosystem news closely, and they value tools with robust documentation and data-rich dashboards.",
      behavior: "They are performance-driven but cautious. They are eager to explore new markets or incentives, but only when product mechanics are transparent and intuitive. If an app is slow, buggy, or unclear, they will quickly move on. They seek tools that reward learning and allow them to deepen their engagement over time.",
      expectations: "They want responsive interfaces designed for traders, not beginners. Your product must deliver consistent uptime, trustworthy performance, and clear data displays. Information related to risk, reward, and return potential should be communicated plainly, avoiding dense or overly technical jargon."
    };
  } else if (score >= 7.0 && score <= 7.9) {
    return {
      experienceLevel: "They are deeply embedded in the DeFi ecosystem. They're fluent in lending, re-staking, governance voting, LPing, and delegating. They manage advanced workflows across chains and protocols. Crypto isn't just a tool for them, it's a system they optimize daily.",
      knowledgeBase: "They have a strong understanding of DeFi mechanics: interest rates, peg dynamics, collateralization models, and cross-chain design differences. They monitor liquidity shifts, TVL metrics, and onchain activity to guide their portfolio strategies. They're alert to where and how systems break, and they prepare accordingly.",
      behavior: "They run strategic plays and evaluate products critically, often reading docs, testing with small capital, or reaching out to teams before committing. They consume and apply long-form content, experiment with tweaks, and track performance via analytics dashboards. They manage their DeFi activities like pro: data-driven, risk-aware, and result-oriented.",
      expectations: "They expect your product to deliver composability, automation, and execution clarity. They want dashboards that simplify complexity, but with the option to drill into onchain data when needed. Features that enable deeper insight, faster execution, or capital efficiency aren't just appreciated, they're required. Integration speed is critical: if your product doesn't support trending opportunities fast enough, they'll consider it obsolete."
    };
  } else if (score >= 8.0 && score <= 8.9) {
    return {
      experienceLevel: "They are fluent in software development and crypto infra. They've shipped smart contracts, integrated with exchange APIs, deployed subgraphs, and built custom tools. Their day-to-day involves code, infra, and data pipelines.",
      knowledgeBase: "They know how to connect onchain and offchain systems. They understand query languages, node behavior, how indexing and RPC endpoints work. They've built dashboards, automation, and frontends using crypto primitives. They are system architects, not just users.",
      behavior: "They value products that save time and offer plug-and-play reliability. They want minimal setup friction, fast time-to-first-call, and straightforward docs. If your product reduces operational overhead, they'll adopt quickly and stick with it.",
      expectations: "They expect your product to be reliable, modular, and composable. Speed is important but even more so consistency. The API should do what it says and not have undocumented quirks. They want components to mix and match."
    };
  } else if (score >= 9.0 && score <= 9.9) {
    return {
      experienceLevel: "They have shipped smart contracts or apps before. They know their way around Solidity, Rust, Cairo, or Move. They've benchmarked rollup performance, written subgraphs, deployed to testnets, and might've participated in grants or bounties on different chains. They aren't core protocol engineers, but they're the critical 5% who build the dapps everyone else uses.",
      knowledgeBase: "Familiar with node infrastructure, RPC quirks, and cross-chain messaging. They care about dev tooling (e.g. Hardhat, Foundry, Anchor), Devnet uptime, contract verification, and bridging costs. They check GitHub activity before they choose a chain. If your SDK is broken, they'll file a PR, not a support ticket.",
      behavior: "They're evaluating which chain to build on this quarter, not next year. They join Devnets, apply for hackathons, and scout for Testnet incentives. They look for projects with fast, composable SDKs, real support, and clarity on what happens after launch. They prefer one good example over 20 docs pages.",
      expectations: "They expect to reach \"Hello World\" in under 10 minutes with zero setup friction. They look for ready-to-use SDK and API examples in TS, Rust, and Python, along with prebuilt configs and scaffolds for fast iteration. Responsive support via Discord, Telegram, or GitHub is essential. Clear communication around Testnet vs. Mainnet, RPC reliability and available incentives build trust."
    };
  } else if (score === 10.0) {
    return {
      experienceLevel: "They build and maintain blockchain clients, design custom cryptographic algorithms, create virtual machines or consensus mechanisms, and solve network-level issues. They may fork Geth, develop new L1/L2s, publish research on protocols, contribute to open source, and work fluently in languages like C++, Rust, and Go.",
      knowledgeBase: "They have deep expertise in VM internals (EVM bytecode, WASM), proof systems (PLONK, STARKs), and both execution and consensus layers. They're skilled with advanced dev tools, can audit complex protocols, and keep up with cutting-edge research.",
      behavior: "They build and benchmark systems locally, write custom stress tests, and analyze raw logs, memory dumps, and stack traces to find subtle issues. They file detailed bug reports, fork repos to implement improvements themselves, and actively participate in design discussions. They treat every product as an open collaboration, always pushing for enhancements and transparency.",
      expectations: "They demand complete transparency and control, no black boxes. They expect thorough architectural docs, access to source code or detailed specs, and the ability to run or inspect every component themselves. Reproducible test environments are essential for independent validation. They prefer systems that expose internals and allow configuration, even at the cost of complexity."
    };
  } else {
    return {
      experienceLevel: "Undetermined",
      knowledgeBase: "Complete the questionnaire to determine the ideal knowledge base.",
      behavior: "Complete the questionnaire to determine ideal user behavior.",
      expectations: "Complete the questionnaire to determine ideal user expectations."
    };
  }
};

// Strategic recommendations based on score ranges
export const getRecommendations = (score: number): {
  marketing: {
    main: string;
    keyAreas: string[];
    contentGuide: string[];
  };
  onboarding: {
    main: string;
    principles: string[];
  };
  growthTactics: string[];
} => {
  if (score >= 1.0 && score <= 1.9) {
    return {
      marketing: {
        main: "Present crypto as a benefit, not as a new concept. Prioritize messages around speed, safety, and familiarity. Avoid references to crypto mechanics. Instead, promote outcomes like \"Send money instantly and securely.\"",
        keyAreas: [
          "Position your crypto offering as just another feature.",
          "Stress security through mentions of regulatory compliance or insured funds.",
          "Defer any mention of technical jargon until absolutely necessary."
        ],
        contentGuide: [
          "Use visuals and relatable stories.",
          "Provide step-by-step \"How it Works\" graphics or videos with zero jargon.",
          "Showcase real testimonials from first-time users (e.g. \"I bought crypto in 2 clicks!\"). Mimic the tone of fintech content they already consume on TikTok & Youtube.",
          "Favor familiar terms (use \"account\" over \"wallet\")."
        ]
      },
      onboarding: {
        main: "Ensure crypto onboarding is passive, fast, and transparent. It should feel like any fintech setup process. Initiate wallet creation in the background as part of user registration.",
        principles: [
          "Use design patterns already common in finance apps (toggles, swipes, simple confirmation prompts).",
          "Rephrase prompts with clear value. For instance, \"Enable 2FA to protect your funds,\" instead of a security warning.",
          "Let users sign in using familiar methods (Google, Apple, or phone-based verification) rather than creating new credentials.",
          "Implement one-click actions where possible, such as \"Buy $20 of Bitcoin.\"",
          "If there's an issue (e.g. KYC delay), explain it clearly and supportively. Avoid error codes."
        ]
      },
      growthTactics: [
        "Leverage familiar habits and small rewards to spur engagement. For instance, introduce a feature like \"Round-up Investing\" (e.g. Revolut Pocket) where spare change from purchases goes into crypto, pitched as a passive way to dip their toes.",
        "Use friendly push notifications during idle moments: \"If you had bought $10 of Bitcoin a year ago, it'd be worth $X today\" as a nudge to encourage small buys (this is framing crypto in terms they understand: returns in dollars).",
        "Implement a referral program that speaks their language. Offer $5 in their currency for each friend who tries crypto – emphasize fiat value (\"get $5\" rather than \"0.0001 BTC\") to make it enticing.",
        "Integrate crypto with existing features they use. For instance, if this is an app like Revolut, have occasional promos like \"Your cashback can be received in Bitcoin – try it!\" so it doesn't feel like a separate thing.",
        "Keep educational after value realization. For instance, after they earn a bit of crypto cashback, send a message: \"That Bitcoin you earned grew 8% this month!\" to reinforce positive outcomes.",
        "Use gamified feedback like confetti on a first purchase, or immediate small rewards (like \"You just earned $1 in rewards!\") to create positive reinforcement.",
        "Subtly highlight how common this is becoming (\"Join 2 million people using XYZ for crypto\" or \"5 friends from your contacts use this feature\"). Framing it as mainstream behavior builds confidence.",
        "Handle errors gracefully and in plain language. For instance, if a transaction fails, say \"Network is busy, please try again in a few minutes\" instead of an error code; perhaps even automatically retry in the background and just notify them when done."
      ]
    };
  } else if (score >= 2.0 && score <= 2.9) {
    return {
      marketing: {
        main: "Position crypto as a mainstream financial option rather than something novel. Use the same tone and approach as a new stock trading app. Highlight reliability and accessibility over innovation.",
        keyAreas: [
          "Build trust through references to regulation, insurance, and security measures.",
          "Make comparisons to banks or traditional investment products (e.g. faster transfers, better interest rates).",
          "Acknowledge market volatility but reinforce tools that help users manage it such as price alerts or stablecoins."
        ],
        contentGuide: [
          "Produce short educational videos (e.g. \"How to buy crypto,\" \"How to stay safe\").",
          "Share guided tutorials with screenshots and concise captions.",
          "Address key concerns through FAQs (\"What happens if I lose access?\" or \"How do I handle taxes?\").",
          "Feature relatable testimonials such as older first-time users or conservative investors who found the process easy.",
          "Keep content simple and focused on taking the next logical step."
        ]
      },
      onboarding: {
        main: "Provide a structured but lightweight onboarding experience that doesn't feel overbearing. Focus on reducing barriers to entry.",
        principles: [
          "Use a clear progress bar to indicate onboarding stages (e.g. \"Step 2 of 3\").",
          "Delay full KYC until it's necessary to transact, if allowed, so users can explore first.",
          "Automate preferences (e.g. detect location, pre-select currency and language).",
          "Set default actions for beginners (e.g. one-click buys) while placing advanced options behind a toggle.",
          "Present clear, user-friendly previews before transactions (in fiat terms).",
          "Break the onboarding into milestones that feel achievable (e.g. \"Account created – Next: Verify identity\").",
          "Insert contextual tips only where needed, like during first-time withdrawals."
        ]
      },
      growthTactics: [
        "Launch a referral program that, for instance, gives a fiat bonus (\"Invite a friend, you each get $10\") – framing rewards in fiat currency makes the incentive concrete.",
        "Use fiat-equivalent framing in all promotions (\"Earn 5% APY, paid in USD or crypto – your choice!\") so they always perceive value in familiar terms.",
        "Run periodic campaigns like \"Crypto 101 Challenge\": If they complete certain safe tasks (e.g. watch an educational video, make a small trade, set up price alerts), they get a small amount of Bitcoin or a free stock – something to encourage exploration.",
        "Emphasize safety in growth. For instance, \"We've protected users like you through $X of trades. Join the safest way to try crypto.\"",
        "Partner with workplaces or financial advisors. This user segment might trust crypto if introduced via their financial advisor's platform.",
        "Essentially, combine straightforward referral economics, continuous education, and integrating into their existing financial life to grow.",
        "Incorporate features like savings goals or progress bars (\"You're 80% toward your $500 crypto portfolio goal!\") to give them a familiar sense of achievement.",
        "Provide digestible, non-threatening updates (\"Crypto market is up 5% this week – your portfolio gained $X\") so they feel informed without needing to seek info elsewhere; this keeps them engaged in-app.",
        "Implement soft badges or tiers (\"Bronze investor\" → \"Silver investor\") not tied to social status broadly, but within the app it gives them feedback on their involvement. This can encourage them to explore more features to level up."
      ]
    };
  } else if (score >= 3.0 && score <= 3.9) {
    return {
      marketing: {
        main: "Marketing should highlight how your product enables smarter, faster, more insightful crypto actions, not just basic access. The tone can assume they know basic terms and appeal to their curiosity without overwhelming them.",
        keyAreas: [
          "Emphasize what they can achieve with your product.",
          "Use early-adopter language. It's okay to reference things like staking, Layer2, or yield strategies in your messaging.",
          "Highlight integrations with major ecosystem products. This reassures them that your product fits well into their existing workflow."
        ],
        contentGuide: [
          "Develop in-depth content that satisfies their appetite for learning. End-to-end walkthroughs of complex workflows are highly effective.",
          "Publish comparison blogs that highlight the advantages of your advanced features over competitors.",
          "Provide detailed changelogs or publish posts explaining the significance of new features. This communicates that your product is evolving to meet their needs.",
          "Share case studies and success stories, such as users discovering alpha, saving on gas, or maximizing yields; tangible benefits that inspire action."
        ]
      },
      onboarding: {
        main: "The onboarding experience should support \"guided freedom.\" Unlike novices, these users don't require mandatory tours and will likely skip them if forced. Instead, design an adaptive onboarding flow:",
        principles: [
          "Allow free exploration post-setup, with contextual tips and tricks triggered at the right moments.",
          "Offer visible options to skip setup, alongside intuitive access to support (e.g. a persistent Help button or hover-based tooltips).",
          "Where there's risk, permit action but include subtle, clickable warning icons with explanatory context.",
          "Use interactive hints only when needed. For instance, on first use of a complex feature, a tooltip could suggest: \"Having trouble? Check our guide.\"",
          "Provide clear post-action feedback. If a user completes a cross-chain transfer, summarize the result: \"You moved X from Ethereum to Starknet. Gas used: Y ETH. [View on Explorer].\"",
          "Introduce auto-suggested next steps. After completing one task, suggest another logically connected feature: \"Now that you've done X, you might want to explore Y.\""
        ]
      },
      growthTactics: [
        "Host themed challenges like \"DeFi Week,\" where users complete daily tasks (e.g. use a new DEX, try lending) via your product. Completing all tasks unlocks a reward, such as an NFT or prize entry.",
        "Collaborate with new dapps. If users engage through your interface, both your product and the dapp reward them, encouraging cross-app discovery.",
        "Implement data-driven prompts. For instance, if users have Token X in their account, prompt: \"Token X is now available to stake. Want to earn on it?\"",
        "Show users their engagement status. Example: \"You've completed 3 of 5 DeFi milestones. Explore yield farming next.\"",
        "Reward engagement with points for actions like swapping, bridging, or providing liquidity. Let these points unlock features, badges, or access tiers, creating a gamified progression path.",
        "Let users customize their home screen by pinning preferred data or widgets. This fosters a sense of control and ownership.",
        "Highlight anonymized trending wallets or popular strategies to inspire curiosity: \"12,345 users are earning on Protocol X. Join them!\"",
        "Create intuitive sequences. After funding their wallet, suggest next step: \"You funded your account. Next, try swapping or staking.\" This helps users unlock the full product experience smoothly.",
        "Acknowledge achievements with badges or titles. For instance, \"Congrats! Claim your badge for exploring 5 unique dapps on Base!\" This reinforces engagement through recognition.",
        "Highlight tangible benefits. For instance, \"You saved $50 this month using [Product]!\" This reinforces behavior and drives further exploration."
      ]
    };
  } else if (score >= 4.0 && score <= 4.9) {
    return {
      marketing: {
        main: "Position your product as a power tool. Speak directly to their efficiency needs, technical awareness, and time sensitivity. Avoid fluff. Focus on how your product removes barriers, saves money, and provides real advantages over alternatives.",
        keyAreas: [
          "Highlight how your product makes their life easier and faster.",
          "If your product is offering a cost-efficient way to save on fees/time, shout that out.",
          "Highlight depth of features: advanced metrics, performance insights, custom settings.",
          "Draw distinctions between your product and competitors: faster execution, wider integrations, superior analytics."
        ],
        contentGuide: [
          "Focus on quick, outcome-driven content: short \"pro tip\" videos or blog posts",
          "Share user stories showcasing real-world efficiency. This shows tangible value.",
          "Comparisons are great content. They'll appreciate the transparency and analysis.",
          "Consider an occasional deep dive on a complex topic. Not all will read it, but its existence signals respect for the advanced audience and builds trust."
        ]
      },
      onboarding: {
        main: "Onboarding should be nearly invisible for these users. Assume they've seen it all before and focus on fast access to core functionality.",
        principles: [
          "Highlight critical actions early, then step aside.",
          "Make all guided elements optional and easy to dismiss.",
          "Prioritize discoverability over instruction: intuitive menus, self-service tools, and well-organized settings.",
          "Reinforce key actions with light feedback (e.g. \"Wallet connected\")",
          "Include subtle progress indicators during any setup process, just to confirm forward motion.",
          "After onboarding, consider sending a single, non-generic message with \"power tips\" to maximize product use. They will read it if it's practical and targeted."
        ]
      },
      growthTactics: [
        "Ship features fast to have the first-mover advantage and piggyback on the hype. When a highly-anticipated chain launches, integrate quickly to ride the wave of its momentum.",
        "Create a leaderboard showcasing user wins (e.g. \"0xABC saved $320 this month using [Feature]\".)",
        "Design a referral system that rewards influence rather than just sign-ups. (e.g. Reward users referring three other users who go on to complete meaningful actions.)",
        "Visualize time and cost savings (e.g. \"You saved $12 on this swap using our aggregator vs. XYZ\"). These concrete benefits encourage ongoing use and social sharing.",
        "Offer early previews or beta toggles labeled \"Power Users Only\". This makes them feel valued and invites their feedback.",
        "Allow users to display achievements or earned titles such as \"Early Adopter\" or \"Multichain Explorer.\"",
        "Engage them with small-scale gamified activities (e.g. \"Find the hidden Easter egg\" or \"Claim a special NFT for trying this new feature\").",
        "When they use advanced features successfully, acknowledge it. For instance: \"You staked 1 ETH. Great move! Crypto's a little stronger today.\" A tongue-in-cheek note like this builds satisfaction and validates their expertise."
      ]
    };
  } else if (score >= 5.0 && score <= 5.9) {
    return {
      marketing: {
        main: "Your messaging should affirm that your platform is built for speed, precision, and control. Communicate that it's for people who take DeFi seriously: no fluff, just performance. Focus on the time and cost advantages clearly and repeatedly.",
        keyAreas: [
          "Emphasize speed, efficiency and reliability in all messaging.",
          "Highlight any unique advantages. For instance, if your product has the deepest liquidity for certain pairs, say \"Trade X/Y with the best liquidity. Zero slippage.\"",
          "Use language that reflects control and configurability.",
          "Promote advanced analytics and decision-making tools. This signals they can potentially drop other tools in favor of yours."
        ],
        contentGuide: [
          "Publish performance-driven content: charts, data, and real metrics (e.g. \"Our Users saved an average of 12% on slippage last month\").",
          "Build case studies showcasing power usage.",
          "Offer technical transparency: breakdowns of smart routing logic, security protocols, or integration pipelines. They respect technical depth.",
          "Share quick feature tips and strategy snippets on social channels. Utility-based posts drive engagement with this audience."
        ]
      },
      onboarding: {
        main: "Make it easy to connect, configure, and execute. Eliminate unnecessary steps between user intent and action. For them, onboarding should feel like skipping the queue. Recognize their setup instantly, display only essential context, and ensure settings aren't buried behind layers.",
        principles: [
          "Ensure seamless wallet detection and rapid connection (supporting Metamask, Ledger, multisig, etc.).",
          "Avoid mandatory demos or guided flows. Allow them to explore with confidence.",
          "Display essential controls and data points up front: slippage, gas usage, network status.",
          "Make advanced options highly visible and accessible (e.g. \"Advanced Settings\" toggle always present).",
          "Provide contextual onboarding only where necessary, such as highlighting where to enable expert features."
        ]
      },
      growthTactics: [
        "Consistently release features that allow users to replace multiple tools with yours (e.g. portfolio tracking, real-time yield comparison, advanced analytics). This encourages consolidation around your platform.",
        "Let users auto-generate stylish, data-backed analytics cards to share on social media e.g. \"Your activity in May: $12k swapped, 4 chains used, $56 saved on fees.\"",
        "Implement loyalty rewards tailored to advanced users. Perhaps they get zero-fee swaps, exclusive features for consistent use or for referring other power users. They are often in small networks of other power users. If you provide incentives for them to bring in high-value users, they will probably bring them in.",
        "Sponsor and attend hackathons, trading competitions, and crypto events. These events attract the users who'll advocate your platform if impressed.",
        "Launch experimental or advanced features as invite-only beta tools, clearly labeled as such (\"Expert users only\"). They love having something unique to play with (and to talk about).",
        "Invite your most advanced users into private beta groups or advisory channels. The sense of ownership increases retention and brand loyalty.",
        "Ship small improvements and communicate them transparently through changelogs. These users notice polish and progression.",
        "The more touchpoints your product can cover in their crypto routine, the more irreplaceable it becomes. Deeply embed your tool in their routine, which both drives loyalty and makes them advocates.",
        "Promote user success stories, leaderboard rankings, and retweet authentic praise. Being publicly recognized by a high-performing product strengthens their personal brand, and deepens their commitment to yours."
      ]
    };
  } else if (score >= 6.0 && score <= 6.9) {
    return {
      marketing: {
        main: "Position your product as a reliable, high-performance interface for serious DeFi users. Your messaging should underscore speed, clarity, and precision. Use visuals and real usage metrics to convey trust and value quickly.",
        keyAreas: [
          "Produce content tailored to active DeFi users.",
          "Showcase your interface with real screenshots or short walkthrough videos.",
          "Highlight product stats to build credibility: \"70% of top traders on Arbitrum use Hyperliquid.\"",
          "Use visual elements to reduce complexity: clear dashboards, risk indicators, and action summaries help reduce hesitation and increase engagement."
        ],
        contentGuide: [
          "Create visual explainers that are easy to follow and navigation-friendly.",
          "Produce short videos that demonstrate key flows (e.g. How does TWAP work?).",
          "Prioritize content that explains how features impact outcomes, rather than diving into overly technical explanations.",
          "Ensure your educational materials are accessible from anywhere in the product, ideally tied to the relevant features."
        ]
      },
      onboarding: {
        main: "Onboarding should be frictionless and optional. These users want tools that work immediately but also appreciate accessible support when needed.",
        principles: [
          "Auto-detect wallets and immediately display relevant user data: open positions, recent trades, staked assets, etc.",
          "Make help content accessible without being intrusive available on hover or via a dedicated help button.",
          "Never force tutorials. The interface should be intuitive for confident users, with advanced settings clearly visible but not overwhelming.",
          "Display real-time indicators for network status, transaction sync, and performance metrics within the UI.",
          "Prioritize visual clarity: risks should be highlighted before confirmation steps, not hidden in tooltips.",
          "After a user completes an action, offer contextual nudges (e.g. \"Your position is live. Track its ROI.\""
        ]
      },
      growthTactics: [
        "Award badges or status labels to highly active users. Make these visible to drive both status and retention.",
        "Let users share key milestones like PnL via integrated tools. Include optional incentives to encourage this kind of organic promotion.",
        "Introduce an optional Pro UI with expanded configuration, deeper analytics, or trading tools while keeping the default interface clean for general use.",
        "Run translation bounties and documentation localization programs to support multilingual growth. Offer rewards for community contributions.",
        "Offer lightweight builder programs. Provide small grants or spotlight features created by users (e.g. custom bots, dashboards, or data integrations).",
        "Maintain a real-time status page showing uptime, key metrics (e.g. TVL, active users), and treasury balances. This builds long-term trust.",
        "Provide weekly or monthly summaries of user actions: \"This week you traded X, had Y% ROI, voted on Y, and claimed Z.\" This reinforces engagement and validates behavior."
      ]
    };
  } else if (score >= 7.0 && score <= 7.9) {
    return {
      marketing: {
        main: "Market your product as a strategy-enabling powerhouse, not a beginner gateway. Position it as the professional layer that allows DeFi pros to do more with less friction. The tone should be smart, tactical, and confident, conveying that your product is built for serious operators who want to extract more value from every asset, position, or move.",
        keyAreas: [
          "Emphasize how your product lets them do more with their assets.",
          "Highlight any available automation features and advanced controls.",
          "Promote risk controls and transparency features: real-time alerts, onchain proof, performance summaries."
        ],
        contentGuide: [
          "Produce in-depth walkthroughs or video guides on executing multi-step strategies using your product.",
          "Maintain a real-time feed or newsletter to help users stay ahead of market shifts.",
          "Launch an \"Insights\" hub, updated with TVL changes, new integrations, liquidity trends, and performance benchmarks.",
          "Focus content on actionable intelligence, not just feature updates. They reward constant relevance."
        ]
      },
      onboarding: {
        main: "Onboarding must feel frictionless and optional while signaling the power available behind the scenes.",
        principles: [
          "Keep the interface minimal during first contact but highlight advanced capabilities subtly.",
          "Promote extensibility from the start if available: let users know they can connect exchanges, wallets, or data tools.",
          "Abstract complexity without hiding it. Offer pre-set configurations but indicate that everything can be tuned.",
          "Support fast onboarding with integration prompts (e.g. \"Connect your Ledger\")"
        ]
      },
      growthTactics: [
        "Allow users to create, publish, and share strategies. Successful strategies build their credibility and your product's appeal. Others will onboard to replicate or compete.",
        "Run leaderboards or performance challenges. This keeps pros engaged and attracts new high-level users.",
        "Feature top users in rankings, blogs, or case studies. Provide exclusive Discord access or roadmap input opportunities. Make power users feel like stakeholders.",
        "Introduce progression levels or badges based on usage depth. These reinforce commitment and provide social validation.",
        "Surface key metrics immediately post-action (e.g. \"This position returned 7.4% APY in 48 hours\"). Tangible, real-time proof of impact builds loyalty.",
        "Deliver live notifications for major events: TVL shifts, protocol hacks, strategy anomalies. Being the fastest to inform builds dependency and trust.",
        "Over time, aim to replace multiple dashboards and tools. If users can track, plan, and execute all from one interface, they'll reduce tool sprawl and consolidate around your product."
      ]
    };
  } else if (score >= 8.0 && score <= 8.9) {
    return {
      marketing: {
        main: "Speak directly to developers with respect and utility in mind. Your value proposition is saving them time and reducing overhead. Avoid buzzwords and fluff. Highlight what matters: fast integration, low latency, uptime, modularity, and community trust.",
        keyAreas: [
          "Focus on ease of integration (e.g. \"5 lines of code to connect\").",
          "Emphasize the simplicity of having a unified provider (e.g. \"One SDK, all your needs\").",
          "If you offer free tiers or easy onboarding for devs, mention that (\"Start building for free, pay as you scale\"), which addresses their pragmatic concern of trying things out without commitment.",
          "Lead with adoption proof: \"Trusted by 100+ dapps\" or \"10B+ requests/month.\""
        ],
        contentGuide: [
          "Publish quickstart guides and sample projects.",
          "Create detailed technical blogs.",
          "Maintain an active changelog with feature updates and performance metrics.",
          "Release developer case studies: \"How [Team] scaled their dapp to 1M users with [Product].\"",
          "Engage with devs on platforms for devs by answering critical questions."
        ]
      },
      onboarding: {
        main: "Onboarding should deliver a seamless, immediate path from sign-up to value.",
        principles: [
          "Make it possible to go from sign-up to a successful API call in under 5 minutes.",
          "On your dashboard, include commands or code they can copy to get started. Devs love when documentation is part of the product UI.",
          "When they sign up, auto-create a default \"MyApp\" project with sensible defaults and provide API key. Some products make you create a project to get an API key. Skip that by creating one for them and let them configure as they wish later.",
          "Structure the onboarding so they can skip any optional setup steps (like profile info, etc.). They likely only care about functional setup."
        ]
      },
      growthTactics: [
        "To grow with devs, be everywhere they learn, make them love you by solving their real problems, and turn them into contributors and advocates by treating them as partners in the product's evolution.",
        "Invest heavily in DevRel: have advocates whose job is to engage on CT, host workshops, speak at hackathons and conferences. If your product is seen everywhere in the dev community, devs will pick it up as they learn.",
        "The more they integrate your product, the less they can remove it. Encourage that by providing lots of integration points.",
        "Highlight and support creative uses of your platform that devs come up with. If someone built a cool automation or an internal tool using your API, showcase it.",
        "Give devs the tools to monitor and trust your service (e.g. status alerts, usage dashboards etc.), because organizational adoption depends on their tech lead trusting your reliability.",
        "Treat user feedback as part of your roadmap publicly. If many devs request a feature, maintain a public roadmap or feature request tracker and show when you implement those ideas.",
        "If devs themselves extend your ecosystem to more languages and frameworks, you effectively crowdsource growth. Recognize and possibly fund these contributions.",
        "Try to become the de facto solution recommended in official docs of other projects. If an L2 docs say \"For RPC, we use [Product]\", it is huge for growth.",
        "Devs talk to each other: if you provide frank updates and share lessons learned from incidents, it builds a reputation that \"They're solid and honest\" which brings in more devs via word-of-mouth."
      ]
    };
  } else if (score >= 9.0 && score <= 9.9) {
    return {
      marketing: {
        main: "You are not just marketing a chain, you're marketing a complete stack. Your messaging must frame your product as the fastest and most composable launchpad for production-ready dapps. Rather than emphasizing investors, spotlight apps built on your stack. Focus on infra reliability, dev experience, and go-to-market velocity.",
        keyAreas: [
          "Provide CLI tools, local Devnets, and scaffolds so developers can deploy and test quickly.",
          "Ensure access to stable, performant RPC endpoints with trusted infra partners.",
          "Support early teams with grants, bounties, and public recognition.",
          "Publish case studies and live examples of real dapps built on your platform.",
          "Share uptime metrics, Devnet reliability, and active builder stats."
        ],
        contentGuide: [
          "Create docs as a product surface. Don't just explain, guide. Include \"start here\" checklists, templates, and quickstart repos for each use case.",
          "Draft case studies that teach (e.g. \"How Avnu built their DEX on StarkNet\"). Include diagrams, time-to-launch, lessons learned.",
          "Release implementation specs, SDK API docs, and architecture diagrams."
        ]
      },
      onboarding: {
        main: "Let developers launch with one command. Reduce decision paralysis and make progress feel fast. Provide npx @your-sdk/create-app style starters, Docker images with local networks, or GitHub templates that scaffold complete apps.",
        principles: [
          "Provide CLI-first onboarding, and offer ready-to-run Docker setups or Terraform modules to deploy infrastructure.",
          "Assume they want to automate everything. Expose everything you can through CLI or API (deployments, upgrades, configs, telemetry).",
          "Include a local Testnet runner and prebuilt example apps (e.g. a Uniswap fork, a Farcaster-integrated social graph).",
          "Provide metrics, logging, and block explorer UIs out-of-the-box so devs can test and inspect everything locally.",
          "Ship test scripts for throughput benchmarking or simulation."
        ]
      },
      growthTactics: [
        "Own the core apps that showcase your stack's strengths. No one else will build them better than you. Being just a chain is not enough. Launch the first essential apps yourself, like how Microsoft built Office for Windows.",
        "Devs choose stacks that get them from \"first deploy\" to \"Mainnet-ready\" quickly. Invest in starter templates, hosted Devnets, and end-to-end boilerplates.",
        "Make key parts of your infra open-source. Developers are more likely to build on stacks they can inspect, fork, and contribute to. Transparency fosters deeper adoption and long-term buy-in.",
        "Launch microgrants, Testnet bounties, and hackathon sponsorships to incentivize early builders. Focus rewards on meaningful milestones: shipped apps, meaningful user activity on the apps, open-source modules, dev tooling contributions.",
        "Publish detailed case studies showing how teams shipped on your stack: what problems they faced, how your stack helped, what performance they achieved.",
        "Design your stack to be composable. If a team only wants your prover, DA layer, or sequencer, let them integrate that part. Don't force an all-or-nothing architecture.",
        "Devs need visibility and confidence. Offer built-in logging, monitoring dashboards, node health endpoints, and incident transparency. Make it easy to trust your infra and easy to self-host fallback options if needed.",
        "Your team should show up in Discords, GitHub threads, and dev-focused spaces. Devs trust stack providers that code, ship, and teach in public.",
        "If your infra is used or endorsed by major players, promote it. Seeing that OP Stack or Celestia is used by popular dapps reassures new teams that they're betting on battle-tested infra."
      ]
    };
  } else if (score === 10.0) {
    return {
      marketing: {
        main: "Don't rely on traditional marketing. Build technical credibility instead. Publish research, security audits, and benchmark results openly. Position your product as foundational tech for builders. Highlight rigorous testing, and real expert adoption (e.g. \"Used by the core teams of X, Y\"). Avoid hype, focus on specifics.",
        keyAreas: [
          "Share concrete performance metrics, especially under stress, not just ideal conditions.",
          "Emphasize transparent development with public changelogs and open discussions on GitHub or forums. Invite them to shape the protocol.",
          "Highlight opportunities for collaboration and contribution.",
          "Frame the project as engineer-driven and openly governed, never a closed, company-controlled system."
        ],
        contentGuide: [
          "Publish detailed technical content regularly covering real innovations and implementation challenges.",
          "Share content on credible platforms to gain citations and respect among core developers.",
          "Host technical workshops and hackathons for protocol devs, ideally with leading organizations.",
          "Create thorough, spec-style documentation for independent implementation.",
          "Use peer-to-peer discussions to demonstrate credibility."
        ]
      },
      onboarding: {
        main: "Onboarding should be as simple as cloning the repo and following a flawless README. Provide a single command to build and test, with clear environment setup. These users will often build from source to verify everything themselves.",
        principles: [
          "Support CLI, Docker, and source-first workflows; everything should be operable via config files or command line with no dependency on graphical interfaces.",
          "Embrace a \"no UX is the best UX\" mindset. Avoid abstracting critical details behind visual interfaces, and make core system behavior transparent and accessible.",
          "Integrate with the tools they already use: support structured logging formats that can feed into custom dashboards, debuggers, or observability pipelines.",
          "Provide reproducible dev environments: offer genesis files or state snapshots so developers can spin up a local network at a known state to simulate and test specific conditions.",
          "Offer access to internal metrics in a developer-friendly format, such as Prometheus endpoints or CLI commands that output performance and resource data."
        ]
      },
      growthTactics: [
        "Offer grants or co-announcements to new teams (compilers, wallets, provers, explorers) using your infra. Each integration signals trust and attracts others.",
        "Aim to become part of core dev stacks (e.g. SDKs, EVM clients). Build tools devs use daily to earn long-term trust.",
        "Highlight unconventional implementations (e.g. gaming rollups, supply chain L2s). Demonstrate technical range and flexibility.",
        "Publish design docs, audits, test results. Transparency speeds up due diligence and builds institutional trust.",
        "Encourage external tools and SDKs; fund or hire standout contributors. A broad builder base improves adoption and trust.",
        "Target usage by base infra like exchanges or foundations. Being used by the backbone earns deep credibility.",
        "Stress-test VMs, consensus, and relays under varied configs. Performance data drives adoption and iteration.",
        "Share flamegraphs and call traces from your own infra. Treat observability as first-class product design.",
        "Reward forks that enhance performance, APIs, or logging. Forkability fuels innovation and upstream contributions.",
        "Clearly tag performance updates, deprecations, and semantic changes. Prevents confusion and builds trust with maintainers.",
        "Encourage devs to cite your infra in PRs and internal docs. Citations signal deep technical embedding."
      ]
    };
  } else {
    return {
      marketing: {
        main: "Complete the questionnaire to receive marketing recommendations.",
        keyAreas: [],
        contentGuide: []
      },
      onboarding: {
        main: "Complete the questionnaire to receive onboarding recommendations.",
        principles: []
      },
      growthTactics: []
    };
  }
};