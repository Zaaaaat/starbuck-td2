import {create} from 'zustand'
import {ProductLineData} from "../types";
import {ProductData} from "tp-kit/types";

interface CartData {
    lines: ProductLineData[]
}

const useCartDataStore = create<CartData>((set) => ({
    lines: []
}))

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 *
 * @param product
 */

export function addLine(product: ProductData) {
    useCartDataStore((state) => {
        const existingLineIndex = state.lines.findIndex(
            (line) => line.product.id === product.id
        );

        if (existingLineIndex !== -1) {
            state.lines[existingLineIndex].qty += 1;
        } else {
            state.lines.push({product, qty:1});
        }
    });
}

/**
 * Modifie une ligne produit du panier
 *
 * @param line
 */

export function updateLine(line: ProductLineData) {
    useCartDataStore((state) => {
        const existingLineIndex = state.lines.findIndex(
            (existingLine) => existingLine.product.id === line.product.id
        );

        if (existingLineIndex !== -1) {
            state.lines[existingLineIndex] = { ...state.lines[existingLineIndex], ...line };
        } else {
            state.lines.push(line);
        }
    });
}

/**
 * Supprime la ligne produit du panier
 *
 * @param productId
 * @returns
 */
export function removeLine(productId: number) {
    useCartDataStore((state) => {
        const existingLineIndex = state.lines.findIndex(
            (line) => line.product.id === productId
        );

        if (existingLineIndex !== -1 && existingLineIndex > 1) {
            state.lines[existingLineIndex].qty -= 1;
        } else {
            state.lines.splice(existingLineIndex);
        }
    });
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useCartDataStore((state) => {
        state.lines.splice(0);
    });
}

/**
 * Calcule le total d'une ligne du panier
 */

export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty;
}

/**
 * Calcule le total du panie r
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    let total = 0;

    for (const line of lines) {
        total += computeLineSubTotal(line);
    }

    return total;
}