import {graphql} from "~/graphql/generated";

export const CartInfo = graphql(`
fragment CartInfo on Cart {
    id
    currency
    identity {
        username
        uuid
    }
    cost {
        actual
    }
    discounts {
        title
    }
    items {
        id
        product {
            id
            handle
            title
            image
        }
        quantity
        cost {
            actual
            list
        }
    }
}
`)

export const CART_QUERY = graphql(`
    query Cart($cart: ID!) {
        cart(id: $cart) {
            ...CartInfo
        }
    }
`)

export const CART_LINE_ADD = graphql(`
    mutation CartAdd($cartId: ID!, $productId: ID!, $quantity: Int!) {
        cartLineAdd(cartId: $cartId, line: {
            product: $productId,
            quantity: $quantity
        }) {
            ...CartInfo
        }
    }
`)

export const CART_CREATE = graphql(`
    mutation CartCreate($ign: String!, $uuid: String!) {
        cartCreate(
            identity: {
                username: $ign,
                uuid: $uuid
            }
        ) {
            ...CartInfo
        }
    }
`)

export const CART_CHECKOUT = graphql(`
    mutation CartCheckout($cartId: ID!, $country: String!, $ip: String!, $returnURL: String) {
        cartCheckout(cartId: $cartId, country:$country, ip:$ip, returnURL: $returnURL) {
            id
            country
            url
        }
    }
`)

export const CART_LINE_REMOVE = graphql(`
    mutation CartRemove($cartId: ID!, $productId: ID!, $quantity: Int!) {
        cartLineRemove(cartId: $cartId, line: {
            product: $productId,
            quantity: $quantity
        }) {
            ...CartInfo
        }
    }
`)

export const CART_LINE_UPDATE = graphql(`
    mutation CartUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {
        cartLineUpdate(cartId: $cartId, lineId: $lineId, quantity: $quantity) {
            ...CartInfo
        }
    }
`)

export const USER_QUERY = graphql(`
    query User($user: String!) {
        user(user: $user) {
            id
            name
        }
    }
`)
