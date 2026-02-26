// src/config/navLinks.ts
export interface NavLink {
  name: string;       // Display name
  href: string;       // URL or #anchor
}

export const navLinks: NavLink[] = [
  {
    name: "CV",
    href: "/CV",
  },
  {
    name: "Learn",
    href: "/learn", 
  },
  {
    name: "Contact",
    href: "/contact",
  },
  // Add more as needed
];