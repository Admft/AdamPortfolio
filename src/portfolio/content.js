export const projects = [
  {
    id: "causey",
    featured: true,
    category: "FLAGSHIP · FOUNDING ENGINEERING · FULL STACK",
    title: "Causey. Opportunity, without the guesswork.",
    name: "Causey",
    image: "/Causey.png",
    tags: ["Next.js", "Supabase", "TypeScript", "Product strategy"],
    summary:
      "A competition discovery platform connecting students, parents, and coaches with opportunities.",
    problem:
      "Competition information is fragmented. Finding an event is only the start; people also need to understand eligibility and qualification pathways.",
    solution:
      "Built discovery, typed APIs, ingestion workflows, and a Postgres-backed qualification engine as a founding software engineer.",
    outcome:
      "Turned a product thesis into a working platform, connecting the customer journey to the data architecture underneath.",
    href: "https://causey.dev",
    metric: "End to end",
    metricLabel: "from product discovery to deployment",
  },
  {
    id: "topstock",
    category: "VUSIONGROUP · DEPLOYMENT OPERATIONS",
    title: "Vusion Topstock Operations",
    name: "Vusion Topstock Operations",
    image: "/TopstockOperations.jpg",
    tags: ["Python", "Azure / KQL", "JavaScript", "Vercel"],
    summary:
      "One operational picture for a 29-store pilot: directors see historical progress toward rollout readiness; engineers see exactly what still needs fixing.",
    problem:
      "A 29-store Topstock deployment needed more than a current health count. Directors needed to understand whether the pilot was improving and how far it was from readiness, while field engineers needed a prioritized list of the remaining work, down to the store and rail.",
    solution:
      "Built a Python and KQL pipeline that turns Azure Application Insights telemetry into published dashboard snapshots. A configurable maintenance playbook classifies each rail using location, BLE, Wi-Fi, battery, and image recency. Separate Executive and FAE views translate the same data into rollout progress and field actions.",
    outcome:
      "Directors can track historical readiness and compare store-level improvement; engineers can filter and export the remaining replacements, power cycles, connection fixes, and configuration work. Actionable readiness and fully-online status remain separate metrics, so a healthy-looking headline never substitutes for the underlying deployment detail.",
    metric: "29 stores",
    metricLabel: "pilot deployment · executive visibility + field execution",
    imageNote:
      "September 18, 2026 snapshot: 28 stores reporting in this view. Deployment scope is 29 stores; reporting counts depend on the selected telemetry window.",
    details: [
      {
        title: "For directors: progress toward readiness",
        text: "Executive View shows actionable readiness (the share of reporting rails not requiring field work) separately from fully online (both BLE and Wi-Fi online). Historical windows, per-store improvement, and concise store outcomes show what is improving and where attention is still needed.",
      },
      {
        title: "For engineers: the next action",
        text: "FAE View and the fleet-wide work list drill from store to individual rail, with connectivity, battery, location, and last successful image. Engineers can filter by action and image age, prioritize the stores with the most work, and export the task list as CSV.",
      },
      {
        title: "History you can interpret",
        text: "Daily history uses Central time, supports fleet and store views, and clearly marks the current day as incomplete. Completed days are backfilled and retained; changed playbooks can reclassify older days. Reporting-rail counts stay visible so a change in fleet coverage is not confused with a repair.",
      },
      {
        title: "Operationally grounded architecture",
        text: "A local Python refresh queries Azure through authenticated Azure CLI, applies configurable classification rules, and publishes static JSON and a vanilla JavaScript dashboard to Vercel. A scheduled PowerShell task automates publishing. Empty query results preserve the previous snapshot instead of blanking the dashboard; cloud credentials stay out of the hosted frontend.",
      },
    ],
  },
  {
    id: "fleet",
    category: "ENTERPRISE · FIELD INTELLIGENCE",
    title: "From telemetry to a plan of action.",
    name: "Store telemetry heatmaps",
    image: "/HeatMap.png",
    tags: ["Azure", "KQL", "Python", "Pandas"],
    summary:
      "Putting deployment health on the store floor plan, so field teams can see where the problems are.",
    problem:
      "Raw logs and device counts could describe failures, but did not show field teams where weak signals and onboarding issues were concentrated in a store.",
    solution:
      "Joined Azure telemetry to retail floor plans using KQL and Python, turning RSSI and onboarding data into spatial heatmaps for onsite investigations.",
    outcome:
      "Gave field and headquarters teams a shared visual reference for deployment investigations, including onsite pilot monitoring at Walmart headquarters in Bentonville.",
    metric: "Spatial insight",
    metricLabel: "from raw telemetry to the store floor",
  },
  {
    id: "housefax",
    category: "AI ENGINEERING · PRODUCT",
    title: "Better answers. Verifiable evidence.",
    name: "HouseFax",
    image: "/HouseFax.png",
    tags: ["Next.js", "FastAPI", "RAG", "AI evaluation"],
    summary:
      "Residential due diligence that connects property data, financial tools, and source-grounded AI.",
    problem:
      "Home buyers need defensible answers about risk and cost. A plausible-sounding chatbot answer is not enough.",
    solution:
      "Built a Next.js interface on FastAPI services, combining property integrations, multi-document retrieval, and deterministic financial tools. Added evaluation gates for math and grounding.",
    outcome:
      "A product architecture that makes evidence and calculation traceable, from inspection disclosures to cash-flow analysis.",
    metric: "AI + tools",
    metricLabel: "grounded in sources and calculations",
  },

  {
    id: "finteach",
    category: "HACKUNT 2024 · FINANCIAL TECHNOLOGY",
    title: "Complex finances. A clearer future.",
    name: "FinTeach",
    image: "/finteach2.jpg",
    tags: ["React", "Flask", "Plaid", "OpenAI"],
    summary:
      "An award-winning financial planning experience built around the needs of Texas educators.",
    problem:
      "Educators need a clear way to connect their everyday finances with longer-term planning.",
    solution:
      "Co-developed a React and Flask application that combines Plaid account context with AI-assisted financial guidance.",
    outcome:
      "Recognized at HackUNT 2024. A practical example of translating a specific audience’s needs into a compelling product demo.",
    href: "https://devpost.com/software/hackunt2024",
    metric: "HackUNT",
    metricLabel: "2024 award-winning project",
  },
];
export const skills = [
  {
    number: "01",
    title: "Understand the problem.",
    text: "Discovery that gets beyond the feature request. Connect the technical constraints to the outcome a customer actually needs.",
    tags: "Discovery · Solution design · Technical scoping",
  },
  {
    number: "02",
    title: "Make the value tangible.",
    text: "Build the demo, validate the integration, and explain the architecture in language that works for engineers and decision-makers.",
    tags: "Live demos · APIs · Proof of concept",
  },
  {
    number: "03",
    title: "Stay through the outcome.",
    text: "From onsite deployments to week-long training, make sure the solution works in the field and the customer can own it.",
    tags: "Enablement · Implementation · Trusted advisor",
  },
];
