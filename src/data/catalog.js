export const categories = [
  {
    id: "adhesive-tapes",
    slug: "adhesive-tapes",
    name: "Adhesive Tapes",
    description: "BOPP, printed, masking and specialty tapes for cartons and industrial packing.",
  },
  {
    id: "packaging-films",
    slug: "packaging-films",
    name: "Packaging Films",
    description: "Stretch, shrink and protective films for palletizing and product protection.",
  },
  {
    id: "corrugated",
    slug: "corrugated",
    name: "Corrugated Boxes",
    description: "3-ply, 5-ply and custom-size boxes for shipping and storage.",
  },
  {
    id: "strapping",
    slug: "strapping",
    name: "Strapping",
    description: "PP, PET and steel strapping for cartons, bundles and pallets.",
  },
  {
    id: "bubble-wrap",
    slug: "bubble-wrap",
    name: "Bubble Wrap",
    description: "Cushioning rolls, sheets and protective wrap for fragile goods.",
  },
  {
    id: "pp-woven-bags",
    slug: "pp-woven-bags",
    name: "PP Woven Bags",
    description: "Durable woven bags and sacks for bulk packing and dispatch.",
  },
  {
    id: "packing-accessories",
    slug: "packing-accessories",
    name: "Packing Accessories",
    description: "Fasteners, edge protectors, dispensers and daily packing consumables.",
  },
];

