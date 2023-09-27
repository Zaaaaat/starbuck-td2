import { create } from 'zustand'
import {CartData, ProductLineData} from "../types";
import {ProductData} from "tp-kit/types";

export const useCartDataStore = create<CartData>()((set) => ({
    lines: [],
    count: 0,
}))

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 *
 * @param product
 */
export function addLine(product: ProductData) {
    useCartDataStore.setState((state: CartData) => {
        const line = state.lines.find((l) => l.product.id === product.id)
        if (line) {
            line.qty++
            return {
                lines: state.lines.map((l) => {
                    if (l.product.id === product.id) {
                        return line
                    }
                    return l
                }),
            }
        }
        return {
            lines: [...state.lines, { product, qty: 1 }],
            count: state.lines.length +1
        }
    });
}

/**
 * Modifie une ligne produit du panier
 *
 * @param line
 */
export function updateLine(line: ProductLineData) {
    useCartDataStore.setState((state: CartData) => {
        return {
            lines: state.lines.map((l) => {
                if (l.product.id === line.product.id) {
                    return line
                }
                return l
            }),
        }
    })
}

/**
 * Supprime la ligne produit du panier
 *
 * @param productId
 * @returns
 */
export function removeLine(productId: number) {
    useCartDataStore.setState((state: CartData) => {
        return {
            lines: state.lines.filter((l) => l.product.id !== productId),
            count: state.lines.length
        }
    })
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useCartDataStore.setState({ lines: [], count:0 })

}


/**
 * Calcule le total d'une ligne du panier
 */

export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty;
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    let total = 0;

    for (const line of lines) {
        total += computeLineSubTotal(line);
    }

    return total;
}