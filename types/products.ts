export type Product = {
  id: string;
  name: string;
  formula?: string;
  category: string;
  price: number;        // KES
  unit: string;         // e.g. "1 Litre", "500 g"
  packSize: string;
  stock: "In Stock" | "Low Stock" | "Out of Stock";
  grade: string;        // e.g. "Analytical Reagent"
  cas?: string;
  hazard: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;        // placeholder path
  featured?: boolean;
};