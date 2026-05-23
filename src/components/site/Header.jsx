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
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-sm border bg-card text-foreground transition hover:border-safety hover:text-safety sm:h-10 sm:w-10 md:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              title="Menu"
            >
              <Icon name={menuOpen ? "x" : "menu"} className="h-4 w-4" />
              {count > 0 && (
                <span
                  className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-safety ring-2 ring-background"
                  aria-hidden="true"
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => setTheme(nextTheme)}
              className="relative hidden h-10 w-[58px] items-center rounded-full border bg-card px-1 text-foreground transition hover:border-safety md:inline-flex"
              aria-label={`Switch to ${nextTheme} theme`}
              title={`Switch to ${nextTheme} theme`}
            >
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-safety text-safety-foreground shadow-sm transition-transform ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              >
                <Icon name={theme === "dark" ? "moon" : "sun"} className="h-3.5 w-3.5" />
              </span>
            </button>
            <Link
              to="/inquiry"
              className="relative hidden h-10 items-center justify-center gap-2 rounded-sm bg-safety px-4 text-sm font-semibold text-safety-foreground hover:opacity-90 md:inline-flex"
              aria-label={count > 0 ? `Request quote, ${count} items added` : "Request quote"}
            >
              <Icon name="fileText" className="h-4 w-4" />
              <span>Request Quote</span>
              {count > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-steel px-1.5 text-[11px] font-bold text-steel-foreground">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        {showAddedNotice && (
          <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-steel px-4 py-2 text-xs font-semibold text-steel-foreground shadow-lg">
            Added to quote
          </div>
        )}
        {menuOpen && (
          <div className="border-t bg-background px-4 py-3 md:hidden">
            <div className="container mx-auto grid gap-3 text-sm font-semibold">
              <nav className="grid gap-1">
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
              </nav>
              <div className="grid gap-2 border-t pt-3">
                <button
                  type="button"
                  onClick={() => setTheme(nextTheme)}
                  className="flex items-center justify-between rounded-sm border bg-card px-3 py-2"
                  aria-label={`Switch to ${nextTheme} theme`}
                >
                  <span>{theme === "dark" ? "Dark mode" : "Light mode"}</span>
                  <span className="relative inline-flex h-8 w-[54px] items-center rounded-full border bg-background px-1">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-safety text-safety-foreground shadow-sm transition-transform ${
                        theme === "dark" ? "translate-x-5" : "translate-x-0"
                      }`}
                    >
                      <Icon name={theme === "dark" ? "moon" : "sun"} className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </button>
                <Link
                  to="/inquiry"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-sm bg-safety px-3 py-2.5 text-safety-foreground"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon name="fileText" className="h-4 w-4" />
                    Request Quote
                  </span>
                  {count > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-steel px-1.5 text-[11px] font-bold text-steel-foreground">
                      {count}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
