/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "AnsAliX",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "ansali430@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "NEXUS GRAPH",
      tag: "C++ Architecture", color: "#f34b7d", live: false,
      url: "https://github.com/AnsALiX/NexusGraph", 
      cta: "View Source →",
      img: "assets/projects/nexus.png",
      desc: "A C++ social network engine utilizing custom data structures—directed graphs, tries, max-heaps, and hash tables—to map user connections and calculate trending metrics.",
    },
    {
      title: "KABAAR TO KAMAAL",
      tag: "AI · Cloud Run", color: "#3dc8ff", live: false,
      url: "https://github.com/AnsALiX/Kabaar-to-Kamaal", 
      cta: "View on GitHub →",
      img: "assets/projects/kabaar.png",
      desc: "An AI-driven recycling web app containerized with Docker and deployed on Google Cloud Run for the AI Seekho competition.",
    }
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "NexusGraph",
    "Kabaar-to-Kamaal"
  ],
  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "crime-analysis-montgomery-county", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/crime-analysis-montgomery-county",
      description: "Ten years of Montgomery County crime data, taken from a messy 90 MB government CSV to ten answered analytical questions, geospatial hotspot maps and a district safety ranking.",
    },
    {
      name: "asthma-worsening-prediction", language: "MATLAB", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/asthma-worsening-prediction",
      description: "Predicting worsening asthma symptoms from NHS primary-care data with SQL and MATLAB, following CRISP-DM. Compares four models on a heavily imbalanced clinical dataset.",
    },
    {
      name: "Chronic-Kideney-Disease-Analyzer", language: "PHP", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/Chronic-Kideney-Disease-Analyzer",
      description: "A healthcare tracking web app. I led the front-end and requirements analysis in a multidisciplinary team, and our solution improved patient diagnostics by 25%.",
    },
    {
      name: "MSc-Washington-Crime-Analysis-with-Pandas", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/MSc-Washington-Crime-Analysis-with-Pandas",
      description: "Crime trend analysis of Washington D.C. public data. Reproducible Pandas notebooks with visual summaries written for people who do not code.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  langColors: {
    JavaScript: "#5c5af1", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Software Development", items: [
      ["C++ · Java", 85], 
      ["Python · JavaScript", 71],
      ["React Native · Next.js", 72], 
      ["Node.js · FastAPI", 74],
      ["Data Structures · Algorithms", 90]
    ]},
    { group: "Tools & Environment", items: [
      ["Git & GitHub", 72], 
      ["GCP · Docker · Vercel", 68],
      ["VS Code · IntelliJ IDEA", 90], 
      ["Arch Linux · Bash", 70]
    ]}
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
