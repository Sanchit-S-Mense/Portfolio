import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl?: string;
  cloneCommand?: string;
  tags?: string[];
  liveUrl?: string;
  architecture?: string[];
  highlights?: string[];
  figmaUrl?: string;
  images?: string[];
  credits?: string[];
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
}

export interface PortfolioData {
  name: string;
  welcome: string;
  contact: ContactInfo;
  projects: Project[];
}

function sanitizeUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  const lower = trimmed.toLowerCase();
  if (lower === "null" || lower === "none" || lower === "n/a" || lower === "undefined" || lower === "#") {
    return undefined;
  }
  return trimmed;
}

function parseProjectBlock(rawText: string, defaultId: string): Project | null {
  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length === 0) return null;

  let title = "";
  let description = "";
  let githubUrl = "";
  let cloneCommand = "";
  let liveUrl = "";
  let figmaUrl = "";
  let tags: string[] = [];
  let architecture: string[] = [];
  let highlights: string[] = [];
  let images: string[] = [];
  let credits: string[] = [];

  let currentKey = "";
  const descLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("# ")) {
      title = line.substring(2).trim();
      currentKey = "title";
    } else if (/^title\s*:/i.test(line)) {
      title = line.replace(/^title\s*:/i, "").trim();
      currentKey = "title";
    } else if (/^description\s*:/i.test(line)) {
      const val = line.replace(/^description\s*:/i, "").trim();
      if (val) descLines.push(val);
      currentKey = "description";
    } else if (/^github\s*(link|url)?\s*:/i.test(line)) {
      githubUrl = line.replace(/^github\s*(link|url)?\s*:/i, "").trim();
      currentKey = "github";
    } else if (/^clone\s*(command|cmd)?\s*:/i.test(line)) {
      cloneCommand = line.replace(/^clone\s*(command|cmd)?\s*:/i, "").trim();
      currentKey = "clone";
    } else if (/^(live|demo)\s*(link|url)?\s*:/i.test(line)) {
      liveUrl = line.replace(/^(live|demo)\s*(link|url)?\s*:/i, "").trim();
      currentKey = "live";
    } else if (/^(figma|figma\s*preview|figma\s*url|figma\s*link|prototype|prototype\s*link|prototype\s*url)\s*:/i.test(line)) {
      figmaUrl = line.replace(/^(figma|figma\s*preview|figma\s*url|figma\s*link|prototype|prototype\s*link|prototype\s*url)\s*:/i, "").trim();
      currentKey = "figma";
    } else if (/^(images|image|screenshots|prototype\s*images)\s*:/i.test(line)) {
      const imgStr = line.replace(/^(images|image|screenshots|prototype\s*images)\s*:/i, "").trim();
      const parsedImgs = imgStr.split(",").map((i) => i.trim()).filter(Boolean);
      images.push(...parsedImgs);
      currentKey = "images";
    } else if (/^(credits|credit)\s*:/i.test(line)) {
      const credStr = line.replace(/^(credits|credit)\s*:/i, "").trim();
      const parsedCreds = credStr.split(",").map((c) => c.trim()).filter(Boolean);
      credits.push(...parsedCreds);
      currentKey = "credits";
    } else if (/^(tags|tech|technologies)\s*:/i.test(line)) {
      const tagsStr = line.replace(/^(tags|tech|technologies)\s*:/i, "").trim();
      tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);
      currentKey = "tags";
    } else if (/^architecture\s*:/i.test(line)) {
      const archStr = line.replace(/^architecture\s*:/i, "").trim();
      architecture = archStr.split(",").map((a) => a.trim()).filter(Boolean);
      currentKey = "architecture";
    } else if (/^highlights\s*:/i.test(line)) {
      const highStr = line.replace(/^highlights\s*:/i, "").trim();
      highlights = highStr.split(",").map((h) => h.trim()).filter(Boolean);
      currentKey = "highlights";
    } else {
      if (!title && currentKey === "") {
        title = line;
      } else if (currentKey === "description" || (!githubUrl && !liveUrl && tags.length === 0 && !figmaUrl)) {
        descLines.push(line);
      } else if (currentKey === "images") {
        const extraImgs = line.split(",").map((i) => i.trim()).filter(Boolean);
        images.push(...extraImgs);
      } else if (currentKey === "credits") {
        credits.push(line);
      }
    }
  }

  description = descLines.join(" ");

  if (!title) return null;

  // Auto-discover images in public/projects/${defaultId} if images list is empty
  if (images.length === 0) {
    try {
      const publicProjDir = path.join(process.cwd(), "public", "projects", defaultId);
      if (fs.existsSync(publicProjDir)) {
        const files = fs.readdirSync(publicProjDir);
        const imgFiles = files.filter((f) => /\.(png|jpe?g|svg|webp|gif)$/i.test(f));
        images = imgFiles.map((f) => `/projects/${defaultId}/${f}`);
      }
    } catch (e) {
      // Ignore read errors
    }
  }

  const cleanGithub = sanitizeUrl(githubUrl);
  const cleanLive = sanitizeUrl(liveUrl);
  const cleanFigma = sanitizeUrl(figmaUrl);

  return {
    id: defaultId,
    title,
    description: description || "No description provided.",
    githubUrl: cleanGithub,
    cloneCommand: cloneCommand || (cleanGithub ? `git clone ${cleanGithub}` : undefined),
    liveUrl: cleanLive,
    tags: tags.length > 0 ? tags : undefined,
    architecture: architecture.length > 0 ? architecture : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    figmaUrl: cleanFigma,
    images: images.length > 0 ? images : undefined,
    credits: credits.length > 0 ? credits : undefined,
  };
}

