import { Link } from "../Link.jsx";
import { Icon } from "../Icon.jsx";
import { useInquiryCart } from "../../lib/inquiryStore.js";

export function Header() {
  const cart = useInquiryCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);

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
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo-removebg-preview.png"
              alt="Shree Annapoorneshwari logo"
              className="h-12 w-12 rounded-sm object-contain"
            />
            <div className="leading-tight">
              <div className="text-base font-bold tracking-tight">Shree Annapoorneshwari</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Packaging Supply Co.
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link to="/" className="hover:text-safety">Home</Link>
            <Link to="/catalog" className="hover:text-safety">Catalog</Link>
            <Link to="/about" className="hover:text-safety">About</Link>
            <Link to="/contact" className="hover:text-safety">Contact</Link>
          </nav>
          <Link
            to="/inquiry"
            className="relative inline-flex items-center gap-2 rounded-sm bg-safety px-4 py-2.5 text-sm font-semibold text-safety-foreground hover:opacity-90"
          >
            <Icon name="fileText" className="h-4 w-4" />
            Request Quote
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-steel px-1.5 text-[11px] font-bold text-steel-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
