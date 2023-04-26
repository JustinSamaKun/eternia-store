import {Cart, Search, Slider} from "~/components";
import React from "react";
import {useLoaderData} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IProduct, useClient} from "~/utils/graphql";
import useShop from "~/hooks/useShop";
import {Link} from "react-router-dom";
import {cli} from "@remix-run/dev";
import {ItemCard} from "~/components/ItemCard";
import {getCartId} from "~/utils/requests.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const client = useClient(request)
    const cartId = getCartId(request)

    const [featured, top, favorites] = await Promise.all([
        client.fetchProductsByTag('slideshow'),
        client.fetchPopularItems(5),
        cartId ? client.fetchPopularItems(5, undefined, cartId) : []
    ])

    return { featured, top, favorites }
}

export default function homepage() {
    const {featured, top, favorites} = useLoaderData()
    const shop = useShop()

    return (
        <>
            <Slider featured={featured}/>
            <div className={"flex flex-col gap-2"}>
                <h2 className={"text-customn-white-200 font-bold text-xl"}>Shop By Category</h2>
                <div className={"flex flex-row justify-between items-center"}>
                    {shop.categories
                        .flatMap(c => c.subcategories.length > 0 ? c.subcategories : [c])
                        .slice(0, 3)
                        .map(c => (
                            <div className={"flex flex-col flex-1 justify-between"}>
                                <h3>{c.title}</h3>
                                <Link className={"rounded-md border-gray-500"} to={`/category/${c.id}`}>
                                    Visit
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            {favorites.length > 0 &&
                <div className={"flex flex-col gap-2"}>
                    <h2 className={"text-customn-white-200 font-bold text-xl"}>Your Favorites</h2>
                    <div className={"flex flex-row overflow-x-auto gap-4 items-center"}>
                        {favorites.map((p: IProduct) => <ItemCard product={p}/>)}
                    </div>
                </div>
            }
            <div className={"flex flex-col gap-2"}>
                <h2 className={"text-customn-white-200 font-bold text-xl"}>Most Popular</h2>
                <div className={"flex flex-row overflow-x-auto gap-4 items-center"}>
                    {top.map((p: IProduct) => <ItemCard product={p}/>)}
                </div>
            </div>
        </>
    )
}
