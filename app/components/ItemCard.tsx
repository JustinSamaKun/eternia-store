import { useState } from "react";
import {IProduct} from "~/utils/graphql";
import {AddToCart} from "~/components/AddToCart";
import {ItemDetails} from "~/components/ItemDetails";

export const ItemCard = ({ product }: { product: IProduct }) => {
    const { id, title, price, image, handle } = product;
    const [viewDetails, setViewDetails] = useState<boolean>(false);

    return (
        <div className="flex flex-col h-[24rem] w-[16rem] p-8 relative bg-card-background-500 rounded-2xl border-4 border-custom-purple-600">
            <div className="absolute text-sm left-0 top-0 -ml-1 -mt-1 py-2 px-4 bg-custom-purple-600 rounded-br-2xl rounded-tl-2xl text-custom-gray-100 text-opacity-90 font-black">
                {(price.price === '0.00') ? "Free" : `$${price.price}`}
            </div>
            <a onClick={() => setViewDetails(true)} className="absolute right-0 top-0 p-2 rounded-lg text-custom-gray-200 cursor-pointer font-black hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>
            </a>
            <img
                className="object-contain max-w-full my-auto"
                src={image}
                alt={title}
            />
            <div className={"flex flex-col gap-2 mt-auto"}>
                <h3 className="font-black opacity-70 text-custom-gray-100 w-100 text-md text-center">{title}</h3>
                <AddToCart
                    card={true}
                    productId={id}
                    quantity={1}
                />
            </div>
        </div>
    )
}
