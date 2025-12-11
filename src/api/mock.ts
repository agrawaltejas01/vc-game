// Mock data for development
import { Scenario, InvestorVector } from '../types/scenario';
import { GameSummary } from '../types/game';
import { InvestorProfile } from '../types/investor';

// Simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock scenarios
export const mockScenarios: Scenario[] = [
  {
    scenario_id: 'sc_1',
    scenario_index: 0,
    stage: 'Pre-seed',
    sector: 'SaaS',
    business: {
      company_name: 'Project Rocketship',
      one_liner: 'AI-powered sales intelligence platform for B2B SaaS companies',
      description: 'Outbound helps B2B sales teams identify and prioritize high-intent prospects using proprietary AI models that analyze behavioral signals across 50+ data sources. The platform provides real-time alerts when prospects enter buying windows, dramatically improving SDR efficiency and conversion rates.',
      business_model: 'Usage-based SaaS subscription ($99/user/month) with volume discounts for enterprise. Average 15 users per customer.',
      is_pre_product: false,
      is_pre_revenue: true,
    },
    founder_profile: {
      summary: 'Stanford CS graduates with deep technical expertise but limited go-to-market experience. Sarah (CEO) built ML infrastructure at Scale AI; David (CTO) was early engineer at Weights & Biases.',
      team_bullets: [
        'Sarah Chen - CEO: 5 years at Scale AI, built real-time ML pipelines serving 100M+ requests/day',
        'David Rodriguez - CTO: Early engineer at W&B, PhD in ML from Stanford',
        'No sales/GTM co-founder yet - outsourcing to consultants',
      ],
    },
    round_details: {
      round_type: 'Pre-seed',
      total_round_size_usd: 1000000,
      investor_ask_usd: 150000,
      lead_status: 'no_lead_yet',
      other_investors: ['Y Combinator', 'Several angel investors pending'],
    },
    traction_snapshot: null,
    tension: {
      description: 'Strong technical team building in a crowded market without clear GTM strategy. Product is impressive but customer acquisition plan is vague.',
      key_risks: [
        'No revenue or pilot customers yet',
        'Weak GTM - no sales co-founder',
        'Competitive market with well-funded incumbents',
      ],
    },
    info_gaps: [
     'Limited customer validation - unclear if target segment has budget authority',
     'Limited customer validation - unclear if target segment has budget authority'
    ],
    question_to_investor: 'Given the strong technical team but weak GTM capabilities and no early customer traction, would you invest at this stage?',
    has_twist: false,
  },
  {
    scenario_id: 'sc_2',
    scenario_index: 1,
    stage: 'Seed',
    sector: 'AI Infrastructure',
    business: {
      company_name: 'Project Rocketship 2',
      one_liner: 'Serverless vector database optimized for real-time AI applications',
      description: 'VectorFlow provides a fully managed vector database that is 10x faster than alternatives like Pinecone and Weaviate for real-time similarity search. The product uses novel indexing algorithms developed through academic research. Customers include several fast-growing AI startups building RAG applications.',
      business_model: 'Consumption-based pricing: $0.40 per million vector operations + $0.10/GB storage per month',
      is_pre_product: false,
      is_pre_revenue: false,
    },
    founder_profile: {
      summary: 'Technical founders from Google Research with deep AI infrastructure expertise. Limited fundraising experience - first-time founders.',
      team_bullets: [
        'Michael Zhang - CEO/CTO: 8 years at Google Research, published 12 papers on vector search optimization',
        'Lisa Park - VP Eng: Ex-Google Cloud, built infrastructure serving 1B+ queries/day',
        'Strong technical team but no business/sales leadership',
      ],
    },
    round_details: {
      round_type: 'Seed',
      total_round_size_usd: 5000000,
      valuation: 25000000,
      investor_ask_usd: 750000,
      lead_status: 'following',
      other_investors: ['Sequoia leading with $3M', 'Index venturescommitted to $1.5M'],
    },
    traction_snapshot: {
      revenue_arr_mrr: '$35K MRR, $420K ARR',
      growth_rate: '25% MoM for last 4 months',
      key_metrics: {
        customers: 8,
        'avg_revenue_per_customer': '$4,375/month',
        'net_revenue_retention': '140%',
      },
      customer_count: 8,
    },
    tension: {
      description: 'Strong early traction and top-tier lead investor, but valuation feels rich for this stage. $25M pre-money on $420K ARR implies ~60x revenue multiple.',
      key_risks: [
        'High valuation - $25M on $420K ARR',
        'Small customer base (only 8 customers)',
        'Competitive market with deep-pocketed incumbents',
      ],
    },
    info_gaps: [
      'Limited customer validation - unclear if target segment has budget authority'
    ],
    question_to_investor: 'The metrics are strong and Sequoia is leading, but the $25M valuation seems aggressive. Do you follow at this price, or pass?',
    has_twist: true,
  },
  {
    scenario_id: 'sc_3',
    scenario_index: 2,
    stage: 'Series A',
    sector: 'Fintech Infrastructure',
    business: {
      company_name: 'Project Rocketship 3',
      one_liner: 'Payment infrastructure for vertical SaaS platforms enabling embedded finance',
      description: 'VertexPay allows vertical SaaS companies (real estate, healthcare, legal) to embed payment processing, banking, and lending directly into their platforms with minimal integration work. The platform handles compliance, KYC/AML, and regulatory requirements. 45+ vertical SaaS platforms currently using the product.',
      business_model: 'Revenue share: 15-25 bps on payment volume + $500-2K/month platform fee per customer',
      is_pre_product: false,
      is_pre_revenue: false,
    },
    founder_profile: {
      summary: 'Serial fintech operators with deep regulatory expertise. Strong team with complementary skills.',
      team_bullets: [
        'James Miller - CEO: Former VP at Stripe, launched Stripe Capital',
        'Priya Sharma - COO: 10 years in compliance at JPMorgan, ex-head of regulatory at Plaid',
        'Alex Kim - CTO: Early engineer at Square, built payment processing infrastructure',
      ],
    },
    round_details: {
      round_type: 'Series A',
      total_round_size_usd: 15000000,
      valuation: 60000000,
      investor_ask_usd: 2000000,
      lead_status: 'leading',
      other_investors: ['Ribbit Capital participating with $5M'],
    },
    traction_snapshot: {
      revenue_arr_mrr: '$4.2M ARR',
      growth_rate: '30% YoY (slowing from 50%)',
      key_metrics: {
        customers: 45,
        'total_payment_volume': '$850M annualized',
        'avg_customer_arr': '$93K',
        'net_dollar_retention': '125%',
        'gross_margin': '68%',
      },
      customer_count: 45,
    },
    tension: {
      description: 'Solid traction and experienced team, but regulatory changes could impact the business model. New federal guidelines on embedded banking may require significant compliance investment.',
      key_risks: [
        'Regulatory uncertainty - new banking rules pending',
        'Growth slowdown (30% YoY vs 50% previously)',
        'Customer concentration risk not disclosed',
      ],
    },
    info_gaps: [
     'Limited customer validation - unclear if target segment has budget authority'
    ],
    question_to_investor: 'Strong fundamentals, but regulatory headwinds are building. How do you weigh the execution track record against regulatory risk?',
    has_twist: false,
  },
  {
    scenario_id: 'sc_4',
    scenario_index: 3,
    stage: 'Pre-seed',
    sector: 'Deeptech',
    business: {
      company_name: 'Project Rocketship 4',
      one_liner: 'Novel battery technology for long-duration energy storage using sustainable materials',
      description: 'EnergyCore has developed a proprietary sodium-ion battery chemistry that achieves energy density comparable to lithium-ion at 40% lower cost. The technology uses abundant materials (sodium, iron) and could revolutionize grid-scale energy storage. Currently at lab-scale with plans to build pilot manufacturing.',
      business_model: 'Future: B2B sales to energy companies and utilities. Licensing IP to manufacturers. Currently pre-revenue.',
      is_pre_product: true,
      is_pre_revenue: true,
    },
    founder_profile: {
      summary: 'World-class scientific team from MIT with breakthrough technology but no commercial experience.',
      team_bullets: [
        'Dr. Robert Chen - CEO: MIT Professor, 20+ years in materials science, 50+ patents',
        'Dr. Emily Stevens - CSO: Former Tesla battery researcher, PhD in electrochemistry',
        'No business/operations co-founder yet',
      ],
    },
    round_details: {
      round_type: 'Pre-seed',
      total_round_size_usd: 3000000,
      investor_ask_usd: 500000,
      lead_status: 'following',
      other_investors: ['MIT venture fund leading with $2M', 'Climate tech focused fund committed $500K'],
    },
    traction_snapshot: null,
    tension: {
      description: 'Breakthrough potential with world-class scientists, but extremely long commercialization timeline (5-7 years) and massive capital requirements ($50M+ to reach production scale).',
      key_risks: [
        'Pre-product, pre-revenue - pure technology risk',
        'Very long time to commercialization (5-7 years minimum)',
        'Will need $50M+ in future funding',
        'No commercial team or manufacturing expertise',
      ],
    },
    info_gaps: [
     'Limited customer validation - unclear if target segment has budget authority'
    ],
    question_to_investor: 'Exceptional scientific team with potentially game-changing technology, but 7+ year timeline and massive capital needs. Is this within your mandate?',
    has_twist: false,
  },
  {
    scenario_id: 'sc_5',
    scenario_index: 4,
    stage: 'Seed',
    sector: 'Consumer Internet Infrastructure',
    business: {
      one_liner: 'Creator economy platform enabling micro-influencers to monetize through branded content',
      description: 'CreatorHub connects micro-influencers (10K-100K followers) with brands for authentic sponsored content. The platform uses AI to match creators with relevant brands and handles contracts, payments, and performance tracking. Strong viral growth through creator referrals.',
      business_model: '20% take rate on all transactions. Creators earn $500-5K per campaign; brands pay $600-6K.',
      is_pre_product: false,
      is_pre_revenue: false,
    },
    founder_profile: {
      summary: 'Young founders (24-26) with strong social media backgrounds but limited B2B sales experience. High energy and product instincts.',
      team_bullets: [
        'Maya Johnson - CEO: Former influencer manager, grew creators from 0 to 500K followers',
        'Chris Davis - CPO: Product designer from Instagram, strong consumer product sense',
        'No technical co-founder - outsourcing development to agency',
      ],
    },
    round_details: {
      round_type: 'Seed',
      total_round_size_usd: 2500000,
      valuation: 12000000,
      investor_ask_usd: 500000,
      lead_status: 'leading',
      other_investors: ['Several angels committed $1M total', 'Ashton Kutcher interested but not committed'],
    },
    traction_snapshot: {
      revenue_arr_mrr: '$80K MRR, $960K ARR',
      growth_rate: '40% MoM for last 3 months',
      key_metrics: {
        'active_creators': 3500,
        'active_brands': 85,
        'gmv': '$4.8M annualized',
        'repeat_brand_rate': '65%',
      },
      customer_count: 85,
    },
    tension: {
      description: 'Viral growth and strong early metrics, but the lead investor is pushing for a decision this week due to competitive dynamics. Another similar company just raised at a higher valuation.',
      key_risks: [
        'Pressure to decide quickly (3 days)',
        'No technical co-founder - development outsourced',
        'Competitive market - 2 well-funded competitors',
        'High churn risk in creator economy',
      ],
    },
    info_gaps: [
      'Limited customer validation - unclear if target segment has budget authority'
    ],
    question_to_investor: 'Strong growth trajectory and the lead is pushing hard for a quick close. Do you have enough信息 to decide, or do you need more time despite the competitive pressure?',
    has_twist: true,
  },
  {
    scenario_id: 'sc_6',
    scenario_index: 5,
    stage: 'Series A',
    sector: 'Climate Tech',
    business: {
      one_liner: 'Carbon accounting SaaS for mid-market companies to measure and reduce their carbon footprint',
      description: 'CarbonIQ automates carbon footprint measurement for mid-market companies (500-5000 employees) by integrating with their existing systems (ERP, procurement, travel). The platform provides actionable recommendations for emissions reduction and prepares companies for upcoming regulatory requirements.',
      business_model: 'Annual subscription: $25K-100K based on company size and complexity. Average deal: $45K.',
      is_pre_product: false,
      is_pre_revenue: false,
    },
    founder_profile: {
      summary: 'Perfect founder-market fit with complementary skills. Experienced operators with domain expertise.',
      team_bullets: [
        'Sophie Anderson - CEO: Former sustainability lead at Walmart, 10 years in climate consulting',
        'Mark Thompson - CTO: Ex-Salesforce engineer, built enterprise integrations at scale',
        'Jessica Liu - VP Sales: Former enterprise sales at Workday, strong enterprise relationships',
      ],
    },
    round_details: {
      round_type: 'Series A',
      total_round_size_usd: 12000000,
      valuation: 45000000,
      investor_ask_usd: 1500000,
      lead_status: 'leading',
      other_investors: ['Breakthrough Energy Ventures co-leading with $6M', 'Existing seed investors participating'],
    },
    traction_snapshot: {
      revenue_arr_mrr: '$2.8M ARR',
      growth_rate: '20% QoQ',
      key_metrics: {
        customers: 62,
        'avg_deal_size': '$45K',
        'sales_cycle': '4.5 months',
        'net_dollar_retention': '115%',
        'gross_margin': '78%',
      },
      customer_count: 62,
    },
    tension: {
      description: 'Excellent team and product-market fit, but the business is extremely capital intensive. Will need $40M+ total to reach profitability due to long enterprise sales cycles and high customer acquisition costs.',
      key_risks: [
        'Capital intensive - needs $40M+ to reach profitability',
        'Long sales cycles (4.5 months average)',
        'Regulatory tailwinds might not materialize as expected',
        'Market timing risk - how urgent is carbon accounting?',
      ],
    },
    info_gaps: [
     'Limited customer validation - unclear if target segment has budget authority'
    ],
    question_to_investor: 'Perfect team and solid execution, but this will require massive follow-on funding ($40M+). Can you support this through profitability, or will future funding risk be an issue?',
    has_twist: false,
  },
];

