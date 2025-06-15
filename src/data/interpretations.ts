import { CategoryScore } from '../context/AnalyzerContext';

export interface InterpretationData {
  experienceLevel: string;
  knowledgeBase: string;
  behavior: string;
  expectations: string;
}

export interface RecommendationData {
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
}

/**
 * Analyze category scores to identify significant deviations from the overall score
 */
const analyzeCategoryDeviations = (overallScore: number, categoryScores: CategoryScore[]) => {
  if (categoryScores.length === 0) return { strengths: [], weaknesses: [], insights: [] };

  const threshold = 1.5; // Significant deviation threshold
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const insights: string[] = [];

  categoryScores.forEach(category => {
    const deviation = category.score - overallScore;
    
    if (Math.abs(deviation) >= threshold) {
      if (deviation > 0) {
        strengths.push(category.category);
        insights.push(`Your product shows high complexity in ${category.category} (${category.score.toFixed(1)}/10), significantly above your overall score.`);
      } else {
        weaknesses.push(category.category);
        insights.push(`Your product is more accessible in ${category.category} (${category.score.toFixed(1)}/10), well below your overall complexity.`);
      }
    }
  });

  return { strengths, weaknesses, insights };
};

export const getInterpretation = (score: number, categoryScores: CategoryScore[] = []): string => {
  const analysis = analyzeCategoryDeviations(score, categoryScores);
  let baseInterpretation = '';

  if (score >= 1 && score < 2) {
    baseInterpretation = "Your product is exceptionally accessible to mainstream users. It successfully abstracts away crypto complexity, making it usable by anyone familiar with traditional fintech apps. This positions you well for mass market adoption.";
  } else if (score >= 2 && score < 3) {
    baseInterpretation = "Your product is highly accessible with minimal crypto knowledge required. Users need only basic familiarity with concepts like wallets and transactions. This makes it suitable for crypto-curious mainstream users.";
  } else if (score >= 3 && score < 4) {
    baseInterpretation = "Your product requires basic crypto literacy from users. They should understand fundamental concepts like wallets, gas fees, and basic DeFi operations. This targets the growing segment of crypto-aware consumers.";
  } else if (score >= 4 && score < 5) {
    baseInterpretation = "Your product assumes moderate crypto experience. Users need to be comfortable with multiple crypto concepts and some technical operations. This appeals to regular crypto users but may challenge newcomers.";
  } else if (score >= 5 && score < 6) {
    baseInterpretation = "Your product requires solid crypto knowledge. Users should be experienced with various protocols, understand risks, and be comfortable with complex operations. This targets the crypto-native audience.";
  } else if (score >= 6 && score < 7) {
    baseInterpretation = "Your product is designed for advanced crypto users. It requires deep understanding of specific protocols, risk management, and complex strategies. This serves the sophisticated crypto investor segment.";
  } else if (score >= 7 && score < 8) {
    baseInterpretation = "Your product targets crypto power users and professionals. It demands expertise in advanced concepts, protocol mechanics, and risk assessment. This serves traders, yield farmers, and crypto professionals.";
  } else if (score >= 8 && score < 9) {
    baseInterpretation = "Your product is built for crypto experts and developers. It requires deep technical knowledge, understanding of protocol internals, and comfort with experimental features. This serves the builder and researcher community.";
  } else if (score >= 9 && score < 10) {
    baseInterpretation = "Your product is designed for crypto researchers and protocol developers. It demands academic-level understanding of cryptoeconomics, protocol design, and cutting-edge mechanisms. This serves the innovation layer of crypto.";
  } else {
    baseInterpretation = "Your product represents the bleeding edge of crypto innovation. It requires expert-level knowledge across multiple domains and comfort with experimental, unproven mechanisms. This serves crypto researchers and protocol architects.";
  }

  // Add category-specific insights if available
  if (analysis.insights.length > 0) {
    baseInterpretation += "\n\nCategory Analysis: " + analysis.insights.join(' ');
    
    if (analysis.weaknesses.length > 0) {
      baseInterpretation += ` Your product's accessibility in ${analysis.weaknesses.join(' and ')} could be leveraged to attract users who might otherwise be intimidated by the overall complexity.`;
    }
    
    if (analysis.strengths.length > 0) {
      baseInterpretation += ` The high complexity in ${analysis.strengths.join(' and ')} requires special attention in your user education and onboarding strategy.`;
    }
  }

  return baseInterpretation;
};

