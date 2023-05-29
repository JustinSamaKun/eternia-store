import { graphql } from './generated'
import {ProductInfoFragment} from "~/graphql/generated/graphql";

export const ProductInfo = graphql(`
fragment ProductInfo on Product {
    id
    handle
    title
    image
    price {
        price
        listPrice
    }
}
`)

export type IProduct = ProductInfoFragment
export const SHOP_QUERY = graphql(`
query Shop {
    shop {
        id
        title
        description
        theme {
            variables {
                key
                value
            }
        }
        branding {
            logo
            icon
        }
        categories {
            id
            title
            handle
            order
            subcategories {
                id
                title
                handle
                order
            }
        }
    }
}
`)

export const POPULAR_ITEMS = graphql(`
    query TopProducts($amount: Int, $user: String, $cart: ID) {
        topProducts(amount: $amount, user: $user, cart: $cart) {
            ...ProductInfo
        }
    }
`)

export const PRODUCT_QUERY = graphql(`
    query Product($product: String!) {
        productByHandle(handle: $product) {
            title
            description
            price {
                price
                listPrice
            }
            image
        }
        recommendedProducts(handle: $product) {
            title
            price {
                price
                listPrice
            }
            image
        }
    }
`)

export const CATEGORIES_QUERY = graphql(`
    query Navigation {
        categories {
            handle
            title
            description
            subcategories {
                handle
                title
                description
            }
        }
    }
`)

export const CATEGORY_QUERY = graphql(`
    query Category($category: String!) {
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
