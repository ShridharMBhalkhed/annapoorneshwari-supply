import { useEffect, useRef, useState } from "react";
import { Link } from "../Link.jsx";
import { Icon } from "../Icon.jsx";
import { useInquiryCart } from "../../lib/inquiryStore.js";

function getPreferredTheme() {
  const savedTheme = window.localStorage?.getItem("sa_theme");

  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function Header() {
  const cart = useInquiryCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const [theme, setTheme] = useState(getPreferredTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddedNotice, setShowAddedNotice] = useState(false);
  const previousCount = useRef(count);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage?.setItem("sa_theme", theme);
  }, [theme]);

  useEffect(() => {
    if (count > previousCount.current) {
      setShowAddedNotice(true);
      const timer = window.setTimeout(() => setShowAddedNotice(false), 1800);
      previousCount.current = count;
      return () => window.clearTimeout(timer);
    }

    previousCount.current = count;
  }, [count]);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-steel text-steel-foreground text-xs">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-4">
            <a href="tel:+919945662206" className="flex items-center gap-1.5 hover:text-safety">
              <Icon name="phone" className="h-3 w-3" /> +91 99456 62206
            </a>
            <a
              href="mailto:s.annapoorneshwarienterprises@gmail.com"
              className="hidden items-center gap-1.5 hover:text-safety sm:flex"
            >
              <Icon name="mail" className="h-3 w-3" /> s.annapoorneshwarienterprises@gmail.com
            </a>
          </div>
          <span className="text-white/70">GSTIN: 29AFJPH2849Q1ZN</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur relative">
        <div className="container mx-auto flex items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:flex-none">
            <img
              src="/logo-removebg-preview.png"
              alt="Shree Annapoorneshwari logo"
              className="h-10 w-10 flex-shrink-0 rounded-sm object-contain sm:h-12 sm:w-12"
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-bold tracking-tight sm:text-base">
                Shree Annapoorneshwari
              </div>
              <div className="hidden text-[11px] uppercase tracking-widest text-muted-foreground sm:block">
                Packaging Supply Co.
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-safety">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border bg-card text-foreground transition hover:border-safety hover:text-safety sm:h-10 sm:w-10 md:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              title="Menu"
            >
              <Icon name={menuOpen ? "x" : "menu"} className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setTheme(nextTheme)}
              className="relative inline-flex h-9 w-[54px] items-center rounded-full border bg-card px-1 text-foreground transition hover:border-safety"
              aria-label={`Switch to ${nextTheme} theme`}
              title={`Switch to ${nextTheme} theme`}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-safety text-safety-foreground shadow-sm transition-transform ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              >
                <Icon name={theme === "dark" ? "moon" : "sun"} className="h-3.5 w-3.5" />
              </span>
            </button>
            <Link
              to="/inquiry"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-sm bg-safety text-sm font-semibold text-safety-foreground hover:opacity-90 sm:h-10 sm:w-auto sm:gap-2 sm:px-4"
              aria-label={count > 0 ? `Request quote, ${count} items added` : "Request quote"}
            >
              <Icon name="fileText" className="h-4 w-4" />
              <span className="hidden sm:inline">Request Quote</span>
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-steel px-1.5 text-[11px] font-bold text-steel-foreground ring-2 ring-background sm:static sm:ml-1 sm:ring-0">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        {showAddedNotice && (
          <div className="pointer-events-none absolute right-3 top-full mt-2 rounded-sm border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-lg">
            Added to quote
          </div>
        )}
        {menuOpen && (
          <nav className="border-t bg-background px-4 py-3 md:hidden">
            <div className="container mx-auto grid gap-1 text-sm font-semibold">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-sm px-3 py-2 hover:bg-secondary hover:text-safety"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