export const getIdealUserProfile = (score: number, categoryScores: CategoryScore[] = []): InterpretationData => {
  const analysis = analyzeCategoryDeviations(score, categoryScores);
  
  let profile: InterpretationData;

  if (score >= 1 && score < 3) {
    profile = {
      experienceLevel: "Crypto newcomers and mainstream users comfortable with fintech apps",
      knowledgeBase: "Basic understanding of digital payments, minimal crypto knowledge required",
      behavior: "Cautious, values simplicity and clear guidance, prefers familiar UX patterns",
      expectations: "Expects intuitive interfaces, comprehensive support, and safety guardrails"
    };
  } else if (score >= 3 && score < 5) {
    profile = {
      experienceLevel: "Crypto-aware users with 6+ months of experience",
      knowledgeBase: "Understands wallets, basic DeFi, gas fees, and common crypto operations",
      behavior: "Willing to learn new concepts, comfortable with some technical complexity",
      expectations: "Expects clear documentation, reasonable learning curve, and community support"
    };
  } else if (score >= 5 && score < 7) {
    profile = {
      experienceLevel: "Experienced crypto users and DeFi participants",
      knowledgeBase: "Deep understanding of protocols, yield strategies, and risk management",
      behavior: "Actively seeks alpha, comfortable with complexity, values efficiency over simplicity",
      expectations: "Expects advanced features, detailed analytics, and minimal hand-holding"
    };
  } else if (score >= 7 && score < 9) {
    profile = {
      experienceLevel: "Crypto power users, traders, and protocol specialists",
      knowledgeBase: "Expert knowledge of multiple protocols, MEV, advanced strategies",
      behavior: "Risk-tolerant, values cutting-edge features, participates in governance",
      expectations: "Expects sophisticated tools, early access to features, and technical depth"
    };
  } else {
    profile = {
      experienceLevel: "Crypto researchers, developers, and protocol architects",
      knowledgeBase: "Academic-level understanding of cryptoeconomics and protocol design",
      behavior: "Experimental, values innovation over stability, contributes to protocol development",
      expectations: "Expects bleeding-edge features, technical documentation, and research-grade tools"
    };
  }

  // Adjust profile based on category analysis
  if (analysis.weaknesses.length > 0) {
    profile.experienceLevel += `. However, the lower complexity in ${analysis.weaknesses.join(' and ')} makes it accessible to users with less experience in these specific areas.`;
  }
  
  if (analysis.strengths.length > 0) {
    profile.knowledgeBase += ` Special expertise required in ${analysis.strengths.join(' and ')} due to higher complexity in these areas.`;
  }

  return profile;
};

