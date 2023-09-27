import {useCartDataStore} from "../hooks/use-cart";

export function CartCounter() {
    const count = useCartDataStore((state) => state.lines);
    console.log("rendu counter")

    return (

        <div
            className="aspect-square bg-brand text-white text-center text-xs absolute right-0 top-0 rounded-full flex items-center justify-center h-[20px] w-[20px]">
            <div>{count}</div>
        </div>
    )
}