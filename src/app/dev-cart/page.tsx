"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products";
import {FormattedPrice} from "tp-kit/components/data-display";
import {addLine} from "../../hooks/use-cart";
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
                        button={<Button variant={"ghost"} onClick={() => addLine(product)} fullWidth>Ajouter au panier</Button>}
                    />
                ))}
            </section>
            {/* /Produits */}

            {/* Panier */}
            <section className="w-full lg:w-1/3 space-y-8">
                {products.map((product) => (
                    <ProductCartLine product={product} qty={1}></ProductCartLine>
                ))}

                Total: <FormattedPrice price={products.reduce((total, currentValue) => total = total + currentValue.price,0)}/>
                <Button fullWidth>Commander</Button>
                <Button variant={"outline"} fullWidth>Vider le panier</Button>
            </section>
            {/* /Panier */}
        </SectionContainer>
    );
}