// Mock investor vector that evolves with each scenario
export const generateInvestorVector = (scenarioIndex: number, profile: InvestorProfile): InvestorVector => {
  // Start with initial weights
  const baseWeights = profile.evaluation_weights;

  const vectors: InvestorVector[] = [
    {
      quantitative_metrics: {
        ...baseWeights,
      },
      qualitative_insights: [
        'Initial profile established',
        // `Focus on ${profile.preferred_sectors[0]} sector`,
        `Focus on fintech sector`,
      ],
      decision_patterns: [],
      risk_tolerance: 'Baseline established',
    },
    {
      quantitative_metrics: {
        founders: Math.min(baseWeights.founders + 3, 100),
        sector_market: baseWeights.sector_market - 2,
        traction: baseWeights.traction,
        product_tech: baseWeights.product_tech - 1,
        round_dynamics: baseWeights.round_dynamics,
      },
      qualitative_insights: [
        'Shows increased emphasis on founder quality over market validation',
        'Willing to take technical risk with strong teams',
      ],
      decision_patterns: [
        'Prioritizes founder pedigree',
        'Comfortable with pre-revenue investments if team is exceptional',
      ],
      risk_tolerance: 'Higher than initially stated',
    },
    {
      quantitative_metrics: {
        founders: baseWeights.founders + 3,
        sector_market: baseWeights.sector_market + 5,
        traction: baseWeights.traction + 3,
        product_tech: baseWeights.product_tech,
        round_dynamics: Math.max(baseWeights.round_dynamics - 4, 0),
      },
      qualitative_insights: [
        'Demonstrates sensitivity to valuation pricing',
        'Values market traction and momentum',
        'Following top-tier investors (Sequoia) signals confidence in social proof',
      ],
      decision_patterns: [
        'Influenced by lead investor credibility',
        'Weighs valuation relative to traction carefully',
        'Comfortable following strong leads despite high prices',
      ],
      risk_tolerance: 'Moderate - wants de-risking through co-investors',
    },
    {
      quantitative_metrics: {
        founders: baseWeights.founders + 8,
        sector_market: baseWeights.sector_market + 2,
        traction: baseWeights.traction + 5,
        product_tech: baseWeights.product_tech - 2,
        round_dynamics: baseWeights.round_dynamics - 3,
      },
      qualitative_insights: [
        'Strong preference for experienced operators over pure technologists',
        'Values regulatory expertise and compliance knowledge',
        'Willing to accept slower growth if fundamentals are strong',
      ],
      decision_patterns: [
        'Favors experienced teams with domain expertise',
        'Considers regulatory risk carefully',
        'Comfortable with capital-intensive models if team can execute',
      ],
      risk_tolerance: 'Moderate - balances opportunity with structural risks',
    },
    {
      quantitative_metrics: {
        founders: baseWeights.founders + 12,
        sector_market: baseWeights.sector_market - 8,
        traction: Math.max(baseWeights.traction - 10, 0),
        product_tech: baseWeights.product_tech + 3,
        round_dynamics: baseWeights.round_dynamics + 3,
      },
      qualitative_insights: [
        'Emerging pattern: Favors scientific/technical breakthroughs',
        'Willing to take long-term bets on exceptional teams',
        'Less focused on near-term traction if technology is transformative',
      ],
      decision_patterns: [
        'Thesis-driven investing - backs potential category creators',
        'Patient capital approach - comfortable with 5-7 year horizons',
        'Values deep technical expertise',
      ],
      risk_tolerance: 'High - comfortable with technology and timeline risk',
    },
    {
      quantitative_metrics: {
        founders: baseWeights.founders + 10,
        sector_market: baseWeights.sector_market + 8,
        traction: baseWeights.traction + 8,
        product_tech: baseWeights.product_tech,
        round_dynamics: baseWeights.round_dynamics + 5,
      },
      qualitative_insights: [
        'Responsive to competitive dynamics and deal urgency',
        'Values viral growth and network effects',
        'Increasingly comfortable making quick decisions with limited data',
      ],
      decision_patterns: [
        'Can move quickly when necessary',
        'Values growth metrics heavily',
        'Influenced by competitive pressure in hot deals',
      ],
      risk_tolerance: 'Increasingly aggressive - FOMO factor present',
    },
  ];

  return vectors[Math.min(scenarioIndex, vectors.length - 1)];
};

