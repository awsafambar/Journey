// src/config/navLinks.ts
export interface NavLink {
  name: string;       // Display name
  href: string;       // URL or #anchor
}

export const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Me",
    href: "/about",
  },
  {
    name: "Learning With Me",
    href: "/learning-with-me",
  },
  {
    name: "Frontend Labs",
    href: "/frontend-labs",
  },
  {
    name: "Vlogs",
    href: "/vlogs",
  },
];
