import { useEffect, useRef, useState } from "react";
import { Link, navigate } from "../Link.jsx";
import { Icon } from "../Icon.jsx";
import { useInquiryCart } from "../../lib/inquiryStore.js";
import { getCatalog } from "../../data/catalog.js";

const catalog = getCatalog();

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddedNotice, setShowAddedNotice] = useState(false);
  const addedNoticeTimer = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage?.setItem("sa_theme", theme);
  }, [theme]);

  useEffect(() => {
    const showNotice = () => {
      if (addedNoticeTimer.current) {
        window.clearTimeout(addedNoticeTimer.current);
      }

      setShowAddedNotice(true);
      addedNoticeTimer.current = window.setTimeout(() => {
        setShowAddedNotice(false);
        addedNoticeTimer.current = null;
      }, 2800);
    };

    window.addEventListener("sa:quote-added", showNotice);
    return () => {
      window.removeEventListener("sa:quote-added", showNotice);
      if (addedNoticeTimer.current) {
        window.clearTimeout(addedNoticeTimer.current);
      }
    };
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];
  const searchSuggestions = searchQuery.trim()
    ? catalog.products
        .filter((product) =>
          `${product.name} ${product.short_description ?? ""}`
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()),
        )
        .slice(0, 4)
    : [];
  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) return;
    setSearchOpen(false);
    setMenuOpen(false);
    navigate("/catalog", { category: "all", q: query });
  };

  return (
    <>
      <div className="bg-steel text-steel-foreground text-xs">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2">
          <a href="tel:+919945662206" className="flex items-center gap-1.5 hover:text-safety">
            <Icon name="phone" className="h-3 w-3" /> +91 99456 62206
          </a>
          <span className="shrink-0 text-right text-[10px] text-white/70 min-[380px]:text-xs">
            GSTIN: 29AFJPH2849Q1ZN
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur relative">
        <div className="container mx-auto flex items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4">
          <Link
            to="/"
            className="flex min-w-0 max-w-[calc(100vw-112px)] flex-1 items-center gap-2 overflow-hidden sm:max-w-none sm:gap-3 md:flex-none"
          >
            <img
              src="/logo-removebg-preview.png"
              alt="Shree Annapoorneshwari logo"
              className="h-9 w-9 flex-shrink-0 rounded-sm object-contain sm:h-12 sm:w-12"
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[12px] font-bold tracking-tight min-[380px]:text-sm sm:text-base">
                Shree Annapoorneshwari
              </div>
              <div className="truncate text-[9px] uppercase tracking-widest text-muted-foreground min-[380px]:text-[10px] sm:text-[11px]">
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
          <div className="flex w-[78px] flex-shrink-0 items-center justify-end gap-1.5 sm:w-auto sm:gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((open) => !open);
                setMenuOpen(false);
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border bg-card text-foreground transition hover:border-safety hover:text-safety sm:h-10 sm:w-10 md:hidden"
              aria-expanded={searchOpen}
              aria-label="Search products"
              title="Search"
            >
              <Icon name={searchOpen ? "x" : "search"} className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen((open) => !open);
                setSearchOpen(false);
              }}
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
            <Link
              to="/saved"
              className="hidden h-10 w-10 items-center justify-center rounded-sm text-foreground transition hover:bg-secondary hover:text-safety md:inline-flex"
              aria-label="Saved items"
              title="Saved items"
            >
              <Icon name="bookmark" className="h-4 w-4" />
            </Link>
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
        {searchOpen && (
          <form onSubmit={submitSearch} className="border-t bg-background px-4 py-3 md:hidden">
            <div className="container mx-auto flex gap-2">
              <div className="relative flex-1">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-sm border bg-card py-2.5 pl-10 pr-3 text-sm outline-none focus:border-safety"
                  autoFocus
                />
                {searchSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-sm border bg-card shadow-lg">
                    {searchSuggestions.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="block border-b px-3 py-2 text-xs last:border-b-0 hover:bg-secondary"
                      >
                        <span className="block font-semibold">{product.name}</span>
                        <span className="line-clamp-1 text-muted-foreground">
                          {product.short_description}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="rounded-sm bg-safety px-4 text-sm font-bold uppercase tracking-wider text-safety-foreground"
              >
                Go
              </button>
            </div>
          </form>
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
                <Link
                  to="/saved"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-sm border bg-card px-3 py-2"
                >
                  <Icon name="bookmark" className="h-4 w-4" />
                  Saved Items
                </Link>
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
      {showAddedNotice && (
        <div
          className="quote-snackbar pointer-events-none fixed inset-x-3 bottom-5 top-auto z-50 rounded-lg bg-steel px-4 py-2.5 text-steel-foreground shadow-xl shadow-black/20 md:inset-x-8 lg:inset-x-12"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto flex max-w-xl items-center justify-center gap-3">
            <span className="quote-mini-truck" aria-hidden="true">
              <span className="quote-mini-box quote-mini-box-one" />
              <span className="quote-mini-box quote-mini-box-two" />
              <span className="quote-mini-body" />
              <span className="quote-mini-cab" />
              <span className="quote-mini-wheel quote-mini-wheel-one" />
              <span className="quote-mini-wheel quote-mini-wheel-two" />
            </span>
            <span className="text-center">
              <span className="block text-xs font-bold uppercase leading-tight text-safety">
                ADDED TO QUOTE
              </span>
              <span className="mt-0.5 block text-[11px] leading-tight text-white/75">
                Review it anytime in Request Quote.
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
