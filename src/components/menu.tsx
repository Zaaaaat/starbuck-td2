"use client";

import {FC, memo, Fragment, useEffect} from "react";
import {Popover, Transition} from "@headlessui/react";
import {MenuBar, Button} from "tp-kit/components";
import {ShoppingBag, X} from "@phosphor-icons/react";
import {ProductCartLine} from "tp-kit/components/products";
import {useStore} from "../hooks/use-cart";
import {removeLine, computeCartTotal, updateLine} from "../hooks/use-cart";
import {useState} from "react";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import Cart from "./Cart";
import {CartCounter} from "./CartCounter";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

type Props = {};

const Menu: FC<Props> = memo(function () {
    console.log("rendu page");

    return (
        <MenuBar
            trailing={
                <Popover as="div" className="flex justify-end">
                    {({open}) => (
                        <>
                            <Popover.Button as={Button} variant={"ghost"}
                                            className={"!rounded-full !p-0 flex justify-center items-center aspect-square relative text-3xl"}>
                                {open
                                    ? <X size={18} weight="regular"/>
                                    : <ShoppingBag size={24} weight="regular"/>}

                                <CartCounter/>
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel
                                    className="absolute left-0 sm:left-auto right-0 top-full z-10 mt-6 sm:w-full sm:max-w-sm">
                                    <Cart/>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            }
        />
    );
});

Menu.displayName = "Menu";
export {Menu};
