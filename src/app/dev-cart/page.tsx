"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, ProductCardLayout, SectionContainer} from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products";
import {addLine, clearCart, computeCartTotal, removeLine, updateLine, useCartDataStore} from "../../hooks/use-cart";
import {useEffect, useState} from "react";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);
console.log("rendu page");

export default function DevCartPage() {
    const lines = useCartDataStore((state) => state.lines);
    const [total, setTotal] = useState(computeCartTotal(lines));

    useEffect(() => {
        setTotal(computeCartTotal(lines));
    }, [lines]);

    return (
        <SectionContainer
            className="py-36"
            wrapperClassName="flex flex-col lg:flex-row gap-24"
        >
            {/* Produits */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                {products.map((product) => (
                    <ProductCardLayout
                        key={product.id}
                        product={product}
                        button={
                            <Button
                                variant={"ghost"}
                                fullWidth
                                onClick={() => addLine(product)}
                            >
                                Ajouter au panier
                            </Button>
                        }
                    />
                ))}
            </section>
            {/* /Produits */}

            {/* Panier */}
            <section className="w-full lg:w-1/3 space-y-8">
                <div>
                    <p
                        className="text-2xl mb-4"
                    >
                        MON PANIER
                    </p>
                    {
                        lines.map((line) => (
                            <ProductCartLine
                                className={"mb-4"}
                                key={line.product.id}
                                product={line.product}
                                qty={line.qty}
                                onDelete={() => {
                                    removeLine(line.product.id);
                                }}
                                onQtyChange={(qty) => {
                                    if (qty === 0) {
                                        removeLine(line.product.id);
                                    } else {
                                        updateLine({product: line.product, qty: qty});
                                    }
                                }}
                            />
                        ))
                    }
                    <div
                        className="flex justify-between items-center mt-4"
                    >
                        <p>Total</p>
                        <p>{total.toFixed(2).toString().replace('.', ',') + " €"}</p>
                    </div>
                </div>

                    <Button fullWidth>Commander</Button>

                {lines.length > 0 && (
                    <Button
                        variant={"outline"}
                        fullWidth
                        onClick={() => clearCart()}
                    >
                        Vider le panier
                    </Button>
                )}

            </section>
            {/* /Panier */}

        </SectionContainer>

    );
}