import { graphql } from './generated'
import {ProductInfoFragment} from "~/graphql/generated/graphql";

export const ProductInfo = graphql(`
fragment ProductInfo on Product {
    id
    handle
    title
    image
    price(cartId: $cart) {
        price
        listPrice
    }
}
`)

export const CategoryInfo = graphql(`
fragment CategoryInfo on Category {
    id
    title
    handle
    order
    image
    firstProduct: products(amount: 1) {
        ...ProductInfo
    }
}
`)

export type IProduct = ProductInfoFragment
export const SHOP_QUERY = graphql(`
query Shop($theme: String, $cart: ID) {
    shop {
        id
        title
        description
        theme(theme: $theme) {
            slideshow: variable(key: "slideshow")
        }
        branding {
            logo
            icon
        }
        categories {
            ...CategoryInfo
            subcategories {
                ...CategoryInfo
            }
        }
    }
}
`)
export const SLIDESHOW_QUERY = graphql(`
query Slideshow($theme: String) {
    shop {
        theme(theme: $theme) {
            slideshow: variable(key: "slideshow")
        }
    }
}
`)

export const POPULAR_ITEMS = graphql(`
    query TopProducts($amount: Int, $user: String, $cartId: ID, $cart: ID) {
        topProducts(amount: $amount, user: $user, cart: $cartId) {
            ...ProductInfo
        }
    }
`)

export const PRODUCT_QUERY = graphql(`
    query Product($product: String!, $cart: ID) {
        productByHandle(handle: $product) {
            title
            description
    restricted(cartId: $cart)
            price(cartId: $cart) {
                price
                listPrice
            }
            image
        }
        recommendedProducts(handle: $product) {
            title
            price(cartId: $cart) {
                price
                listPrice
            }
            image
        }
    }
`)

export const SLIDESHOW_PRODUCT_QUERY = graphql(`
    query SlideshowProduct($product: ID!, $cart: ID) {
        productByID(id: $product) {
            title
            description
            price(cartId: $cart) {
                price
                listPrice
            }
            image
        }
    }
`)

export const CATEGORY_QUERY = graphql(`
    query Category($category: String!, $cart: ID) {
        categoryByHandle(handle: $category) {
            handle
            title
            description
            displayType
            products {
                ...ProductInfo
            }
        }
    }
`)