export function getPortfolioData(): PortfolioData {
  const dataDir = path.join(process.cwd(), "data");

  // Read name.txt
  let name = "Sanchit Mense";
  const namePath = path.join(dataDir, "name.txt");
  try {
    if (fs.existsSync(namePath)) {
      const content = fs.readFileSync(namePath, "utf-8").trim();
      if (content) name = content;
    }
  } catch (error) {
    console.error("Error reading name.txt:", error);
  }

  // Read welcome.txt
  let welcome = "Welcome to my portfolio website! Scroll down to check out my latest work and projects.";
  const welcomePath = path.join(dataDir, "welcome.txt");
  try {
    if (fs.existsSync(welcomePath)) {
      const content = fs.readFileSync(welcomePath, "utf-8").trim();
      if (content) welcome = content;
    }
  } catch (error) {
    console.error("Error reading welcome.txt:", error);
  }

  // Read contact.txt
  let contact: ContactInfo = {
    email: "sanchitmense@example.com",
    linkedin: "https://linkedin.com/in/sanchitmense",
    github: "https://github.com/sanchitmense",
  };
  const contactPath = path.join(dataDir, "contact.txt");
  try {
    if (fs.existsSync(contactPath)) {
      const lines = fs.readFileSync(contactPath, "utf-8").split(/\r?\n/);
      lines.forEach((line) => {
        if (/^email\s*:/i.test(line)) {
          contact.email = line.replace(/^email\s*:/i, "").trim();
        } else if (/^linkedin\s*:/i.test(line)) {
          contact.linkedin = line.replace(/^linkedin\s*:/i, "").trim();
        } else if (/^github\s*:/i.test(line)) {
          contact.github = line.replace(/^github\s*:/i, "").trim();
        }
      });
    }
  } catch (error) {
    console.error("Error reading contact.txt:", error);
  }

  // Read projects from project directory .txt files (tagged format) or projects.txt
  const projects: Project[] = [];
  const projectIds = ["project-1", "project-2", "project-3"];

  for (const id of projectIds) {
    // Check data/projects/id/details.txt or app/projects/id/details.txt
    const possiblePaths = [
      path.join(dataDir, "projects", id, "details.txt"),
      path.join(process.cwd(), "app", "projects", id, "details.txt"),
    ];

    let foundProject: Project | null = null;
    for (const pPath of possiblePaths) {
      if (fs.existsSync(pPath)) {
        try {
          const raw = fs.readFileSync(pPath, "utf-8");
          foundProject = parseProjectBlock(raw, id);
          if (foundProject) break;
        } catch (e) {
          console.error(`Error reading ${pPath}:`, e);
        }
      }
    }

    if (foundProject) {
      projects.push(foundProject);
    }
  }

  // Fallback / complement with data/projects.txt if list is empty
  if (projects.length === 0) {
    const projectsPath = path.join(dataDir, "projects.txt");
    try {
      if (fs.existsSync(projectsPath)) {
        const rawContent = fs.readFileSync(projectsPath, "utf-8");
        const blocks = rawContent
          .split(/(?:\r?\n){2,}|(?=^#\s+)|(?=^---)/m)
          .map((b) => b.trim())
          .filter((b) => b.length > 0 && !b.startsWith("---"));

        blocks.forEach((block, index) => {
          const p = parseProjectBlock(block, `project-${index + 1}`);
          if (p) projects.push(p);
        });
      }
    } catch (error) {
      console.error("Error reading projects.txt:", error);
    }
  }

  return { name, welcome, contact, projects };
}

export function getProjectById(id: string): Project | undefined {
  const { projects } = getPortfolioData();
  return projects.find((p) => p.id === id || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id);
}

export function getProjectFromDetailsTxt(id: string): Project | undefined {
  const possiblePaths = [
    path.join(process.cwd(), "app", "projects", id, "details.txt"),
    path.join(process.cwd(), "data", "projects", id, "details.txt"),
    path.join(process.cwd(), "app", "projects", id, "details.tsk"),
    path.join(process.cwd(), "data", "projects", id, "details.tsk"),
  ];

  for (const pPath of possiblePaths) {
    if (fs.existsSync(pPath)) {
      try {
        const raw = fs.readFileSync(pPath, "utf-8");
        const parsed = parseProjectBlock(raw, id);
        if (parsed) return parsed;
      } catch (e) {
        console.error(`Error reading details file at ${pPath}:`, e);
      }
    }
  }

  return getProjectById(id);
}