export const getRecommendations = (score: number, categoryScores: CategoryScore[] = []): RecommendationData => {
  const analysis = analyzeCategoryDeviations(score, categoryScores);
  
  let recommendations: RecommendationData;

  if (score >= 1 && score < 3) {
    recommendations = {
      marketing: {
        main: "Focus on mainstream benefits and familiar use cases. Emphasize how your product solves real-world problems without requiring crypto expertise.",
        keyAreas: [
          "Highlight real-world utility and benefits over technical features",
          "Use familiar fintech language and avoid crypto jargon",
          "Showcase user testimonials from non-crypto natives",
          "Partner with traditional finance influencers and media",
          "Emphasize security, regulation compliance, and user protection"
        ],
        contentGuide: [
          "Create content comparing your product to familiar fintech services",
          "Develop educational content about the problems you solve, not how you solve them",
          "Use case studies showing mainstream adoption",
          "Focus on outcomes and benefits rather than technical mechanisms"
        ]
      },
      onboarding: {
        main: "Design onboarding that completely abstracts crypto complexity. Users should experience value immediately without understanding underlying mechanisms.",
        principles: [
          "Hide all crypto terminology and concepts during initial use",
          "Provide instant value demonstration within first 2 minutes",
          "Use progressive disclosure to gradually introduce concepts only when necessary",
          "Implement extensive error prevention and recovery mechanisms",
          "Offer multiple support channels including live chat"
        ]
      },
      growthTactics: [
        "Partner with traditional fintech companies for distribution",
        "Implement referral programs targeting mainstream users",
        "Focus on organic growth through exceptional user experience",
        "Invest in customer success and support infrastructure",
        "Consider freemium models to reduce adoption friction"
      ]
    };
  } else if (score >= 3 && score < 5) {
    recommendations = {
      marketing: {
        main: "Target crypto-curious users who are ready to learn. Balance education with practical benefits, showing clear advantages over traditional alternatives.",
        keyAreas: [
          "Create educational content that builds confidence",
          "Highlight unique crypto advantages (24/7 access, global reach, etc.)",
          "Use social proof from early crypto adopters",
          "Partner with crypto education platforms and influencers",
          "Emphasize the learning journey and community support"
        ],
        contentGuide: [
          "Develop beginner-friendly guides that build from basics",
          "Create comparison content showing advantages over traditional alternatives",
          "Use storytelling to make complex concepts relatable",
          "Provide clear ROI calculations and benefit demonstrations"
        ]
      },
      onboarding: {
        main: "Create guided learning experiences that build user confidence. Provide clear explanations and safety nets while gradually introducing complexity.",
        principles: [
          "Implement step-by-step tutorials with clear explanations",
          "Provide sandbox or demo modes for risk-free learning",
          "Use contextual help and tooltips throughout the interface",
          "Create achievement systems to gamify the learning process",
          "Offer multiple learning paths based on user goals"
        ]
      },
      growthTactics: [
        "Build strong community education programs",
        "Create ambassador programs with experienced users",
        "Develop partnerships with crypto education platforms",
        "Implement progressive feature unlocking based on user competency",
        "Focus on word-of-mouth growth through exceptional support"
      ]
    };
  } else if (score >= 5 && score < 7) {
    recommendations = {
      marketing: {
        main: "Target experienced crypto users with advanced features and superior performance. Focus on competitive advantages and unique value propositions.",
        keyAreas: [
          "Highlight advanced features and superior performance metrics",
          "Use technical comparisons with competitors",
          "Leverage crypto-native distribution channels",
          "Partner with established DeFi protocols and platforms",
          "Focus on yield optimization and advanced strategies"
        ],
        contentGuide: [
          "Create detailed technical documentation and whitepapers",
          "Develop advanced strategy guides and tutorials",
          "Publish research and market analysis content",
          "Use data-driven content showing performance advantages"
        ]
      },
      onboarding: {
        main: "Streamline onboarding for experienced users while providing advanced configuration options. Focus on efficiency and customization.",
        principles: [
          "Provide express onboarding paths for experienced users",
          "Offer advanced configuration and customization options",
          "Implement comprehensive API documentation for power users",
          "Create detailed risk disclosures and management tools",
          "Provide advanced analytics and reporting features"
        ]
      },
      growthTactics: [
        "Build integrations with popular DeFi protocols and tools",
        "Create liquidity mining and incentive programs",
        "Develop partnerships with yield farming communities",
        "Implement governance tokens and community participation",
        "Focus on protocol-to-protocol business development"
      ]
    };
  } else if (score >= 7 && score < 9) {
    recommendations = {
      marketing: {
        main: "Target crypto professionals and power users. Emphasize cutting-edge features, performance, and exclusive access to advanced opportunities.",
        keyAreas: [
          "Focus on professional trader and institutional channels",
          "Highlight cutting-edge features and alpha generation",
          "Use performance metrics and backtesting data",
          "Partner with trading firms and professional crypto services",
          "Emphasize exclusive access and early adopter advantages"
        ],
        contentGuide: [
          "Publish detailed research reports and market analysis",
          "Create advanced trading and strategy content",
          "Develop technical deep-dives and protocol analysis",
          "Use quantitative analysis and performance data"
        ]
      },
      onboarding: {
        main: "Provide minimal onboarding with maximum customization. Focus on advanced tools and professional-grade features.",
        principles: [
          "Offer API-first access for programmatic users",
          "Provide advanced risk management and position sizing tools",
          "Implement sophisticated analytics and reporting",
          "Create customizable dashboards and interfaces",
          "Offer white-label and institutional solutions"
        ]
      },
      growthTactics: [
        "Build relationships with crypto hedge funds and trading firms",
        "Create exclusive access programs for high-volume users",
        "Develop institutional partnerships and B2B solutions",
        "Implement sophisticated referral and affiliate programs",
        "Focus on protocol governance and ecosystem development"
      ]
    };
  } else {
    recommendations = {
      marketing: {
        main: "Target crypto researchers, developers, and protocol architects. Focus on innovation, research contributions, and cutting-edge development.",
        keyAreas: [
          "Engage with academic and research communities",
          "Contribute to open-source development and standards",
          "Publish peer-reviewed research and technical papers",
          "Partner with blockchain research institutions",
          "Focus on protocol innovation and ecosystem development"
        ],
        contentGuide: [
          "Publish academic-quality research and whitepapers",
          "Create detailed technical specifications and documentation",
          "Develop educational content for protocol developers",
          "Contribute to industry standards and best practices"
        ]
      },
      onboarding: {
        main: "Provide comprehensive technical documentation and developer tools. Focus on research-grade features and experimental capabilities.",
        principles: [
          "Offer comprehensive API and SDK documentation",
          "Provide testnet and sandbox environments for experimentation",
          "Create detailed technical specifications and architecture docs",
          "Implement advanced debugging and development tools",
          "Offer research grants and developer incentive programs"
        ]
      },
      growthTactics: [
        "Build relationships with blockchain research institutions",
        "Create developer grant and research funding programs",
        "Contribute to open-source protocols and standards",
        "Engage with academic conferences and research communities",
        "Focus on long-term ecosystem development and innovation"
      ]
    };
  }

  // Adjust recommendations based on category analysis
  if (analysis.weaknesses.length > 0) {
    recommendations.marketing.keyAreas.push(`Leverage your accessibility in ${analysis.weaknesses.join(' and ')} to attract users who might be intimidated by competitors`);
    recommendations.onboarding.principles.push(`Provide extra guidance and education in areas outside your strength (${analysis.weaknesses.join(' and ')})`);
  }
  
  if (analysis.strengths.length > 0) {
    recommendations.marketing.keyAreas.push(`Highlight your advanced capabilities in ${analysis.strengths.join(' and ')} to differentiate from simpler alternatives`);
    recommendations.onboarding.principles.push(`Provide comprehensive education and support for complex areas like ${analysis.strengths.join(' and ')}`);
    recommendations.growthTactics.push(`Create specialized content and community around your expertise in ${analysis.strengths.join(' and ')}`);
  }

  return recommendations;
};