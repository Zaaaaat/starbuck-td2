import {Button, ProductCartLine} from "tp-kit/components";
import {clearCart, computeCartTotal, removeLine, updateLine, useStore} from "../hooks/use-cart";
import {useEffect, useState} from "react";

export default function Cart() {
    const lines = useStore((state) => state.lines);
    const [total, setTotal] = useState(computeCartTotal(lines));

    useEffect(() => {
        setTotal(computeCartTotal(lines));
    }, [lines]);

    return (
        <div
            className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-8 flex justify-between flex-col"
        >
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
            <Button
                className="mt-8"
                fullWidth
                variant={"primary"}
            >
                Commander
            </Button>
            <Button
                className="mt-2"
                fullWidth
                variant={"outline"}
                onClick={() => {
                    clearCart();
                }}
            >
                Vider le panier
            </Button>
        </div>
    )
}