"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, ProductCardLayout, SectionContainer} from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products";
import Cart from "../../components/Cart";
import {addLine, clearCart} from "../../hooks/use-cart";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
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
                <Cart/>
            </section>
            {/* /Panier */}
        </SectionContainer>
    );
}