import { JSX, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PricingSection from "@/components/landing/pricing/PricingSection";
import getProducts from "@/pages/api/lsqyProducts";

export default function PricingPage(): JSX.Element {
  const [products, setProducts] = useState<[]>([]);

  useEffect(() => {
    getProducts().then((products) => setProducts(products.data));
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-base-100 to-base-200/70">
      <PricingSection products={products} />
    </section>
  );
}
