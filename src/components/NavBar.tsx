import { useState, useEffect } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position (in case page is loaded mid-scroll)
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "首页", href: "#home" },
    { label: "项目", href: "#projects" },
    { label: "联系我", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/70 dark:bg-gray-950/70 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 h-16 max-w-[1126px]">
        {/* Brand name — click to scroll to top */}
        <a
          href="#"
          className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          老梁
        </a>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
