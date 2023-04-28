import React, {useEffect, useState} from "react";

import { AddToCart } from "../AddToCart";
import {ProductQueryResult, useClient} from "~/utils/graphql";
import {Modal} from "~/components/Modal";

interface IItemDetailsProps {
    handle: string;
    productId: string;
    viewDetails: boolean;
    setViewDetails: (state: boolean) => void;
}

export const ItemDetails = (props: IItemDetailsProps) => {
    const { handle, viewDetails, setViewDetails, productId } = props;

    const client = useClient()
    const [details, setDetails] = useState<ProductQueryResult>()
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        setFetching(true)
        client.fetchProductByHandle(handle)
            .then(p => setDetails(p))
            .finally(() => setFetching(false))
    }, [])

    return (
        <div className="items-center justify-center flex">
            <Modal
                open={viewDetails}
                onClose={() => setViewDetails(false)}
            >
                <section className="relative w-full h-full mx-auto max-w-2xl flex justify-center items-center">
                    <div className="relative bg-theme-color-500 rounded-2xl drop-shadow-xl border-l-8 border-8 border-custom-gray-600">
                    { !fetching && details !== undefined ?
                      <>
                        <div>
                            <div className="flex items-start justify-between p-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {details.productByHandle.title}
                                </h3>
                                <button type="button" onClick={() => setViewDetails(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <span dangerouslySetInnerHTML={{__html: details.productByHandle.description}}/>
                            </div>
                        </div>
                        <div>
                        {details.recommendedProducts.map((item) => {
                        return (
                            <>
                                <div className="h-3" />
                                <div className="p-5 rounded-2xl bg-card-background-500 border border-custom-purple-500 flex flex-row">
                                    <img
                                        className="object-contain h-5 w-5"
                                        src={item.image}
                                        alt={item.title}
                                    />
                                    <h2 className="pl-3 font-bold">{item.title}</h2>
                                    <h2 className="pl-3 font-bold">{item.price.listPrice}</h2>
                                    <button className="button-hover text-custom-gray-100 button-background focus:outline-none focus:ring-4 font-black rounded-full text-sm px-3 py-1.5 text-center mr-2 mb-2">Go To</button>
                                </div>
                            </>
                        )
                    })}
                        </div>
                        <div className="flex items-center p-6">
                            <AddToCart
                                productId={productId}
                                quantity={1}
                                card={false}
                            />
                        </div>
                        </>
                        : <div>Loading...</div>}
                    </div>
                </section>
            </Modal>
        </div>
    )
}
