/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nfragment CartInfo on Cart {\n    id\n    currency\n    identity {\n        username\n        uuid\n    }\n    cost {\n        actual\n    }\n    discounts {\n        title\n    }\n    items {\n        id\n        product {\n            id\n            handle\n            title\n            image\n        }\n        quantity\n        cost {\n            actual\n            list\n        }\n    }\n}\n": types.CartInfoFragmentDoc,
    "\n    query Cart($cart: ID!) {\n        cart(id: $cart) {\n            ...CartInfo\n        }\n    }\n": types.CartDocument,
    "\n    mutation CartAdd($cartId: ID!, $productId: ID!, $quantity: Int!) {\n        cartLineAdd(cartId: $cartId, line: {\n            product: $productId,\n            quantity: $quantity\n        }) {\n            ...CartInfo\n        }\n    }\n": types.CartAddDocument,
    "\n    mutation CartCreate($ign: String!, $uuid: String!) {\n        cartCreate(\n            identity: {\n                username: $ign,\n                uuid: $uuid\n            }\n        ) {\n            ...CartInfo\n        }\n    }\n": types.CartCreateDocument,
    "\n    mutation CartCheckout($cartId: ID!, $country: String!, $ip: String!, $returnURL: String) {\n        cartCheckout(cartId: $cartId, country:$country, ip:$ip, returnURL: $returnURL) {\n            id\n            country\n            url\n        }\n    }\n": types.CartCheckoutDocument,
    "\n    mutation CartRemove($cartId: ID!, $productId: ID!, $quantity: Int!) {\n        cartLineRemove(cartId: $cartId, line: {\n            product: $productId,\n            quantity: $quantity\n        }) {\n            ...CartInfo\n        }\n    }\n": types.CartRemoveDocument,
    "\n    mutation CartUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {\n        cartLineUpdate(cartId: $cartId, lineId: $lineId, quantity: $quantity) {\n            ...CartInfo\n        }\n    }\n": types.CartUpdateDocument,
    "\n    query User($user: String!) {\n        user(user: $user) {\n            id\n            name\n        }\n    }\n": types.UserDocument,
    "\nfragment ProductInfo on Product {\n    id\n    handle\n    title\n    image\n    price(cartId: $cart) {\n        price\n        listPrice\n    }\n}\n": types.ProductInfoFragmentDoc,
    "\nfragment CategoryInfo on Category {\n    id\n    title\n    handle\n    order\n    image\n    firstProduct: products(amount: 1) {\n        ...ProductInfo\n    }\n}\n": types.CategoryInfoFragmentDoc,
    "\nquery Shop($theme: String, $cart: ID) {\n    shop {\n        id\n        title\n        description\n        theme(theme: $theme) {\n            slideshow: variable(key: \"slideshow\")\n        }\n        branding {\n            logo\n            icon\n        }\n        categories {\n            ...CategoryInfo\n            subcategories {\n                ...CategoryInfo\n            }\n        }\n    }\n}\n": types.ShopDocument,
    "\nquery Slideshow($theme: String) {\n    shop {\n        theme(theme: $theme) {\n            slideshow: variable(key: \"slideshow\")\n        }\n    }\n}\n": types.SlideshowDocument,
    "\n    query TopProducts($amount: Int, $user: String, $cartId: ID, $cart: ID) {\n        topProducts(amount: $amount, user: $user, cart: $cartId) {\n            ...ProductInfo\n        }\n    }\n": types.TopProductsDocument,
    "\n    query Product($product: String!, $cart: ID) {\n        productByHandle(handle: $product) {\n            title\n            description\n    restricted(cartId: $cart)\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n        recommendedProducts(handle: $product) {\n            title\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n    }\n": types.ProductDocument,
    "\n    query SlideshowProduct($product: ID!, $cart: ID) {\n        productByID(id: $product) {\n            title\n            description\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n    }\n": types.SlideshowProductDocument,
    "\n    query Category($category: String!, $cart: ID) {\n        categoryByHandle(handle: $category) {\n            handle\n            title\n            description\n            displayType\n            products {\n                ...ProductInfo\n            }\n        }\n    }\n": types.CategoryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment CartInfo on Cart {\n    id\n    currency\n    identity {\n        username\n        uuid\n    }\n    cost {\n        actual\n    }\n    discounts {\n        title\n    }\n    items {\n        id\n        product {\n            id\n            handle\n            title\n            image\n        }\n        quantity\n        cost {\n            actual\n            list\n        }\n    }\n}\n"): (typeof documents)["\nfragment CartInfo on Cart {\n    id\n    currency\n    identity {\n        username\n        uuid\n    }\n    cost {\n        actual\n    }\n    discounts {\n        title\n    }\n    items {\n        id\n        product {\n            id\n            handle\n            title\n            image\n        }\n        quantity\n        cost {\n            actual\n            list\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Cart($cart: ID!) {\n        cart(id: $cart) {\n            ...CartInfo\n        }\n    }\n"): (typeof documents)["\n    query Cart($cart: ID!) {\n        cart(id: $cart) {\n            ...CartInfo\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CartAdd($cartId: ID!, $productId: ID!, $quantity: Int!) {\n        cartLineAdd(cartId: $cartId, line: {\n            product: $productId,\n            quantity: $quantity\n        }) {\n            ...CartInfo\n        }\n    }\n"): (typeof documents)["\n    mutation CartAdd($cartId: ID!, $productId: ID!, $quantity: Int!) {\n        cartLineAdd(cartId: $cartId, line: {\n            product: $productId,\n            quantity: $quantity\n        }) {\n            ...CartInfo\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CartCreate($ign: String!, $uuid: String!) {\n        cartCreate(\n            identity: {\n                username: $ign,\n                uuid: $uuid\n            }\n        ) {\n            ...CartInfo\n        }\n    }\n"): (typeof documents)["\n    mutation CartCreate($ign: String!, $uuid: String!) {\n        cartCreate(\n            identity: {\n                username: $ign,\n                uuid: $uuid\n            }\n        ) {\n            ...CartInfo\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CartCheckout($cartId: ID!, $country: String!, $ip: String!, $returnURL: String) {\n        cartCheckout(cartId: $cartId, country:$country, ip:$ip, returnURL: $returnURL) {\n            id\n            country\n            url\n        }\n    }\n"): (typeof documents)["\n    mutation CartCheckout($cartId: ID!, $country: String!, $ip: String!, $returnURL: String) {\n        cartCheckout(cartId: $cartId, country:$country, ip:$ip, returnURL: $returnURL) {\n            id\n            country\n            url\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CartRemove($cartId: ID!, $productId: ID!, $quantity: Int!) {\n        cartLineRemove(cartId: $cartId, line: {\n            product: $productId,\n            quantity: $quantity\n        }) {\n            ...CartInfo\n        }\n    }\n"): (typeof documents)["\n    mutation CartRemove($cartId: ID!, $productId: ID!, $quantity: Int!) {\n        cartLineRemove(cartId: $cartId, line: {\n            product: $productId,\n            quantity: $quantity\n        }) {\n            ...CartInfo\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CartUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {\n        cartLineUpdate(cartId: $cartId, lineId: $lineId, quantity: $quantity) {\n            ...CartInfo\n        }\n    }\n"): (typeof documents)["\n    mutation CartUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {\n        cartLineUpdate(cartId: $cartId, lineId: $lineId, quantity: $quantity) {\n            ...CartInfo\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query User($user: String!) {\n        user(user: $user) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query User($user: String!) {\n        user(user: $user) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment ProductInfo on Product {\n    id\n    handle\n    title\n    image\n    price(cartId: $cart) {\n        price\n        listPrice\n    }\n}\n"): (typeof documents)["\nfragment ProductInfo on Product {\n    id\n    handle\n    title\n    image\n    price(cartId: $cart) {\n        price\n        listPrice\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment CategoryInfo on Category {\n    id\n    title\n    handle\n    order\n    image\n    firstProduct: products(amount: 1) {\n        ...ProductInfo\n    }\n}\n"): (typeof documents)["\nfragment CategoryInfo on Category {\n    id\n    title\n    handle\n    order\n    image\n    firstProduct: products(amount: 1) {\n        ...ProductInfo\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Shop($theme: String, $cart: ID) {\n    shop {\n        id\n        title\n        description\n        theme(theme: $theme) {\n            slideshow: variable(key: \"slideshow\")\n        }\n        branding {\n            logo\n            icon\n        }\n        categories {\n            ...CategoryInfo\n            subcategories {\n                ...CategoryInfo\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery Shop($theme: String, $cart: ID) {\n    shop {\n        id\n        title\n        description\n        theme(theme: $theme) {\n            slideshow: variable(key: \"slideshow\")\n        }\n        branding {\n            logo\n            icon\n        }\n        categories {\n            ...CategoryInfo\n            subcategories {\n                ...CategoryInfo\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Slideshow($theme: String) {\n    shop {\n        theme(theme: $theme) {\n            slideshow: variable(key: \"slideshow\")\n        }\n    }\n}\n"): (typeof documents)["\nquery Slideshow($theme: String) {\n    shop {\n        theme(theme: $theme) {\n            slideshow: variable(key: \"slideshow\")\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query TopProducts($amount: Int, $user: String, $cartId: ID, $cart: ID) {\n        topProducts(amount: $amount, user: $user, cart: $cartId) {\n            ...ProductInfo\n        }\n    }\n"): (typeof documents)["\n    query TopProducts($amount: Int, $user: String, $cartId: ID, $cart: ID) {\n        topProducts(amount: $amount, user: $user, cart: $cartId) {\n            ...ProductInfo\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Product($product: String!, $cart: ID) {\n        productByHandle(handle: $product) {\n            title\n            description\n    restricted(cartId: $cart)\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n        recommendedProducts(handle: $product) {\n            title\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n    }\n"): (typeof documents)["\n    query Product($product: String!, $cart: ID) {\n        productByHandle(handle: $product) {\n            title\n            description\n    restricted(cartId: $cart)\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n        recommendedProducts(handle: $product) {\n            title\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query SlideshowProduct($product: ID!, $cart: ID) {\n        productByID(id: $product) {\n            title\n            description\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n    }\n"): (typeof documents)["\n    query SlideshowProduct($product: ID!, $cart: ID) {\n        productByID(id: $product) {\n            title\n            description\n            price(cartId: $cart) {\n                price\n                listPrice\n            }\n            image\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Category($category: String!, $cart: ID) {\n        categoryByHandle(handle: $category) {\n            handle\n            title\n            description\n            displayType\n            products {\n                ...ProductInfo\n            }\n        }\n    }\n"): (typeof documents)["\n    query Category($category: String!, $cart: ID) {\n        categoryByHandle(handle: $category) {\n            handle\n            title\n            description\n            displayType\n            products {\n                ...ProductInfo\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;