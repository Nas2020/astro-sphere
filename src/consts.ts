import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "LimogiAI",
  DESCRIPTION: "AI Excellence, Limitless Possibilities.",
  AUTHOR: "LimogiAI Solutions Inc",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// About Page 
export const ABOUT: Page = {
  TITLE: "About Us",
  DESCRIPTION: "About us",
}

// Links
export const LINKS: Links = [
  {
    TEXT: "Projects",
    HREF: "/projects",
  },
  {
    TEXT: "About",
    HREF: "/about",
  },
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "admin@limogi.ai",
    HREF: "mailto:admin@limogi.ai",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "limogi-ai",
    HREF: "https://github.com/LimogiAI"
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "LimogiAI Solutions Inc",
    HREF: "https://www.linkedin.com/company/limogiai-solutions-inc",
  }
]

