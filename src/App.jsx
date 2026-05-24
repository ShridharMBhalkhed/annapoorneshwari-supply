import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/site/Header.jsx";
import { Footer } from "./components/site/Footer.jsx";
import { ProductImage } from "./components/site/ProductImage.jsx";
import { Icon } from "./components/Icon.jsx";
import { Link, navigate, subscribeToNavigation } from "./components/Link.jsx";
import { getCatalog, getProduct } from "./data/catalog.js";
import { inquiryStore, useInquiryCart } from "./lib/inquiryStore.js";

const catalog = getCatalog();
const heroSlides = [
  "/images/packaging-supplies-hero-1.jpeg",
  "/images/packaging-supplies-hero-2.jpeg",
  "/images/packaging-supplies-hero-3.jpeg",
  "/images/packaging-supplies-hero-4.jpeg",
  "/images/packaging-supplies-hero-5.jpeg",
  "/images/packaging-supplies-hero-6.jpeg",
];
const siteUrl = "https://annapoorneshwari-supply.netlify.app";
const whatsappUrl = "https://wa.me/919945662206";
const storeAddress =
  "No 754A/01, SLV Layout, Railway Station Road, Basavanahalli, Nelamangala, Bangalore Rural - 562123, Karnataka, India";
const storeMapQuery = encodeURIComponent(`Shree Annapoorneshwari Packaging ${storeAddress}`);
const storeMapEmbedUrl = `https://maps.google.com/maps?q=${storeMapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const storeDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${storeMapQuery}`;
const storeReviews = [
  {
    name: "Siddharth Surana",
    detail: "Local Guide - 7 months ago",
    text: "Purchased stretch films for industrial use. Very competitive pricing. Owners are very actively working hard. Definitely recommended.",
  },
  {
    name: "Dhanu Dhanish",
    detail: "Google review - 9 months ago",
    text: "Intime supplier and best quality and Price",
  },
  {
    name: "Kiccha Sudarshan",
    detail: "Google review - 9 months ago",
    text: "In time material supplier and good quality material.",
  },
];
const defaultDescription =
  "Industrial packaging materials supplier for BOPP tapes, films, corrugated boxes, strapping, bubble wrap and bulk packing accessories.";