// Mock game summary
export const generateGameSummary = (profile: InvestorProfile): GameSummary => {
  return {
    archetype_name: 'The Conviction-Driven Catalyst',
    archetype_description: 'You are a conviction-driven investor who backs exceptional founders building transformative companies. While you stated interest in balanced evaluation across multiple factors, your actual decisions reveal a strong bias toward founder quality and technical depth. You\'re willing to take significant risks on unproven markets if the team is exceptional, and you\'re comfortable with long timelines when the potential impact is large. You balance this founder focus with careful attention to deal dynamics and competitive positioning.',
    decision_patterns: [
      {
        pattern: 'Founder-First Philosophy',
        examples: [
          'Backed pre-seed SaaS despite weak GTM because of Stanford ML credentials',
          'Invested in deeptech battery despite 7-year timeline due to world-class scientists',
        ],
        confidence: 'high',
      },
      {
        pattern: 'Comfortable with Technical Risk',
        examples: [
          'Accepted AI infrastructure deal at rich valuation due to novel technology',
          'Backed battery technology at lab-stage based on scientific breakthrough',
        ],
        confidence: 'high',
      },
      {
        pattern: 'Influenced by Social Proof',
        examples: [
          'Followed Sequoia into AI infra despite high pricing',
          'Referenced lead investor quality in multiple decisions',
        ],
        confidence: 'medium',
      },
      {
        pattern: 'Sensitive to Competitive Dynamics',
        examples: [
          'Accelerated decision on creator platform due to competitive pressure',
          'Factored in deal timing and other investor interest heavily',
        ],
        confidence: 'medium',
      },
    ],
    comparison_to_initial: [
      {
        stated_preference: `Founder weight: ${profile.evaluation_weights.founders}%`,
        revealed_preference: 'Founder weight: ~45% (adjusted upward)',
        alignment: 'partially_aligned',
        insights: 'Your actual decisions placed 15-20% more weight on founder quality than your initial stated preferences. You consistently chose strong teams over strong metrics.',
      },
      {
        stated_preference: `Traction weight: ${profile.evaluation_weights.traction}%`,
        revealed_preference: 'Traction weight: ~15% (adjusted downward)',
        alignment: 'misaligned',
        insights: 'Despite stating traction as important, you were comfortable backing pre-revenue and pre-product companies when other factors (team, technology) were compelling.',
      },
      {
        stated_preference: `Geography focus: ${profile.geography_focus.join(', ')}`,
        revealed_preference: 'Broader geography appetite than stated',
        alignment: 'partially_aligned',
        insights: 'You showed willingness to invest in geographies beyond your stated focus when team quality and market opportunity were exceptional.',
      },
      {
        stated_preference: `Preferred sectors: ${profile.preferred_sectors.join(', ')}`,
        revealed_preference: 'Flexible on sectors for exceptional opportunities',
        alignment: 'aligned',
        insights: 'Your investment decisions aligned with your stated sector preferences while showing flexibility for exceptional opportunities.',
      },
    ],
    evaluation_breakdown: {
      founders: 42,
      sector_market: 18,
      traction: 15,
      product_tech: 15,
      round_dynamics: 10,
    },
    additional_insights: {
      risk_profile: 'Higher risk tolerance than initially indicated - comfortable with binary outcomes',
      stage_preference: 'Demonstrated ability to invest across all stages when conviction is high',
      decision_speed: 'Can move quickly when needed, but prefers time for diligence',
      capital_strategy: 'Willing to back capital-intensive models with right team',
    },
  };
};
