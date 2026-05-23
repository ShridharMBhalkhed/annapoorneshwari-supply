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

function createSearchParams(search) {
  return new URLSearchParams(search);
}

function createWhatsAppInquiryMessage(inquiry) {
  const customerLines = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    inquiry.phone ? `Phone: ${inquiry.phone}` : null,
    inquiry.company ? `Company: ${inquiry.company}` : null,
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

  if (pathname === "/") return <HomePage />;
  if (pathname === "/catalog") return <CatalogPage searchParams={searchParams} />;
  if (pathname === "/about") return <AboutPage />;
  if (pathname === "/contact") return <ContactPage />;
  if (pathname === "/inquiry") return <InquiryPage />;
  if (pathname.startsWith("/product/")) {
    const slug = decodeURIComponent(pathname.replace("/product/", ""));
    return <ProductPage slug={slug} />;
  }

  return <NotFoundPage />;
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

  useDocumentTitle(
    product
      ? `${product.name} - Shree Annapoorneshwari Packaging`
      : "Product - Shree Annapoorneshwari Packaging",
  );

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
            <div className="overflow-hidden rounded-sm border bg-white">
              <ProductImage
                name={product.name}
                url={product.image_url}
                className="aspect-square w-full object-contain p-8"
              />
            </div>
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
              <button
                type="button"
                onClick={() => {
                  inquiryStore.add({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    imageUrl: product.image_url,
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
                  <Link to={`/product/${item.slug}`} className="block">
                    <ProductImage
                      name={item.name}
                      url={item.image_url}
                      className="aspect-square w-full bg-white object-contain p-4"
                    />
                  </Link>
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
            No 754A/01, SLV Layout, Railway Station Road, Basavanahalli, Nelamangala,
            Bangalore Rural - 562123, Karnataka, India
          </ContactCard>
          <ContactCard icon="clock" title="Business Hours">
            Mon - Sat - 9:00 AM - 7:00 PM IST
            <br />
            Sunday closed
          </ContactCard>
        </div>

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

function InquiryPage() {
  useDocumentTitle("Request a Quote - Shree Annapoorneshwari Packaging");
  const cart = useInquiryCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (cart.length === 0 || !form.name || !form.email) return;

    setIsSending(true);
    const inquiry = {
      ...form,
      items: cart,
      createdAt: new Date().toISOString(),
    };

    const saved = JSON.parse(window.localStorage.getItem("sa_inquiries_v1") || "[]");
    window.localStorage.setItem("sa_inquiries_v1", JSON.stringify([inquiry, ...saved]));
    window.open(
      `https://wa.me/919945662206?text=${encodeURIComponent(createWhatsAppInquiryMessage(inquiry))}`,
      "_blank",
      "noopener,noreferrer",
    );

    window.setTimeout(() => {
      setSubmitted(true);
      setIsSending(false);
      inquiryStore.clear();
    }, 350);
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
                          <label className="text-xs text-muted-foreground">Qty</label>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(event) =>
                              inquiryStore.setQuantity(item.productId, event.target.value)
                            }
                            className="w-24 rounded-sm border px-2 py-1 text-sm"
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
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => setForm({ ...form, phone: value })}
                />
                <Field
                  label="Company"
                  value={form.company}
                  onChange={(value) => setForm({ ...form, company: value })}
                />
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Message
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
                disabled={isSending || cart.length === 0 || !form.name || !form.email}
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
