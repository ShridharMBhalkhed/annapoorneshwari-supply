import { Link } from "../Link.jsx";

export function Footer() {
  return (
    <footer className="site-footer mt-24 border-t text-steel-foreground">
      <div className="h-1.5 industrial-stripe" />
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <img
            src="/logo-removebg-preview.png"
            alt="Shree Annapoorneshwari Packaging logo"
            className="mb-4 h-24 w-24 object-contain"
          />
          <div className="text-lg font-bold">Shree Annapoorneshwari Packaging</div>
          <p className="mt-3 text-sm text-white/70">
            All types of packaging materials supplier - serving manufacturers, exporters and
            logistics businesses across India.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-safety">Catalog</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                to="/catalog"
                search={{ category: "adhesive-tapes" }}
                className="hover:text-safety"
              >
                Adhesive Tapes
              </Link>
            </li>
            <li>
              <Link
                to="/catalog"
                search={{ category: "packaging-films" }}
                className="hover:text-safety"
              >
                Packaging Films
              </Link>
            </li>
            <li>
              <Link
                to="/catalog"
                search={{ category: "corrugated" }}
                className="hover:text-safety"
              >
                Corrugated Boxes
              </Link>
            </li>
            <li>
              <Link
                to="/catalog"
                search={{ category: "strapping" }}
                className="hover:text-safety"
              >
                Strapping
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-safety">Company</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-safety">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-safety">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/inquiry" className="hover:text-safety">
                Request Quote
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-safety">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>No 754A/01, SLV Layout, Railway Station Road</li>
            <li>Basavanahalli, Nelamangala</li>
            <li>Bangalore Rural - 562123</li>
            <li className="pt-2">Veeresh R: +91 99456 62206</li>
            <li>Kantharaju B.R: +91 91418 88577</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        &copy; Copyright {new Date().getFullYear()} Shree Annapoorneshwari Packaging. GSTIN:
        29AFJPH2849Q1ZN
      </div>
    </footer>
  );
}