export const products = [
  {
    id: "bopp-brown-tape",
    slug: "bopp-brown-tape",
    name: "BOPP Brown Packing Tape",
    category_id: "adhesive-tapes",
    short_description: "High-tack carton sealing tape for shipping and storage.",
    description:
      "A reliable brown BOPP adhesive tape for carton sealing, warehouse packing and daily dispatch work.",
    applications: ["Carton sealing", "Warehouse dispatch", "E-commerce packing", "Export packaging"],
    specs: {
      Material: "BOPP film",
      Color: "Brown",
      Width: "48 mm, 72 mm",
      Length: "65 m, 100 m, 130 m",
    },
    image_url: "https://5.imimg.com/data5/SELLER/Default/2023/10/350565340/HE/MH/FA/2300161/bopp-brown-tape-500x500.jpg",
    featured: true,
  },
  {
    id: "bopp-transparent-tape",
    slug: "bopp-transparent-tape",
    name: "BOPP Transparent Tape",
    category_id: "adhesive-tapes",
    short_description: "Clear tape for neat carton sealing and display-friendly packing.",
    description:
      "Clear BOPP tape with consistent adhesion for cartons where the label or printed surface must remain visible.",
    applications: ["Retail cartons", "Label-safe packing", "General dispatch"],
    specs: {
      Material: "BOPP film",
      Color: "Transparent",
      Width: "48 mm, 72 mm",
      Length: "65 m, 100 m",
    },
    image_url: "https://asanintl.com/wp-content/uploads/2025/11/bopp-Clear-Tape.jpg",
    featured: true,
  },
  {
    id: "printed-bopp-tape",
    slug: "printed-bopp-tape",
    name: "Printed BOPP Tape",
    category_id: "adhesive-tapes",
    short_description: "Custom printed tape for branding, sealing and tamper visibility.",
    description:
      "Printed packing tape for companies that want cartons to carry brand details, handling instructions or safety warnings.",
    applications: ["Branding", "Tamper visibility", "Export cartons"],
    specs: {
      Print: "Single or multi-color",
      Width: "48 mm, 72 mm",
      MOQ: "Bulk orders",
    },
    image_url: "https://www.custom-printed-tape.com/wp-content/uploads/2021/06/Factory-Bopp-Tape-1-768x768.jpg",
    featured: true,
  },
  {
    id: "masking-tape",
    slug: "masking-tape",
    name: "Masking Tape",
    category_id: "adhesive-tapes",
    short_description: "Paper masking tape for marking, painting and temporary holding.",
    description:
      "Easy-tear paper masking tape suited for paint masking, surface marking and temporary industrial use.",
    applications: ["Paint masking", "Temporary labeling", "Light holding"],
    specs: {
      Material: "Crepe paper",
      Width: "12 mm to 72 mm",
      Adhesive: "Rubber based",
    },
    image_url: "https://www.itape.com/wp-content/uploads/pt14-blu-48mmx54.8m-shadow.jpg",
    featured: false,
  },
  {
    id: "stretch-film-roll",
    slug: "stretch-film-roll",
    name: "Stretch Film Roll",
    category_id: "packaging-films",
    short_description: "Machine and hand-grade stretch film for pallet wrapping.",
    description:
      "Flexible stretch film for securing cartons and goods on pallets during warehouse movement and transport.",
    applications: ["Pallet wrapping", "Load stabilization", "Moisture protection"],
    specs: {
      Grade: "Hand and machine",
      Width: "500 mm",
      Micron: "23, 25, 30",
    },
    image_url: "https://5.imimg.com/data5/SELLER/Default/2020/12/QV/YS/VY/101355692/lldpe-stretch-film-500x500.jpeg",
    featured: true,
  },
  {
    id: "shrink-film",
    slug: "shrink-film",
    name: "Shrink Film",
    category_id: "packaging-films",
    short_description: "Shrink wrapping film for bundled retail and industrial packs.",
    description:
      "Shrink film used for bundling products, adding protection and creating tight, clean outer packs.",
    applications: ["Bundle packing", "Retail multipacks", "Dust protection"],
    specs: {
      Material: "LDPE/POF options",
      Width: "Custom widths",
      Supply: "Roll form",
    },
    image_url:"https://reapp.com.gh/wp-content/uploads/2023/11/1690727226-picsay.jpg",
    featured: true,
  },
  {
    id: "surface-protection-film",
    slug: "surface-protection-film",
    name: "Surface Protection Film",
    category_id: "packaging-films",
    short_description: "Temporary protection for metal, glass and finished surfaces.",
    description:
      "Protective film for keeping polished, painted or finished surfaces safe during handling and installation.",
    applications: ["Metal sheets", "Glass panels", "Furniture surfaces"],
    specs: {
      Adhesion: "Low to medium tack",
      Color: "Transparent, milky, blue",
      Supply: "Rolls",
    },
    image_url: "https://rohitpolymer.com/wp-content/uploads/2024/01/SURFACE-PROTECTION-TAPE-MANUFACTURED-BY-ROHIT-POLYMER-industrieS.png",
    featured: false,
  },
  {
    id: "corrugated-boxes",
    slug: "corrugated-boxes",
    name: "Corrugated Boxes",
    category_id: "corrugated",
    short_description: "Shipping boxes in standard and custom sizes.",
    description:
      "Corrugated cartons for packing finished goods, spare parts, e-commerce shipments and export consignments.",
    applications: ["Shipping", "Storage", "Export packing", "E-commerce cartons"],
    specs: {
      Ply: "3-ply, 5-ply, 7-ply",
      Sizes: "Standard and custom",
      Print: "Plain or printed",
    },
    image_url: "https://www.packagingcorp.com/wp-content/uploads/2022/08/Assortment-of-Shipping-Containers.jpg",
    featured: true,
  },
  {
    id: "heavy-duty-cartons",
    slug: "heavy-duty-cartons",
    name: "Heavy Duty Cartons",
    category_id: "corrugated",
    short_description: "Stronger cartons for industrial loads and long-distance shipping.",
    description:
      "Heavy-duty boxes made for weight-bearing packages that need better stacking strength and transit safety.",
    applications: ["Industrial goods", "Bulk shipments", "Stacked storage"],
    specs: {
      Ply: "5-ply and 7-ply",
      Board: "High BF options",
      Sizes: "Made to order",
    },
    image_url: "https://www.ubeeco.com.au/wp-content/uploads/2019/07/Products_cardboard_cartons_large_heavy_duty_cartons.jpg",
    featured: false,
  },
  {
    id: "pp-strapping-roll",
    slug: "pp-strapping-roll",
    name: "PP Strapping Roll",
    category_id: "strapping",
    short_description: "Polypropylene straps for carton and bundle securing.",
    description:
      "Cost-effective PP strapping rolls for general carton strapping, bundle holding and dispatch use.",
    applications: ["Carton strapping", "Bundle packing", "Warehouse dispatch"],
    specs: {
      Material: "Polypropylene",
      Width: "9 mm, 12 mm, 15 mm",
      Color: "White, yellow, blue",
    },
    image_url: "https://5.imimg.com/data5/PQ/PL/MY-13114578/polypropylene-strapping-roll-500x500.jpg",
    featured: true,
  },
  {
    id: "pet-strap-roll",
    slug: "pet-strap-roll",
    name: "PET Strap Roll",
    category_id: "strapping",
    short_description: "Strong polyester strap for palletized and heavier loads.",
    description:
      "PET strapping for higher-tension applications where load retention and strength are important.",
    applications: ["Pallet loads", "Brick and tile packing", "Heavy cartons"],
    specs: {
      Material: "Polyester",
      Width: "12 mm, 16 mm, 19 mm",
      Strength: "High tensile",
    },
    image_url: "https://5.imimg.com/data5/BJ/NR/MY-368198/pet-strapping-roll-500x500.jpg",
    featured: true,
  },
  {
    id: "bubble-wrap-roll",
    slug: "bubble-wrap-roll",
    name: "Bubble Wrap Roll",
    category_id: "bubble-wrap",
    short_description: "Cushioning wrap for fragile goods and surface protection.",
    description:
      "Bubble wrap rolls for protecting glassware, electronics, furniture, components and fragile products in transit.",
    applications: ["Fragile goods", "Furniture protection", "Electronics packing"],
    specs: {
      Bubble: "Small and large bubble",
      Width: "1 m, 1.5 m",
      Supply: "Rolls",
    },
    image_url: "https://i0.wp.com/wisycart.com/wp-content/uploads/2023/01/PMBW-1-jpg.webp?fit=1000%2C1000&ssl=1",
    featured: true,
  },
  {
    id: "foam-sheet-roll",
    slug: "foam-sheet-roll",
    name: "Foam Sheet Roll",
    category_id: "bubble-wrap",
    short_description: "Soft foam cushioning for scratches and surface protection.",
    description:
      "Foam sheet rolls for wrapping polished, painted and delicate surfaces before boxing or dispatch.",
    applications: ["Scratch prevention", "Appliance packing", "Furniture packing"],
    specs: {
      Thickness: "1 mm to 10 mm",
      Width: "Custom options",
      Supply: "Rolls and sheets",
    },
    image_url: "https://images.jdmagicbox.com/quickquotes/images_main/nallapackaging-epe-foam-sheet-roll-372341713-o7btn.png",
    featured: false,
  },
  {
    id: "pp-woven-bags",
    slug: "pp-woven-bags",
    name: "PP Woven Bags",
    category_id: "pp-woven-bags",
    short_description: "Durable sacks for bulk packing and material handling.",
    description:
      "PP woven bags for packing industrial goods, powders, components, agri products and bulk materials.",
    applications: ["Bulk packing", "Material handling", "Agri and industrial goods"],
    specs: {
      Material: "PP woven fabric",
      Sizes: "Custom sizes",
      Print: "Plain or printed",
    },
    image_url: "https://satyendragroup.com/wp-content/uploads/2024/08/blog1.jpg",
    featured: false,
  },
  {
    id: "edge-protectors",
    slug: "edge-protectors",
    name: "Edge Protectors",
    category_id: "packing-accessories",
    short_description: "Corner and edge protection for strapped loads.",
    description:
      "Edge protectors help distribute strap pressure and prevent damage to carton corners or finished products.",
    applications: ["Strapped pallets", "Carton edge safety", "Export packaging"],
    specs: {
      Material: "Paperboard and plastic options",
      Length: "Custom lengths",
      Use: "Corner and edge protection",
    },
    image_url: "https://5.imimg.com/data5/IB/VS/MY-1110421/edge-protectors-500x500.jpg",
    featured: false,
  },
];

export function getCatalog() {
  return { categories, products };
}

export function getProduct(slug) {
  const product = products.find((item) => item.slug === slug);
  if (!product) return { product: null, related: [] };

  const category = categories.find((item) => item.id === product.category_id);
  const related = products
    .filter((item) => item.category_id === product.category_id && item.id !== product.id)
    .slice(0, 4);

  return {
    product: {
      ...product,
      category,
    },
    related,
  };
}
