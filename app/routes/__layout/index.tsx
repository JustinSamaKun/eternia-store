import {Slider} from "~/components";
import React, {useContext, useEffect, useRef} from "react";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {useClient} from "~/utils/graphql";
import useShop from "~/hooks/useShop";
import {Link} from "react-router-dom";
import {ItemCard} from "~/components/ItemCard";
import {getCartId} from "~/utils/requests.server";
import {CartContext} from "~/context/CartContext";
import {IProduct, POPULAR_ITEMS, ProductInfo} from "~/graphql/shop";
import {FragmentType, useFragment} from "~/graphql/generated";

export async function loader({ request }: LoaderFunctionArgs) {
    const client = useClient(request)
    const cartId = getCartId(request)

    const [top, favorites] = await Promise.all([
        client
            .query(POPULAR_ITEMS, { amount: 5 })
            .then(r => r.topProducts.map(p => useFragment(ProductInfo, p as FragmentType<typeof ProductInfo>))),
        cartId ? client
            .query(POPULAR_ITEMS, {amount: 5, cart: cartId})
            .then(r => r.topProducts.map(p => useFragment(ProductInfo, p as FragmentType<typeof ProductInfo>)))
            .catch(() => []): []
    ])

    return { featured: [], top, favorites }
}

export default function Homepage() {
    const {featured, top, favorites} = useLoaderData<typeof loader>()
    const shop = useShop()
    const { cart } = useContext(CartContext)
    const navigate = useNavigate()
    const count = useRef(0)

    useEffect(() => {
        if (count.current < 2) {
            count.current++;
            return
        }
        navigate('.', { replace: true })
    }, [cart?.identity.uuid])

    const categories = shop.categories
        .flatMap(c => c.subcategories.length > 0 ? c.subcategories : [c])

    return (
        <div className={"flex flex-col gap-20"}>
            <Slider featured={featured}/>
            <div className={"flex flex-col gap-4"}>
                <h2 className={"text-customn-white-200 font-bold text-2xl"}>Shop By Category</h2>
                <div className={"flex flex-row justify-between items-center gap-4"}>
                    {categories
                        .slice(0, Math.min(categories.length, 3))
                        .map(c => (
                            <div key={c.id} className={"flex flex-col flex-1 justify-between"}>
                                <Link className={"rounded-md border-white bg-white bg-opacity-10 border px-8 py-2 text-center text-white"} to={`/category/${c.handle}`}>
                                    Shop {c.title}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            {favorites.length > 0 &&
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-customn-white-200 font-bold text-2xl"}>Your Favorites</h2>
                    <div className={"flex flex-row overflow-x-auto gap-4 items-center"}>
                        {favorites.map((p) => <ItemCard key={p.id} product={p as IProduct}/>)}
                    </div>
                </div>
            }
            <div className={"flex flex-col gap-4"}>
                <h2 className={"text-customn-white-200 font-bold text-2xl"}>Most Popular</h2>
                <div className={"flex flex-row overflow-x-auto gap-4 items-center"}>
                    {top.map((p) => <ItemCard key={p.id} product={p as IProduct}/>)}
                </div>
            </div>
        </div>
    )
}
