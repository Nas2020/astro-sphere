import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "LimogiAI Solutions Inc",
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
  TITLE: "About",
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
    TEXT: "markhorn-dev",
    HREF: "https://www.linkedin.com/in/markhorn-dev/",
  },
  {
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "markhorn_dev",
    HREF: "https://twitter.com/markhorn_dev",
  },
]

