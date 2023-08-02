import { useState } from "react";
import {AddToCart} from "~/components/AddToCart";
import {IProduct} from "~/graphql/shop";

function ruleOf100(price: IProduct['price']) {
    let digits = price.price.includes('.') ? price.price.length - (price.price.indexOf('.') + 1) : 0
    let actual = parseFloat(price.price.replace(/[.,]/g, ''))
    let list = parseFloat(price.listPrice.replace(/[,.]/g, ''))
    let diff = (list - actual)
    let perc = (diff / list) * 100
    diff /= Math.pow(10, digits)
    if (Math.abs(Math.floor(perc) - perc) < 0.1) perc = Math.floor(perc)
    if (perc >= diff) return `${perc.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`
    else return `$${diff}`
}

export const ItemCard = ({ product }: { product: IProduct }) => {
    const { id, title, price, image, handle } = product;
    const [viewDetails, setViewDetails] = useState<boolean>(false);

    return (
        <div className="flex flex-col h-[24rem] w-[16rem] p-3 relative bg-black bg-opacity-20 hover:bg-opacity-5 rounded-2xl border border-[#2b2b2b]">
            <a onClick={() => setViewDetails(true)} className="absolute right-0 top-0 p-4 text-custom-gray-200 cursor-pointer font-black hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6559FE" className="w-6 h-6">
                    <path fill-rule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clip-rule="evenodd"/>
                </svg>
            </a>
            {price.listPrice !== price.price && <div className={"absolute top-0 left-0 px-4 py-1 button-background rounded-tl-xl rounded-br-sm"}>{ruleOf100(price)} Off</div>}
            <div className={"bg-white bg-opacity-5 p-4 rounded-2xl aspect-square w-full"}>
                <img
                    className="object-contain max-w-full my-auto"
                    src={image ?? "https://cdn.agoramp.com/static/209/assets/blank_product.png"}
                    alt={title}
                />
            </div>
            <div className={"flex flex-col gap-2 mt-auto p-4"}>
                <div className={"flex flex-row justify-between gap-2 items-center text-stone-200"}>
                    <h3 className="opacity-90 w-100 text-sm">{title}</h3>
                    <div className="text-lg font-bold mt-auto flex flex-col items-end">
                        {(price.price === '0.00') ? "Free" : `$${price.price}`}
                        {price.listPrice !== price.price && <div className={"line-through text-sm"}>${price.listPrice}</div>}
                    </div>
                </div>
                <AddToCart
                    card={true}
                    productId={id}
                    quantity={1}
                />
            </div>
        </div>
    )
}
