import {Slider} from "~/components";
import React, {useContext, useEffect, useRef} from "react";
import {useLoaderData, useNavigate} from "@remix-run/react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {useClient, getClient, asFragment} from "~/utils/graphql";
import useShop from "~/hooks/useShop";
import {Link} from "react-router-dom";
import {ItemCard} from "~/components/ItemCard";
import {getCartId} from "~/utils/requests.server";
import {CartContext} from "~/context/CartContext";
import type {
    IProduct} from "~/graphql/shop";
import {
    CategoryInfo,
    POPULAR_ITEMS,
    ProductInfo,
    SLIDESHOW_PRODUCT_QUERY,
    SLIDESHOW_QUERY
} from "~/graphql/shop";
import type {SlideshowProductQuery} from "~/graphql/generated/graphql";
import Content from "~/components/Content";
import Header from "~/components/Header";

export async function loader({ request }: LoaderFunctionArgs) {
    const client = getClient(request)
    const cartId = getCartId(request)
    const theme = new URL(request.url).searchParams.get('theme') ?? process.env.THEME_ID

    const [top, favorites, shop] = await Promise.all([
        client
            .query(POPULAR_ITEMS, { amount: 5, cart: cartId })
            .then(r => r.topProducts.map(p => asFragment(p, ProductInfo))),
        cartId ? client
            .query(POPULAR_ITEMS, {amount: 5, cartId: cartId, cart: cartId})
            .then(r => r.topProducts.map(p => asFragment(p, ProductInfo)))
            .catch(() => []): [],
        client.query(SLIDESHOW_QUERY, { theme }).then(r => r.shop)
    ])

    const slideshow = shop.theme.slideshow
    let featured: Required<SlideshowProductQuery['productByID'][]> = []
    if (slideshow) {
        featured = (await Promise
            .all(
                slideshow
                    .split(',')
                    .filter(s => s.length > 0)
                    .map(id => client.query(SLIDESHOW_PRODUCT_QUERY, { product: id, cart: cartId }).then(r => r.productByID))
            ))
            .filter(p => p)
            .map(p => p!)
    }

    return { top, favorites, featured }
}

export default function Homepage() {
    const {top, favorites, featured} = useLoaderData<typeof loader>()
    const shop = useShop()
    const {cart} = useContext(CartContext)
    const navigate = useNavigate()
    const count = useRef(0)

    useEffect(() => {
        if (count.current < 2) {
            count.current++;
            return
        }
        navigate('.', {replace: true})
    }, [cart?.identity.uuid])

    const categories = shop.categories
        .flatMap(c => c.subcategories.length > 0 ? c.subcategories : [c])
        .map(c => asFragment(c, CategoryInfo))

    return (
        <>
            <Header>
                <Slider featured={featured as any}/>
            </Header>
            <Content>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"text-stone-200 font-bold text-2xl"}>Shop By Category</h2>
                    <div className={"flex flex-row justify-between items-center gap-12"}>
                        {categories
                            .slice(0, Math.min(categories.length, 3))
                            .map(c => (
                                <div key={c.id} className={"flex flex-col flex-1 justify-between gap-8"}>
                                    <img
                                        className={"object-contain h-[20rem]"}
                                        alt={`${c.title} Product Image`}
                                        src={c.image ?? asFragment(c.firstProduct[0], ProductInfo).image ?? "https://cdn.agoramp.com/static/209/assets/blank_product.png"}
                                    />
                                    <Link
                                        className={"button rounded-full text-center px-8 py-2"}
                                        to={`/category/${c.handle}`}
                                    >
                                        Shop {c.title}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {favorites.length > 0 &&
                    <div className={"flex flex-col gap-8"}>
                        <h2 className={"text-stone-200 font-bold text-2xl"}>Your Favorites</h2>
                        <div className={"flex flex-row overflow-x-auto gap-4 items-center"}>
                            {favorites.map((p) => <ItemCard key={p.id} product={p as IProduct}/>)}
                        </div>
                    </div>
                }
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"text-stone-200 font-bold text-2xl"}>Most Popular</h2>
                    <div className={"flex flex-row overflow-x-auto gap-4 items-center"}>
                        {top.map((p) => <ItemCard key={p.id} product={p as IProduct}/>)}
                    </div>
                </div>
            </Content>
        </>
    )
}
