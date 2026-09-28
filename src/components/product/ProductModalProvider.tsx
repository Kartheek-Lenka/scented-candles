"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Product } from "@/data/products";

type ProductModalContextValue = {
  activeProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
};

const ProductModalContext = createContext<ProductModalContextValue | null>(null);

export function ProductModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const openProduct = useCallback((product: Product) => {
    setActiveProduct(product);
  }, []);

  const closeProduct = useCallback(() => {
    setActiveProduct(null);
  }, []);

  const value = useMemo(
    () => ({ activeProduct, openProduct, closeProduct }),
    [activeProduct, openProduct, closeProduct],
  );

  return (
    <ProductModalContext.Provider value={value}>
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModal(): ProductModalContextValue {
  const ctx = useContext(ProductModalContext);
  if (!ctx) {
    throw new Error("useProductModal must be used within ProductModalProvider");
  }
  return ctx;
}
