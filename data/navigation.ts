export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "Products", href: "/#products" },
  { name: "Team Packages", href: "/#team-packages" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/#contact" },
];

export const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Messenger", href: "#" },
];

export const contactInfo = {
  email: "hello@yenzhen.com",
  phone: "+63 912 345 6789",
  address: "Yenzhen Tailoring Workshop",
};