const savedItemsKey = "sa_saved_products_v1";
const customerAccountKey = "sa_customer_account_v1";
const inquiriesKey = "sa_inquiries_v1";
const productGalleryImages = {
  "bopp-brown-tape": [
    "https://images.pexels.com/photos/8250941/pexels-photo-8250941.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3615728/pexels-photo-3615728.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "bopp-transparent-tape": [
    "https://images.pexels.com/photos/32001365/pexels-photo-32001365.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/8250941/pexels-photo-8250941.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "printed-bopp-tape": [
    "https://images.pexels.com/photos/3615728/pexels-photo-3615728.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "masking-tape": [
    "https://images.pexels.com/photos/8250941/pexels-photo-8250941.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/25300276/pexels-photo-25300276.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "stretch-film-roll": [
    "https://images.pexels.com/photos/3615728/pexels-photo-3615728.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4277794/pexels-photo-4277794.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "shrink-film": [
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3615728/pexels-photo-3615728.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "surface-protection-film": [
    "https://images.pexels.com/photos/4277794/pexels-photo-4277794.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "corrugated-boxes": [
    "https://images.pexels.com/photos/5025500/pexels-photo-5025500.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/28316095/pexels-photo-28316095.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "heavy-duty-cartons": [
    "https://images.pexels.com/photos/18500278/pexels-photo-18500278.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/5025500/pexels-photo-5025500.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "pp-strapping-roll": [
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4277794/pexels-photo-4277794.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "pet-strap-roll": [
    "https://images.pexels.com/photos/4277794/pexels-photo-4277794.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "bubble-wrap-roll": [
    "https://images.pexels.com/photos/3616731/pexels-photo-3616731.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/18500278/pexels-photo-18500278.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "foam-sheet-roll": [
    "https://images.pexels.com/photos/18541877/pexels-photo-18541877.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3616731/pexels-photo-3616731.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "pp-woven-bags": [
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/8356229/pexels-photo-8356229.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  "edge-protectors": [
    "https://images.pexels.com/photos/28316095/pexels-photo-28316095.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4277794/pexels-photo-4277794.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
};

function useLocationState() {
  const readLocation = () => ({
    pathname: window.location.pathname || "/",
    search: window.location.search,
  });

  const [location, setLocation] = useState(readLocation);

  useEffect(() => subscribeToNavigation(() => setLocation(readLocation())), []);

  return location;
}

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function setMetaTag(selector, attributes) {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    Object.entries(attributes.match).forEach(([key, value]) => tag.setAttribute(key, value));
    document.head.appendChild(tag);
  }

  Object.entries(attributes.content).forEach(([key, value]) => tag.setAttribute(key, value));
}

function usePageMeta({ title, description = defaultDescription, image, url }) {
  useEffect(() => {
    document.title = title;
    setMetaTag('meta[name="description"]', {
      match: { name: "description" },
      content: { content: description },
    });
    setMetaTag('meta[property="og:title"]', {
      match: { property: "og:title" },
      content: { content: title },
    });
    setMetaTag('meta[property="og:description"]', {
      match: { property: "og:description" },
      content: { content: description },
    });
    setMetaTag('meta[property="og:url"]', {
      match: { property: "og:url" },
      content: { content: url || siteUrl },
    });
    if (image) {
      setMetaTag('meta[property="og:image"]', {
        match: { property: "og:image" },
        content: { content: image },
      });
    }
  }, [description, image, title, url]);
}

function createSearchParams(search) {
  return new URLSearchParams(search);
}

function readSavedProductIds() {
  try {
    return JSON.parse(window.localStorage.getItem(savedItemsKey) || "[]");
  } catch {
    return [];
  }
}

function writeSavedProductIds(ids) {
  window.localStorage.setItem(savedItemsKey, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("sa:saved-products-changed"));
}

function readCurrentCustomer() {
  try {
    return JSON.parse(window.localStorage.getItem(customerAccountKey) || "null");
  } catch {
    return null;
  }
}

function writeCurrentCustomer(customer) {
  window.localStorage.setItem(customerAccountKey, JSON.stringify(customer));
  window.dispatchEvent(new CustomEvent("sa:account-changed"));
}

function clearCurrentCustomer() {
  window.localStorage.removeItem(customerAccountKey);
  window.dispatchEvent(new CustomEvent("sa:account-changed"));
}

function readSavedInquiries() {
  try {
    return JSON.parse(window.localStorage.getItem(inquiriesKey) || "[]");
  } catch {
    return [];
  }
}

function getSavedProducts() {
  return readSavedProductIds()
    .map((id) => catalog.products.find((product) => product.id === id))
    .filter(Boolean);
}

function useSavedProducts() {
  const [savedProducts, setSavedProducts] = useState(() => getSavedProducts());

  useEffect(() => {
    const update = () => setSavedProducts(getSavedProducts());

    window.addEventListener("storage", update);
    window.addEventListener("sa:saved-products-changed", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("sa:saved-products-changed", update);
    };
  }, []);

  const toggleSaved = (product) => {
    const savedIds = readSavedProductIds();
    const isSaved = savedIds.includes(product.id);
    const nextIds = isSaved
      ? savedIds.filter((id) => id !== product.id)
      : [product.id, ...savedIds].slice(0, 40);

    writeSavedProductIds(nextIds);
    return !isSaved;
  };

  return {
    savedProducts,
    savedIds: savedProducts.map((product) => product.id),
    toggleSaved,
  };
}

function createWhatsAppInquiryMessage(inquiry) {
  const customerLines = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Mobile: ${inquiry.phone}`,
    inquiry.company ? `Company: ${inquiry.company}` : null,
    inquiry.address ? `Address: ${inquiry.address}` : null,
  ].filter(Boolean);

  const itemLines = inquiry.items.map((item, index) => {
    const note = item.note ? `, Spec: ${item.note}` : "";
    return `${index + 1}. ${item.name} - Qty: ${item.quantity}${note}`;
  });

  return [
    "New bulk packaging inquiry",
    "",
    ...customerLines,
    "",
    "Items:",
    ...itemLines,
    inquiry.message ? "" : null,
    inquiry.message ? `Message: ${inquiry.message}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export default function App() {
  const location = useLocationState();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const searchParams = createSearchParams(location.search);

  return (
    <>
      <InitialLoader />
      <AppRoutes pathname={pathname} searchParams={searchParams} />
      <FloatingActions pathname={pathname} />
    </>
  );
}

function FloatingActions({ pathname }) {
  const [showHomeArrow, setShowHomeArrow] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setShowHomeArrow(false);
      return;
    }

    const updateArrow = () => setShowHomeArrow(window.scrollY > 420);
    updateArrow();
    window.addEventListener("scroll", updateArrow, { passive: true });
    return () => window.removeEventListener("scroll", updateArrow);
  }, [pathname]);

  return (
    <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-center gap-3 md:bottom-7 md:right-7">
      {pathname === "/" && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/90 text-[#1f4f9a] shadow-md shadow-black/10 backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-safety hover:bg-safety hover:text-safety-foreground focus:outline-none focus:ring-2 focus:ring-safety/40 dark:bg-background/90 dark:text-white ${
            showHomeArrow
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0"
          }`}
          aria-label="Back to top"
          title="Back to top"
          tabIndex={showHomeArrow ? 0 : -1}
          aria-hidden={!showHomeArrow}
        >
          <Icon name="arrowUp" className="h-5 w-5" />
        </button>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#36c763] bg-white/90 text-[#22a84f] shadow-lg shadow-black/10 backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#36c763] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#36c763]/40 dark:bg-background/90"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <Icon name="messageCircle" className="h-6 w-6" />
      </a>
    </div>
  );
}

function AppRoutes({ pathname, searchParams }) {
  if (pathname === "/") return <HomePage />;
  if (pathname === "/catalog") return <CatalogPage searchParams={searchParams} />;
  if (pathname === "/about") return <AboutPage />;
  if (pathname === "/contact") return <ContactPage />;
  if (pathname === "/account") return <AccountPage searchParams={searchParams} />;
  if (pathname === "/inquiry") return <InquiryPage />;
  if (pathname === "/saved") return <SavedItemsPage />;
  if (pathname.startsWith("/product/")) {
    const slug = decodeURIComponent(pathname.replace("/product/", ""));
    return <ProductPage slug={slug} />;
  }

  return <NotFoundPage />;
}

function InitialLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1700);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="delivery-loader-screen fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <DeliveryTruckLoader />
    </div>
  );
}

function DeliveryTruckLoader({ label = "Loading supplies..." }) {
  return (
    <div className="delivery-loader" aria-label={label} role="status">
      <div className="delivery-scene">
        <span className="speed-line speed-line-one" />
        <span className="speed-line speed-line-two" />
        <span className="speed-line speed-line-three" />
        <span className="loader-box loader-box-one" />
        <span className="loader-box loader-box-two" />
        <span className="loader-box loader-box-three" />
        <div className="loader-truck">
          <span className="truck-cargo" />
          <span className="truck-cab" />
          <span className="truck-window" />
          <span className="truck-wheel truck-wheel-one" />
          <span className="truck-wheel truck-wheel-two" />
          <span className="truck-wheel truck-wheel-three" />
        </div>
      </div>
      <div className="delivery-loader-label">
        {label}
      </div>
    </div>
  );
}

function HomePage() {
  useDocumentTitle("Shree Annapoorneshwari Packaging - Industrial Packaging Materials Supplier");
  const featured = catalog.products.filter((product) => product.featured).slice(0, 8);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="brand-hero relative overflow-hidden bg-steel text-steel-foreground">
          <div className="absolute inset-0">
            {heroSlides.map((imageUrl, index) => (
              <img
                key={imageUrl}
                src={imageUrl}
                alt=""
                aria-hidden="true"
                className="hero-slide absolute inset-0 h-full w-full object-cover"
                style={{ animationDelay: `${index * 5}s` }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/70" />
          <div className="container relative mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-sm bg-safety/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-safety">
                <Icon name="factory" className="h-3.5 w-3.5" /> Industrial Packaging Supplier
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
                All Types of Packaging Materials -{" "}
                <span className="text-safety">Wholesale & Bulk</span>
              </h1>
              <p className="mt-4 max-w-xl text-white/80">
                BOPP tapes, stretch film, corrugated boxes, strapping, bubble wrap, PP woven
                bags and more. Direct from our Bangalore facility to manufacturers, exporters
                and logistics businesses across India.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 rounded-sm bg-safety px-5 py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground hover:opacity-90"
                >
                  Browse Catalog <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+919945662206"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10"
                >
                  <Icon name="phone" className="h-4 w-4" /> Call Sales
                </a>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-sm">
                <div>
                  <div className="text-2xl font-bold text-safety">{catalog.products.length}+</div>
                  <div className="text-white/60">SKUs in stock</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-safety">{catalog.categories.length}</div>
                  <div className="text-white/60">Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-safety">PAN India</div>
                  <div className="text-white/60">Dispatch</div>
                </div>
              </div>
            </div>
            <div className="hidden grid-cols-2 gap-3 md:grid">
              {featured.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group block rounded-sm bg-white/5 p-4 ring-1 ring-white/10 hover:ring-safety"
                >
                  <ProductImage
                    name={product.name}
                    url={product.image_url}
                    className="aspect-square w-full rounded-sm bg-white/95 object-contain"
                  />
                  <div className="mt-2 text-xs font-semibold text-white group-hover:text-safety">
                    {product.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-secondary/40">
          <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
            {[
              { icon: "truck", title: "Bulk Dispatch", subtitle: "Truck-load quantities" },
              { icon: "shield", title: "Quality Tested", subtitle: "Industry-grade specs" },
              { icon: "badge", title: "GST Registered", subtitle: "29AFJPH2849Q1ZN" },
              { icon: "factory", title: "Direct Supply", subtitle: "From our facility" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <Icon name={item.icon} className="h-8 w-8 text-safety" />
                <div>
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="flex items-end justify-between border-b-2 border-steel pb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-safety">
                Shop by Category
              </div>
              <h2 className="mt-1 text-2xl font-bold md:text-3xl">Product Categories</h2>
            </div>
            <Link to="/catalog" className="hidden text-sm font-semibold text-safety hover:underline sm:block">
              View all &rarr;
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {catalog.categories.map((category) => {
              const count = catalog.products.filter(
                (product) => product.category_id === category.id,
              ).length;

              return (
                <Link
                  key={category.id}
                  to="/catalog"
                  search={{ category: category.slug }}
                  className="group flex flex-col items-start gap-1 rounded-sm border bg-card p-4 hover:border-safety hover:shadow-md"
                >
                  <div className="h-1 w-8 bg-safety transition-all group-hover:w-full" />
                  <div className="mt-2 text-sm font-bold leading-tight">{category.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {count} product{count !== 1 && "s"}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-secondary/30">
          <div className="container mx-auto px-4 py-16">
            <div className="flex items-end justify-between border-b-2 border-steel pb-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-safety">
                  Best Sellers
                </div>
                <h2 className="mt-1 text-2xl font-bold md:text-3xl">Featured Products</h2>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {featured.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group flex flex-col rounded-sm border bg-card transition hover:border-safety hover:shadow-md"
                >
                  <ProductImage
                    name={product.name}
                    url={product.image_url}
                    className="aspect-square w-full bg-white object-contain p-4"
                  />
                  <div className="border-t p-3">
                    <div className="text-sm font-bold leading-tight group-hover:text-safety">
                      {product.name}
                    </div>
                    {product.short_description && (
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {product.short_description}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CustomerReviewsSection />

        <StoreLocationSection />

        <section className="container mx-auto px-4 py-20">
          <div className="brand-panel relative overflow-visible rounded-sm bg-steel px-8 py-10 text-steel-foreground md:min-h-[300px] md:px-12 md:py-12 md:pr-[340px] lg:pr-[400px]">
            <div className="absolute right-0 top-0 hidden h-full w-1/3 md:block" />
            <img
              src="/WhatsApp_Image_2026-05-24_at_00.09.44-removebg-preview.png"
              alt="BOPP adhesive tape"
              className="pointer-events-none absolute -bottom-14 -right-4 hidden h-[390px] w-[280px] object-contain object-bottom drop-shadow-2xl md:block lg:-bottom-16 lg:-right-6 lg:h-[440px] lg:w-[330px]"
            />
            <div className="relative max-w-xl">
              <h2 className="text-2xl font-bold md:text-3xl">Need a bulk quote?</h2>
              <p className="mt-2 text-white/80">
                Add products to your inquiry list and send us specs, sizes and quantities. We
                respond within one business day.
              </p>
              <Link
                to="/inquiry"
                className="mt-5 inline-flex items-center gap-2 rounded-sm bg-safety px-5 py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground"
              >
                Request a Quote <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CatalogPage({ searchParams }) {
  useDocumentTitle("Product Catalog - Shree Annapoorneshwari Packaging");
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("q") || "";
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem("sa_recent_products_v1") || "[]");
    setRecentlyViewed(
      saved
        .map((id) => catalog.products.find((item) => item.id === id))
        .filter(Boolean)
        .slice(0, 4),
    );
  }, []);

  const filtered = useMemo(() => {
    const selectedCategory = catalog.categories.find((item) => item.slug === category);
    const normalizedQuery = query.trim().toLowerCase();

    return catalog.products.filter((product) => {
      if (selectedCategory && product.category_id !== selectedCategory.id) return false;
      if (
        normalizedQuery &&
        !`${product.name} ${product.short_description ?? ""}`
          .toLowerCase()
          .includes(normalizedQuery)
      ) {
        return false;
      }
      return true;
    });
  }, [category, query]);
  const searchSuggestions = query.trim() ? filtered.slice(0, 5) : [];

  const updateFilters = (next) => {
    const isTypingSearch = Object.prototype.hasOwnProperty.call(next, "q");

    navigate("/catalog", {
      category,
      q: query,
      ...next,
    }, {
      keepScroll: isTypingSearch,
      replace: isTypingSearch,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-steel text-steel-foreground">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs font-bold uppercase tracking-widest text-safety">Catalog</div>
            <h1 className="mt-1 text-3xl font-bold">Industrial Packaging Products</h1>
            <p className="mt-1 text-sm text-white/70">
              {catalog.products.length} SKUs across {catalog.categories.length} categories
            </p>
          </div>
        </div>

        <div className="sticky top-[73px] z-30 border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3">
            <TabLink active={category === "all"} onClick={() => updateFilters({ category: "all" })}>
              All ({catalog.products.length})
            </TabLink>
            {catalog.categories.map((item) => {
              const count = catalog.products.filter((product) => product.category_id === item.id).length;
              return (
                <TabLink
                  key={item.id}
                  active={category === item.slug}
                  onClick={() => updateFilters({ category: item.slug })}
                >
                  {item.name} ({count})
                </TabLink>
              );
            })}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[240px] flex-1">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={query}
                onChange={(event) => updateFilters({ q: event.target.value })}
                placeholder="Search products, materials, sizes..."
                className="w-full rounded-sm border bg-card py-2.5 pl-10 pr-10 text-sm outline-none focus:border-safety"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => updateFilters({ q: "" })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="x" className="h-4 w-4" />
                </button>
              )}
              {searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-sm border bg-card shadow-lg">
                  {searchSuggestions.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
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
            <div className="text-sm text-muted-foreground">
              {filtered.length} result{filtered.length !== 1 && "s"}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-sm border border-dashed p-12 text-center text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {recentlyViewed.length > 0 && (
            <div className="mt-12">
              <h2 className="border-b-2 border-steel pb-3 text-xl font-bold">
                Recently Viewed
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {recentlyViewed.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="group flex flex-col rounded-sm border bg-card transition hover:border-safety hover:shadow-md">
      <Link to={`/product/${product.slug}`} className="block">
        <ProductImage
          name={product.name}
          url={product.image_url}
          className="aspect-square w-full bg-white object-contain p-4"
        />
      </Link>
      <div className="flex flex-1 flex-col border-t p-3">
        <Link to={`/product/${product.slug}`} className="text-sm font-bold leading-tight hover:text-safety">
          {product.name}
        </Link>
        {product.short_description && (
          <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {product.short_description}
          </div>
        )}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {Object.entries(product.specs)
              .slice(0, 2)
              .map(([key, value]) => (
                <span
                  key={key}
                  className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {key}: {value}
                </span>
              ))}
          </div>
        )}
        <button
          type="button"
          onClick={() =>
            inquiryStore.add({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              imageUrl: product.image_url,
            })
          }
          className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-sm bg-steel py-2 text-xs font-bold uppercase tracking-wider text-steel-foreground hover:bg-safety hover:text-safety-foreground"
        >
          <Icon name="plus" className="h-3.5 w-3.5" /> Add to Quote
        </button>
      </div>
    </div>
  );
}

function ProductPage({ slug }) {
  const { product, related } = getProduct(slug);
  const [added, setAdded] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const { savedIds, toggleSaved } = useSavedProducts();

  useDocumentTitle(
    product
      ? `${product.name} - Shree Annapoorneshwari Packaging`
      : "Product - Shree Annapoorneshwari Packaging",
  );
  usePageMeta({
    title: product
      ? `${product.name} - Shree Annapoorneshwari Packaging`
      : "Product - Shree Annapoorneshwari Packaging",
    description: product?.description || product?.short_description || defaultDescription,
    image: product?.image_url,
    url: product ? `${siteUrl}/product/${product.slug}` : siteUrl,
  });

  useEffect(() => {
    if (!product) return;

    const saved = JSON.parse(window.localStorage.getItem("sa_recent_products_v1") || "[]");
    const next = [product.id, ...saved.filter((id) => id !== product.id)].slice(0, 6);
    window.localStorage.setItem("sa_recent_products_v1", JSON.stringify(next));
    setRecentlyViewed(
      saved
        .filter((id) => id !== product.id)
        .map((id) => catalog.products.find((item) => item.id === id))
        .filter(Boolean)
        .slice(0, 4),
    );
  }, [product?.id]);

  if (!product) return <NotFoundPage />;

  const specs = product.specs ?? {};
  const applications = product.applications ?? [];
  const category = product.category;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-secondary/40">
          <div className="container mx-auto flex flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-safety">Home</Link>
            <Icon name="chevronRight" className="h-3 w-3" />
            <Link to="/catalog" className="hover:text-safety">Catalog</Link>
            {category && (
              <>
                <Icon name="chevronRight" className="h-3 w-3" />
                <Link
                  to="/catalog"
                  search={{ category: category.slug }}
                  className="hover:text-safety"
                >
                  {category.name}
                </Link>
              </>
            )}
            <Icon name="chevronRight" className="h-3 w-3" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto grid gap-10 px-4 py-10 md:grid-cols-2">
          <div>
            <ProductMediaGallery
              isSaved={savedIds.includes(product.id)}
              product={product}
              onToggleSaved={() => toggleSaved(product)}
            />
          </div>
          <div>
            {category && (
              <div className="text-xs font-bold uppercase tracking-widest text-safety">
                {category.name}
              </div>
            )}
            <h1 className="mt-1 text-3xl font-bold leading-tight">{product.name}</h1>
            {product.short_description && (
              <p className="mt-3 text-muted-foreground">{product.short_description}</p>
            )}
            {product.description && (
              <p className="mt-3 text-sm leading-relaxed">{product.description}</p>
            )}

            {Object.keys(specs).length > 0 && (
              <div className="mt-6 overflow-hidden rounded-sm border">
                <div className="bg-steel px-4 py-2 text-xs font-bold uppercase tracking-widest text-steel-foreground">
                  Specifications
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(specs).map(([key, value], index) => (
                      <tr key={key} className={index % 2 ? "bg-muted/40" : ""}>
                        <td className="w-1/3 px-4 py-2.5 font-semibold text-muted-foreground">
                          {key}
                        </td>
                        <td className="px-4 py-2.5">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {applications.length > 0 && (
              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-widest text-safety">
                  Applications
                </div>
                <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {applications.map((application) => (
                    <li key={application} className="flex items-start gap-2 text-sm">
                      <Icon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-safety" />
                      <span>{application}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <QuantityStepper value={productQuantity} onChange={setProductQuantity} />
              <button
                type="button"
                onClick={() => {
                  inquiryStore.add({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    imageUrl: product.image_url,
                    quantity: productQuantity,
                  });
                  setAdded(true);
                  window.setTimeout(() => setAdded(false), 2800);
                }}
                className="inline-flex items-center gap-2 rounded-sm bg-safety px-5 py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground hover:opacity-90"
              >
                <Icon name={added ? "check" : "plus"} className="h-4 w-4" />
                {added ? "Added to Quote" : "Add to Quote"}
              </button>
              <Link
                to="/inquiry"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-steel bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-steel hover:text-steel-foreground dark:border-white dark:bg-white dark:text-black dark:hover:bg-safety dark:hover:text-safety-foreground"
              >
                Request Quote
              </Link>
            </div>

            <div className="mt-6 rounded-sm border bg-secondary/40 p-4 text-sm">
              <div className="font-semibold">Need this in bulk?</div>
              <div className="mt-2 flex flex-wrap gap-4 text-muted-foreground">
                <a href="tel:+919945662206" className="flex items-center gap-1.5 hover:text-safety">
                  <Icon name="phone" className="h-4 w-4" /> +91 99456 62206
                </a>
                <a
                  href={`https://wa.me/919945662206?text=${encodeURIComponent(
                    `Please call me back about ${product.name}.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-safety"
                >
                  <Icon name="phone" className="h-4 w-4" /> Request Callback
                </a>
                <a
                  href="mailto:s.annapoorneshwarienterprises@gmail.com"
                  className="flex items-center gap-1.5 hover:text-safety"
                >
                  <Icon name="mail" className="h-4 w-4" /> Email Sales
                </a>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <h2 className="border-b-2 border-steel pb-3 text-xl font-bold">Related Products</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col rounded-sm border bg-card hover:border-safety"
                >
                  <div className="relative">
                    <Link to={`/product/${item.slug}`} className="block">
                      <ProductImage
                        name={item.name}
                        url={item.image_url}
                        className="aspect-square w-full bg-white object-contain p-4"
                      />
                    </Link>
                    <SaveButton
                      isSaved={savedIds.includes(item.id)}
                      onClick={() => toggleSaved(item)}
                      className="absolute right-2 top-2"
                      label={`Save ${item.name}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t p-3">
                    <Link
                      to={`/product/${item.slug}`}
                      className="text-sm font-bold hover:text-safety"
                    >
                      {item.name}
                    </Link>
                    {item.short_description && (
                      <div className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                        {item.short_description}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        inquiryStore.add({
                          productId: item.id,
                          slug: item.slug,
                          name: item.name,
                          imageUrl: item.image_url,
                        })
                      }
                      className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-sm bg-steel py-2 text-xs font-bold uppercase tracking-wider text-steel-foreground hover:bg-safety hover:text-safety-foreground"
                    >
                      <Icon name="plus" className="h-3.5 w-3.5" /> Add to Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {recentlyViewed.length > 0 && (
          <div className="bg-secondary/30">
            <div className="container mx-auto px-4 py-12">
              <h2 className="border-b-2 border-steel pb-3 text-xl font-bold">
                Recently Viewed
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {recentlyViewed.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.slug}`}
                    className="group rounded-sm border bg-card hover:border-safety"
                  >
                    <ProductImage
                      name={item.name}
                      url={item.image_url}
                      className="aspect-square w-full bg-white object-contain p-4"
                    />
                    <div className="border-t p-3">
                      <div className="text-sm font-bold group-hover:text-safety">{item.name}</div>
                      {item.short_description && (
                        <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {item.short_description}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function AboutPage() {
  useDocumentTitle("About - Shree Annapoorneshwari Packaging");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-steel text-steel-foreground">
          <div className="container mx-auto px-4 py-10">
            <div className="text-xs font-bold uppercase tracking-widest text-safety">About Us</div>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">
              All Types of Packaging Materials - One Trusted Supplier
            </h1>
            <p className="mt-3 max-w-3xl text-white/80">
              Shree Annapoorneshwari Packaging is a Bangalore-based wholesale supplier of
              industrial packaging materials. We serve manufacturers, exporters, e-commerce
              fulfilment centres and logistics businesses across India with consistent quality
              and dependable dispatch.
            </p>
          </div>
        </div>

        <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2">
          <div>
            <h2 className="border-b-2 border-steel pb-3 text-xl font-bold">Our Business</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We supply BOPP adhesive tapes, packaging films, corrugated boxes, strapping,
              bubble wrap, PP woven bags, stretch films, fasteners and a wide range of
              industrial packaging consumables. Our specification-grade products are sourced
              from trusted converters and held in inventory at our Nelamangala facility, ready
              for same-day pickup or dispatch.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Whether you need a single pallet or a truckload, we offer transparent pricing,
              GST invoicing and pan-India delivery.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "factory", title: "Direct Supply", detail: "From our Bangalore warehouse" },
              { icon: "shield", title: "Quality Tested", detail: "Spec-grade materials" },
              { icon: "truck", title: "PAN India", detail: "Reliable dispatch" },
              { icon: "badge", title: "GST Registered", detail: "29AFJPH2849Q1ZN" },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border bg-card p-4">
                <Icon name={item.icon} className="h-8 w-8 text-safety" />
                <div className="mt-3 text-sm font-bold">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary/40">
          <div className="container mx-auto grid gap-6 px-4 py-10 md:grid-cols-3">
            <Info title="Address">
              No 754A/01, SLV Layout
              <br />
              Railway Station Road, Basavanahalli
              <br />
              Nelamangala, Bangalore Rural - 562123
            </Info>
            <Info title="Sales Contacts">
              Veeresh R: +91 99456 62206
              <br />
              Kantharaju B.R: +91 91418 88577
              <br />
              s.annapoorneshwarienterprises@gmail.com
            </Info>
            <Info title="Compliance">
              GSTIN: 29AFJPH2849Q1ZN
              <br />
              Proprietorship Firm
              <br />
              Karnataka, India
            </Info>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-sm bg-safety px-6 py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground"
          >
            Explore Our Catalog
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ContactPage() {
  useDocumentTitle("Contact - Shree Annapoorneshwari Packaging");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-steel text-steel-foreground">
          <div className="container mx-auto px-4 py-10">
            <div className="text-xs font-bold uppercase tracking-widest text-safety">Get in touch</div>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">Contact Sales</h1>
            <p className="mt-2 text-white/70">
              For bulk quotes, please use the RFQ form to send specs along with quantities.
            </p>
          </div>
        </div>

        <div className="container mx-auto grid gap-6 px-4 py-12 md:grid-cols-2">
          <ContactCard icon="phone" title="Phone">
            <a href="tel:+919945662206" className="block hover:text-safety">
              Veeresh R - +91 99456 62206
            </a>
            <a href="tel:+919141888577" className="block hover:text-safety">
              Kantharaju B.R - +91 91418 88577
            </a>
          </ContactCard>
          <ContactCard icon="mail" title="Email">
            <a
              href="mailto:s.annapoorneshwarienterprises@gmail.com"
              className="break-all hover:text-safety"
            >
              s.annapoorneshwarienterprises@gmail.com
            </a>
          </ContactCard>
          <ContactCard icon="mapPin" title="Address">
            {storeAddress}
          </ContactCard>
          <ContactCard icon="clock" title="Business Hours">
            Mon - Sat - 9:00 AM - 7:00 PM IST
            <br />
            Sunday closed
          </ContactCard>
        </div>

        <StoreLocationSection compact />

        <CustomerReviewsSection compact />

        <div className="container mx-auto px-4 pb-16 text-center">
          <Link
            to="/inquiry"
            className="inline-flex items-center gap-2 rounded-sm bg-safety px-6 py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground"
          >
            Request a Bulk Quote
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function AccountPage({ searchParams }) {
  useDocumentTitle("Account - Shree Annapoorneshwari Packaging");
  const [customer, setCustomer] = useState(() => readCurrentCustomer());
  const [loginEmail, setLoginEmail] = useState(customer?.email || "");
  const [pendingOtp, setPendingOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [notice, setNotice] = useState("");
  const [createForm, setCreateForm] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    company: customer?.company || "",
  });
  const mode = searchParams.get("mode") || (customer ? "orders" : "login");
  const inquiries = readSavedInquiries();
  const customerOrders = customer
    ? inquiries.filter(
        (inquiry) => inquiry.email?.toLowerCase() === customer.email?.toLowerCase(),
      )
    : [];

  const saveCustomer = (nextCustomer) => {
    const enrichedCustomer = {
      ...nextCustomer,
      name: nextCustomer.name || nextCustomer.email.split("@")[0],
      joinedAt: nextCustomer.joinedAt || new Date().toISOString(),
    };
    writeCurrentCustomer(enrichedCustomer);
    setCustomer(enrichedCustomer);
    setNotice("Account ready. Your matching quote requests are shown below.");
    navigate("/account", { mode: "orders" }, { replace: true });
  };

  const sendOtp = (event) => {
    event.preventDefault();
    if (!loginEmail) return;
    const nextOtp = String(Math.floor(100000 + Math.random() * 900000));
    setPendingOtp(nextOtp);
    setEnteredOtp("");
    setNotice("Preview OTP generated for this static site.");
  };

  const verifyOtp = (event) => {
    event.preventDefault();
    if (enteredOtp !== pendingOtp) {
      setNotice("That OTP does not match. Please check the code and try again.");
      return;
    }

    const matchingInquiry = inquiries.find(
      (inquiry) => inquiry.email?.toLowerCase() === loginEmail.toLowerCase(),
    );
    saveCustomer({
      name: matchingInquiry?.name || "",
      email: loginEmail,
      phone: matchingInquiry?.phone || "",
      company: matchingInquiry?.company || "",
      provider: "Email OTP",
    });
  };

  const createAccount = (event) => {
    event.preventDefault();
    if (!createForm.name || !createForm.email || !createForm.phone) return;
    saveCustomer({
      ...createForm,
      provider: "Email",
    });
  };

  const loginWithGoogle = () => {
    saveCustomer({
      name: "Google Customer",
      email: "google.customer@example.com",
      phone: "",
      company: "",
      provider: "Google",
    });
  };

  const logout = () => {
    clearCurrentCustomer();
    setCustomer(null);
    setPendingOtp("");
    setNotice("You have been signed out.");
    navigate("/account", { mode: "login" }, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-steel text-steel-foreground">
          <div className="container mx-auto px-4 py-10">
            <div className="text-xs font-bold uppercase tracking-widest text-safety">
              Customer Account
            </div>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">
              Login, Create Account & Track Orders
            </h1>
            <p className="mt-2 max-w-2xl text-white/70">
              Keep your quote requests, contact details and reorder history in one place.
            </p>
          </div>
        </div>

        <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[280px,1fr]">
          <aside className="h-fit rounded-sm border bg-card p-4">
            {customer ? (
              <div className="border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-safety text-lg font-bold text-safety-foreground">
                    {customer.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-bold">{customer.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{customer.email}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-b pb-4">
                <div className="font-bold">Welcome</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Sign in to view your requests.
                </div>
              </div>
            )}
            <nav className="mt-4 grid gap-2 text-sm font-semibold">
              <Link
                to="/account"
                search={{ mode: "login" }}
                className={`rounded-sm px-3 py-2 ${
                  mode === "login" ? "bg-secondary text-safety" : "hover:bg-secondary"
                }`}
              >
                Login
              </Link>
              <Link
                to="/account"
                search={{ mode: "create" }}
                className={`rounded-sm px-3 py-2 ${
                  mode === "create" ? "bg-secondary text-safety" : "hover:bg-secondary"
                }`}
              >
                Create Account
              </Link>
              <Link
                to="/account"
                search={{ mode: "orders" }}
                className={`rounded-sm px-3 py-2 ${
                  mode === "orders" ? "bg-secondary text-safety" : "hover:bg-secondary"
                }`}
              >
                My Orders
              </Link>
            </nav>
            {customer && (
              <button
                type="button"
                onClick={logout}
                className="mt-4 w-full rounded-sm border px-3 py-2 text-sm font-bold hover:border-safety hover:text-safety"
              >
                Sign Out
              </button>
            )}
          </aside>

          <section>
            {notice && (
              <div className="mb-4 rounded-sm border bg-card px-4 py-3 text-sm text-muted-foreground">
                {notice}
              </div>
            )}

            {mode === "login" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-sm border bg-card p-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-safety">
                    Quick Login
                  </div>
                  <h2 className="mt-1 text-2xl font-bold">Continue with Google</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use your Google identity for a faster checkout and order history.
                  </p>
                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm border px-4 py-3 text-sm font-bold uppercase tracking-wider hover:border-safety hover:text-safety"
                  >
                    <Icon name="google" className="h-4 w-4" /> Login with Google
                  </button>
                </div>

                <form onSubmit={pendingOtp ? verifyOtp : sendOtp} className="rounded-sm border bg-card p-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-safety">
                    Email OTP
                  </div>
                  <h2 className="mt-1 text-2xl font-bold">Login with Email</h2>
                  <div className="mt-5 space-y-4">
                    <Field
                      label="Email Address *"
                      type="email"
                      value={loginEmail}
                      onChange={setLoginEmail}
                      required
                    />
                    {pendingOtp && (
                      <>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            One-Time Password *
                          </label>
                          <input
                            value={enteredOtp}
                            onChange={(event) => setEnteredOtp(event.target.value)}
                            inputMode="numeric"
                            maxLength={6}
                            className="mt-1 w-full rounded-sm border px-3 py-2 text-sm outline-none focus:border-safety"
                          />
                        </div>
                        <div className="rounded-sm bg-secondary px-3 py-2 text-xs text-muted-foreground">
                          Preview OTP: <span className="font-bold text-foreground">{pendingOtp}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="mt-5 w-full rounded-sm bg-safety py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground"
                  >
                    {pendingOtp ? "Verify & Continue" : "Continue"}
                  </button>
                </form>
              </div>
            )}

            {mode === "create" && (
              <form onSubmit={createAccount} className="max-w-2xl rounded-sm border bg-card p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-safety">
                  New Customer
                </div>
                <h2 className="mt-1 text-2xl font-bold">Create Your Account</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Save your contact details for faster RFQs, pickup coordination and repeat orders.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Field
                    label="Full Name *"
                    value={createForm.name}
                    onChange={(value) => setCreateForm({ ...createForm, name: value })}
                    required
                  />
                  <Field
                    label="Mobile Number *"
                    value={createForm.phone}
                    onChange={(value) => setCreateForm({ ...createForm, phone: value })}
                    required
                  />
                  <Field
                    label="Email Address *"
                    type="email"
                    value={createForm.email}
                    onChange={(value) => setCreateForm({ ...createForm, email: value })}
                    required
                  />
                  <Field
                    label="Company"
                    value={createForm.company}
                    onChange={(value) => setCreateForm({ ...createForm, company: value })}
                  />
                </div>
                <div className="mt-5 grid gap-3 rounded-sm bg-secondary/50 p-4 text-sm md:grid-cols-3">
                  <div>
                    <div className="font-bold">Fast RFQ</div>
                    <div className="mt-1 text-muted-foreground">Details prefilled for new quote requests.</div>
                  </div>
                  <div>
                    <div className="font-bold">Order History</div>
                    <div className="mt-1 text-muted-foreground">See matching inquiries by email.</div>
                  </div>
                  <div>
                    <div className="font-bold">Easy Reorder</div>
                    <div className="mt-1 text-muted-foreground">Review quantities and product names quickly.</div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 rounded-sm bg-safety px-5 py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground"
                >
                  Create Account
                </button>
              </form>
            )}

            {mode === "orders" && (
              <div className="rounded-sm border bg-card p-6">
                <div className="flex flex-col gap-3 border-b pb-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-safety">
                      My Orders
                    </div>
                    <h2 className="mt-1 text-2xl font-bold">Quote Request History</h2>
                  </div>
                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 rounded-sm bg-safety px-4 py-2 text-sm font-bold uppercase tracking-wider text-safety-foreground"
                  >
                    New Quote <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </div>
                {!customer ? (
                  <div className="py-10 text-center">
                    <Icon name="user" className="mx-auto h-10 w-10 text-muted-foreground" />
                    <div className="mt-3 font-semibold">Login to view your orders</div>
                    <Link
                      to="/account"
                      search={{ mode: "login" }}
                      className="mt-4 inline-flex rounded-sm bg-safety px-4 py-2 text-sm font-bold uppercase tracking-wider text-safety-foreground"
                    >
                      Login
                    </Link>
                  </div>
                ) : customerOrders.length === 0 ? (
                  <div className="py-10 text-center">
                    <Icon name="fileText" className="mx-auto h-10 w-10 text-muted-foreground" />
                    <div className="mt-3 font-semibold">No quote requests yet</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Requests submitted with {customer.email} will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 grid gap-4">
                    {customerOrders.map((order, index) => (
                      <article key={`${order.createdAt}-${index}`} className="rounded-sm border p-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="font-bold">Quote #{customerOrders.length - index}</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {new Date(order.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="rounded-sm bg-secondary px-3 py-1 text-xs font-bold uppercase text-muted-foreground">
                            Submitted
                          </div>
                        </div>
                        <ul className="mt-4 divide-y rounded-sm border text-sm">
                          {order.items.map((item) => (
                            <li key={item.productId} className="flex justify-between gap-3 px-3 py-2">
                              <span className="font-medium">{item.name}</span>
                              <span className="shrink-0 text-muted-foreground">Qty: {item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InquiryPage() {
  useDocumentTitle("Request a Quote - Shree Annapoorneshwari Packaging");
  const cart = useInquiryCart();
  const currentCustomer = readCurrentCustomer();
  const [form, setForm] = useState({
    name: currentCustomer?.name || "",
    email: currentCustomer?.email || "",
    phone: currentCustomer?.phone || "",
    company: currentCustomer?.company || "",
    address: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (cart.length === 0 || !form.name || !form.email || !form.phone) return;

    setIsSending(true);
    const inquiry = {
      ...form,
      items: cart,
      createdAt: new Date().toISOString(),
    };

    const saved = readSavedInquiries();
    window.localStorage.setItem(inquiriesKey, JSON.stringify([inquiry, ...saved]));
    window.open(
      `https://wa.me/919945662206?text=${encodeURIComponent(createWhatsAppInquiryMessage(inquiry))}`,
      "_blank",
      "noopener,noreferrer",
    );

    window.setTimeout(() => {
      setSubmittedInquiry(inquiry);
      setSubmitted(true);
      setIsSending(false);
      inquiryStore.clear();
    }, 1650);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
          <div className="rounded-full bg-safety/20 p-4">
            <Icon name="check" className="h-10 w-10 text-safety" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Quote request received</h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            Thank you. A WhatsApp message with your inquiry details has been prepared for our
            sales team.
          </p>
          {submittedInquiry && (
            <div className="mt-6 w-full max-w-lg rounded-sm border bg-card p-4 text-left">
              <div className="border-b pb-2 text-sm font-bold">Inquiry Summary</div>
              <div className="mt-3 grid gap-1 text-sm text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">Name:</span>{" "}
                  {submittedInquiry.name}
                </div>
                <div>
                  <span className="font-semibold text-foreground">Mobile:</span>{" "}
                  {submittedInquiry.phone}
                </div>
                {submittedInquiry.address && (
                  <div>
                    <span className="font-semibold text-foreground">Address:</span>{" "}
                    {submittedInquiry.address}
                  </div>
                )}
              </div>
              <ul className="mt-3 divide-y rounded-sm border text-sm">
                {submittedInquiry.items.map((item) => (
                  <li key={item.productId} className="flex justify-between gap-3 px-3 py-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link
            to="/catalog"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-steel px-5 py-3 text-sm font-bold uppercase tracking-wider text-steel-foreground"
          >
            Continue Browsing
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {isSending && (
        <div className="delivery-loader-screen fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm">
          <DeliveryTruckLoader label="Sending quote request..." />
        </div>
      )}
      <Header />
      <main className="flex-1">
        <div className="border-b bg-steel text-steel-foreground">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs font-bold uppercase tracking-widest text-safety">
              Request Quote
            </div>
            <h1 className="mt-1 text-3xl font-bold">Bulk Inquiry / RFQ</h1>
            <p className="mt-1 text-sm text-white/70">
              Add products and tell us your quantities. We respond within one business day.
            </p>
          </div>
        </div>

        <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[1fr,400px]">
          <div>
            <div className="border-b-2 border-steel pb-3 text-lg font-bold">
              Items ({cart.length})
            </div>
            {cart.length === 0 ? (
              <div className="mt-4 rounded-sm border border-dashed p-10 text-center">
                <Icon name="fileText" className="mx-auto h-10 w-10 text-muted-foreground" />
                <div className="mt-3 font-semibold">Your inquiry is empty</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse the catalog and add products to request a quote.
                </p>
                <Link
                  to="/catalog"
                  className="mt-4 inline-flex items-center gap-2 rounded-sm bg-safety px-4 py-2 text-sm font-bold uppercase tracking-wider text-safety-foreground"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <ul className="mt-4 divide-y rounded-sm border bg-card">
                {cart.map((item) => {
                  const catalogProduct = catalog.products.find(
                    (product) => product.id === item.productId,
                  );
                  const imageUrl = item.imageUrl || catalogProduct?.image_url;

                  return (
                    <li key={item.productId} className="flex gap-3 p-3">
                      <ProductImage
                        name={item.name}
                        url={imageUrl}
                        className="h-20 w-20 flex-shrink-0 bg-white object-contain p-2"
                      />
                      <div className="flex-1">
                        <Link to={`/product/${item.slug}`} className="font-bold hover:text-safety">
                          {item.name}
                        </Link>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(quantity) =>
                              inquiryStore.setQuantity(item.productId, quantity)
                            }
                            size="sm"
                          />
                          <input
                            placeholder="Size / spec note (optional)"
                            value={item.note ?? ""}
                            onChange={(event) =>
                              inquiryStore.setNote(item.productId, event.target.value)
                            }
                            className="min-w-[160px] flex-1 rounded-sm border px-2 py-1 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => inquiryStore.remove(item.productId)}
                            className="rounded-sm border p-1.5 text-muted-foreground hover:text-destructive"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Icon name="trash" className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <aside>
            <form onSubmit={onSubmit} className="rounded-sm border bg-card p-5">
              <div className="border-b-2 border-steel pb-3 text-lg font-bold">Your Details</div>
              <div className="mt-4 space-y-3">
                <Field
                  label="Full Name *"
                  value={form.name}
                  onChange={(value) => setForm({ ...form, name: value })}
                  required
                />
                <Field
                  label="Email *"
                  type="email"
                  value={form.email}
                  onChange={(value) => setForm({ ...form, email: value })}
                  required
                />
                <Field
                  label="Mobile Number *"
                  value={form.phone}
                  onChange={(value) => setForm({ ...form, phone: value })}
                  required
                />
                <Field
                  label="Company"
                  value={form.company}
                  onChange={(value) => setForm({ ...form, company: value })}
                />
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Address
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(event) => setForm({ ...form, address: event.target.value })}
                    rows={3}
                    placeholder="Delivery address / city / pincode"
                    className="mt-1 w-full rounded-sm border px-3 py-2 text-sm outline-none focus:border-safety"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Message (optional)
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    rows={4}
                    placeholder="Tell us about your requirements, delivery location, timeline..."
                    className="mt-1 w-full rounded-sm border px-3 py-2 text-sm outline-none focus:border-safety"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSending || cart.length === 0 || !form.name || !form.email || !form.phone}
                className="mt-5 w-full rounded-sm bg-safety py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground disabled:opacity-40"
              >
                {isSending ? "Sending..." : "Submit Inquiry"}
              </button>
              {cart.length === 0 && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Add at least one product to submit.
                </p>
              )}
            </form>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SavedItemsPage() {
  useDocumentTitle("Saved Items - Shree Annapoorneshwari Packaging");
  const { savedProducts, savedIds, toggleSaved } = useSavedProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-steel text-steel-foreground">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs font-bold uppercase tracking-widest text-safety">
              Saved Items
            </div>
            <h1 className="mt-1 text-3xl font-bold">Your Saved Products</h1>
            <p className="mt-1 text-sm text-white/70">
              Keep useful packaging materials here and add them to your quote when ready.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          {savedProducts.length === 0 ? (
            <div className="rounded-sm border border-dashed p-10 text-center">
              <Icon name="bookmark" className="mx-auto h-10 w-10 text-muted-foreground" />
              <div className="mt-3 font-semibold">No saved items yet</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Use the save icon on product images or related products to keep them here.
              </p>
              <Link
                to="/catalog"
                className="mt-4 inline-flex items-center gap-2 rounded-sm bg-safety px-4 py-2 text-sm font-bold uppercase tracking-wider text-safety-foreground"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col rounded-sm border bg-card transition hover:border-safety hover:shadow-md"
                >
                  <div className="relative">
                    <Link to={`/product/${product.slug}`} className="block">
                      <ProductImage
                        name={product.name}
                        url={product.image_url}
                        className="aspect-square w-full bg-white object-contain p-4"
                      />
                    </Link>
                    <SaveButton
                      isSaved={savedIds.includes(product.id)}
                      onClick={() => toggleSaved(product)}
                      className="absolute right-2 top-2"
                      label={`Remove ${product.name} from saved items`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t p-3">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-sm font-bold leading-tight hover:text-safety"
                    >
                      {product.name}
                    </Link>
                    {product.short_description && (
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {product.short_description}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        inquiryStore.add({
                          productId: product.id,
                          slug: product.slug,
                          name: product.name,
                          imageUrl: product.image_url,
                        })
                      }
                      className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-sm bg-steel py-2 text-xs font-bold uppercase tracking-wider text-steel-foreground hover:bg-safety hover:text-safety-foreground"
                    >
                      <Icon name="plus" className="h-3.5 w-3.5" /> Add to Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  useDocumentTitle("Page not found - Shree Annapoorneshwari Packaging");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-20 text-center">
        <div>
          <h1 className="text-7xl font-bold">404</h1>
          <p className="mt-3 text-muted-foreground">The page you are looking for does not exist.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-sm bg-safety px-5 py-3 text-sm font-bold uppercase tracking-wider text-safety-foreground"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function TabLink({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-sm border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
        active
          ? "border-safety bg-safety text-safety-foreground"
          : "border-border bg-card text-foreground hover:border-safety hover:text-safety"
      }`}
    >
      {children}
    </button>
  );
}

function Info({ title, children }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-widest text-safety">{title}</div>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function CustomerReviewsSection({ compact = false }) {
  return (
    <section className={compact ? "bg-secondary/30" : "bg-background"}>
      <div className={`container mx-auto px-4 ${compact ? "py-12" : "py-16"}`}>
        <div className="flex flex-col gap-3 border-b-2 border-steel pb-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-safety">
              Customer Reviews
            </div>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">
              Trusted by Local Businesses
            </h2>
          </div>
          <a
            href={storeDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-safety hover:underline"
          >
            View on Google Maps <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {storeReviews.map((review) => (
            <article key={review.name} className="rounded-sm border bg-card p-5">
              <div className="flex gap-1 text-safety" aria-label="5 star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon key={index} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{review.text}"</p>
              <div className="mt-4 border-t pt-3">
                <div className="text-sm font-bold">{review.name}</div>
                <div className="text-xs text-muted-foreground">{review.detail}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoreLocationSection({ compact = false }) {
  return (
    <section className={compact ? "bg-background" : "bg-secondary/30"}>
      <div className={`container mx-auto px-4 ${compact ? "py-12" : "py-16"}`}>
        <div className="grid gap-8 lg:grid-cols-[1fr,420px]">
          <div>
            <div className="border-b-2 border-steel pb-3">
              <div className="text-xs font-bold uppercase tracking-widest text-safety">
                Store Location
              </div>
              <h2 className="mt-1 text-2xl font-bold md:text-3xl">
                Visit Our Nelamangala Store
              </h2>
            </div>
            <div className="mt-6 overflow-hidden rounded-sm border bg-card">
              <iframe
                title="Shree Annapoorneshwari Packaging location map"
                src={storeMapEmbedUrl}
                className="h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <aside className="rounded-sm border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-sm bg-safety/15 p-2">
                <Icon name="mapPin" className="h-5 w-5 text-safety" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Pickup & Dispatch Point
                </div>
                <p className="mt-3 text-sm leading-relaxed">{storeAddress}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-3">
                <Icon name="package" className="h-5 w-5 text-safety" />
                Packaging materials available for bulk purchase
              </div>
              <div className="flex items-center gap-3">
                <Icon name="truck" className="h-5 w-5 text-safety" />
                Pickup and dispatch support for nearby industrial areas
              </div>
              <div className="flex items-center gap-3">
                <Icon name="clock" className="h-5 w-5 text-safety" />
                Mon - Sat, 9:00 AM - 7:00 PM IST
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={storeDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-safety px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-safety-foreground hover:opacity-90"
              >
                Directions <Icon name="arrowRight" className="h-4 w-4" />
              </a>
              <a
                href="tel:+919945662206"
                className="inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-bold uppercase tracking-wider hover:border-safety hover:text-safety"
              >
                <Icon name="phone" className="h-4 w-4" /> Call
              </a>
              <a
                href="https://wa.me/919945662206"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-bold uppercase tracking-wider hover:border-safety hover:text-safety"
              >
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, children }) {
  return (
    <div className="rounded-sm border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-sm bg-safety/15 p-2">
          <Icon name={icon} className="h-5 w-5 text-safety" />
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </div>
      </div>
      <div className="mt-4 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function ProductMediaGallery({ product, isSaved, onToggleSaved }) {
  const galleryCandidates = [
    product.image_url,
    ...(productGalleryImages[product.id] ?? []),
  ].filter(Boolean);
  const images = [...new Set(galleryCandidates)];
  const [activeIndex, setActiveIndex] = useState(0);
  const [shareNotice, setShareNotice] = useState("");
  const activeImage = images[activeIndex] ?? product.image_url;

  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  const shareProduct = async (event) => {
    event.currentTarget.blur();

    const shareUrl = `${siteUrl}/product/${product.slug}`;
    const shareData = {
      title: product.name,
      text: product.short_description || product.name,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareNotice("Product shared");
        window.setTimeout(() => setShareNotice(""), 1800);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }

    await navigator.clipboard?.writeText(shareUrl);
    setShareNotice("Product link copied");
    window.setTimeout(() => setShareNotice(""), 1800);
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-sm border bg-white">
        <button
          type="button"
          onClick={shareProduct}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/90 text-steel shadow-sm backdrop-blur transition hover:bg-safety hover:text-safety-foreground focus:outline-none focus:ring-0"
          aria-label={`Share ${product.name}`}
          title="Share"
        >
          <Icon name="share" className="h-4 w-4" />
        </button>
        <SaveButton
          isSaved={isSaved}
          onClick={onToggleSaved}
          className="absolute right-3 top-14 z-10"
          label={isSaved ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
        />
        {shareNotice && (
          <div className="absolute right-3 top-[100px] z-10 rounded-sm bg-steel px-2.5 py-1 text-[11px] font-semibold text-steel-foreground shadow">
            {shareNotice}
          </div>
        )}
        <ProductImage
          name={product.name}
          url={activeImage}
          className="aspect-square w-full object-contain p-8"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onPointerDown={(event) => event.preventDefault()}
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                setActiveIndex(index);
                event.currentTarget.blur();
                document.activeElement?.blur?.();
              }}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? "w-7 bg-safety" : "w-2.5 bg-muted-foreground/35"
              } cursor-pointer select-none outline-none caret-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0`}
              aria-label={`Show product image ${index + 1}`}
              tabIndex={-1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SaveButton({ isSaved, onClick, className = "", label = "Save item" }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.currentTarget.blur();
        onClick?.();
      }}
      className={`${className} inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/90 text-steel shadow-sm backdrop-blur transition hover:border-safety hover:bg-white hover:text-safety focus:outline-none focus:ring-0 ${
        isSaved ? "border-safety bg-white/95 text-safety" : ""
      }`}
      aria-label={label}
      title={isSaved ? "Saved" : "Save"}
    >
      <Icon name="bookmark" className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
    </button>
  );
}

function QuantityStepper({ value, onChange, size = "md" }) {
  const quantity = Math.max(1, Number.parseInt(value || 1, 10) || 1);
  const isSmall = size === "sm";
  const buttonClass = isSmall ? "h-8 w-8" : "h-11 w-11";
  const inputClass = isSmall ? "h-8 w-12 text-sm" : "h-11 w-14 text-base";

  const updateQuantity = (nextValue) => {
    onChange(Math.max(1, Number.parseInt(nextValue || 1, 10) || 1));
  };

  return (
    <div className="inline-flex items-center overflow-hidden rounded-sm border bg-card">
      <button
        type="button"
        onClick={() => updateQuantity(quantity - 1)}
        className={`${buttonClass} inline-flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground`}
        aria-label="Decrease quantity"
      >
        <Icon name="minus" className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(event) => updateQuantity(event.target.value)}
        className={`${inputClass} border-x bg-background text-center font-semibold outline-none focus:bg-card`}
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={() => updateQuantity(quantity + 1)}
        className={`${buttonClass} inline-flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground`}
        aria-label="Increase quantity"
      >
        <Icon name="plus" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-sm border px-3 py-2 text-sm outline-none focus:border-safety"
      />
    </div>
  );
}
