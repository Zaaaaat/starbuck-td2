"use client"
import React, {useEffect, useState} from 'react';
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, SectionContainer} from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products";
import {FormattedPrice} from "tp-kit/components/data-display";

export default function DevCartPage() {
    const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        let total = 0;
        products.forEach((product) => {
            total += product.price;
        });
        return total;
    };

    useEffect(() => {
        const total = calculateTotalPrice();
        setTotalPrice(total);
    }, [products]);

    return (
        <SectionContainer
            className="py-36"
            wrapperClassName="flex flex-col lg:flex-row gap-24"
        >

            {/* Panier */}
            <section className="w-full lg:w-1/3 space-y-8">
                {products.map((product) => (
                    <ProductCartLine
                        product={product}
                        qty={1}
                        key={product.id}
                    ></ProductCartLine>
                ))}

                <FormattedPrice price={totalPrice}></FormattedPrice>
                <Button fullWidth> Valider le panier </Button>
                <Button variant={"outline"} fullWidth>Vider le panier</Button>
            </section>
            {/* /Panier */}
        </SectionContainer>
    );
}
