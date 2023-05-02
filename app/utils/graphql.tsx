import gql from "graphql-tag";
import {
    AnyVariables,
    Client,
    createClient,
    DocumentInput,
    fetchExchange,
    OperationContext,
    OperationResult,
} from "urql";
import {getStoreId} from "~/utils/requests.server";
import useShop from "~/hooks/useShop";

export function useClient(request?: Request) {
    let store: string, url: string;
    if (request) {
        store = getStoreId(request)
        url = 'http://agora-api-service.default.svc.cluster.local/graphql';
    } else {
        const shop = useShop();
        store = shop.id;
        url = 'http://admin.agoramp.com/graphql';
    }

    return new GraphQLClient(createClient({
        url,
        requestPolicy: 'network-only',
        exchanges: [fetchExchange]
    }), store)
}

export class GraphQLClient {
    private client: Client;
    private shop: string;

    constructor(client: Client, shop: string) {
        this.client = client;
        this.shop = shop;
    }

    private async query<Data = any, Variables extends AnyVariables = AnyVariables>(query: DocumentInput<Data, Variables>, variables?: Variables) {
        const result = await this.client.query<Data, Variables>(query, variables ?? ({} as any), {
            fetchOptions: {
                headers: {
                    'X-Agora-Store-Id': this.shop
                }
            }
        });

        const { data } = result;

        if (result.error || !data) {
            return Promise.reject(result.error || new Error("No data received."));
        }

        return { data }
    }

    private async mutation<Data = any, Variables extends AnyVariables = AnyVariables>(query: DocumentInput<Data, Variables>, variables?: Variables) {
        const result = await this.client.mutation<Data, Variables>(query, variables ?? ({} as any), {
            fetchOptions: {
                headers: {
                    'X-Agora-Store-Id': this.shop
                }
            }
        });

        const { data } = result;

        if (result.error || !data) {
            return Promise.reject(result.error || new Error("No data received."));
        }

        return { data }
    }

    public async fetchShop() {
        const result = await this.query<ShopQueryResult>(SHOP_QUERY);

        return result.data.shop;
    }

    public async fetchPopularItems(amount?: number, user?: string, cart?: string) {
        const result = await this.query<PopularItemsResult>(POPULAR_ITEMS, { amount, user, cart });

        return result.data.topProducts;
    }

    public async fetchProductByHandle(handle: string) {
        const query = PRODUCT_QUERY;
        const variables = {product: handle};
        const result = await this.query<ProductQueryResult>(query, variables);

        return result.data;
    }

    public async fetchProductsByTag(tag: string) {
        const query = PRODUCTS_BY_TAG;
        const variables = { tag };
        const result = await this.query<ProductsByTagResult>(query, variables);

        return result.data.productsByTag;
    }

    public async fetchCategories() {
        const result = await this.query<CategoriesQueryResult>(CATEGORIES_QUERY);

        return result.data.categories;
    }

    public async fetchCategoryByHandle(handle: string) {
        const query = CATEGORY_QUERY;
        const variables = { category: handle };
        const result = await this.query<CategoryQueryResult>(query, variables);

        return result.data.categoryByHandle;
    }

    public async fetchProductsByCategory(handle: string) {
        const query = PRODUCTS_BY_CATEGORY_QUERY;
        const variables = { category: handle };
        const result = await this.query<ProductsByCategoryQueryResult>(query, variables);

        return result.data.categoryByHandle;
    }

    public async fetchCart(cartId: string) {
        const query = CART_QUERY;
        const variables = { cart: cartId };
        const result = await this.query<CartQueryResult>(query, variables);

        return result.data.cart;
    }

    public async fetchUser(user: string) {
        const result = await this.query<UserQueryResult>(USER_QUERY, { user });

        return result.data.user;
    }

    public async addCartLine(cartId: string, productId: string, quantity: number) {
        const mutation = CART_LINE_ADD;
        const variables = { cartId, productId, quantity };
        const result = await this.mutation<CartLineAddResult>(mutation, variables);

        return result.data.cartLineAdd;
    }

    public async createCart(ign: string, uuid: string) {
        const mutation = CART_CREATE;
        const variables = { ign, uuid };
        const result = await this.mutation<CartCreateResult>(mutation, variables);

        return result.data.cartCreate;
    }

    public async createCheckout(cartId: string, ip: string, country: string, returnURL?: string) {
        const result = await this.mutation<CartCheckoutResult>(CART_CHECKOUT, { cartId, ip, country, returnURL });

        return result.data.cartCheckout;
    }

    public async removeCartLine(cartId: string, productId: string, quantity: number) {
        const mutation = CART_LINE_REMOVE;
        const variables = { cartId, productId, quantity };
        const result = await this.mutation<CartLineRemoveResult>(mutation, variables);

        return result.data.cartLineRemove;
    }

    public async updateCartLine(cartId: string, lineId: string, quantity: number) {
        const mutation = CART_LINE_UPDATE;
        const variables = { cartId, lineId, quantity };
        const result = await this.mutation<CartLineUpdateResult>(mutation, variables);

        return result.data.cartLineUpdate;
    }
}

const SHOP_QUERY = gql`
    query {
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
`

const POPULAR_ITEMS = gql`
    query TopProducts($amount: Int, $user: String, $cart: ID) {
        topProducts(amount: $amount, user: $user, cart: $cart) {
            id
            handle
            title
            image
            price {
                price
                listPrice
            }
        }
    }
`

const PRODUCT_QUERY = gql`
    query Product($product: String!) {
        productByHandle(handle: $product) {
            title
            description
            price {
                price
                listPrice
            }
            image
        },
        recommendedProducts(handle: $product) {
            title
            price {
                price
                listPrice
            }
            image
        }
    }
`

const PRODUCTS_BY_TAG = gql`
    query Product($tag: String!) {
        productsByTag(tag: $tag) {
            id
            handle
            title
            image
            description
            price {
                price
                listPrice
            }
        }
    }
`

/**
 * Categories queries
 */
const CATEGORIES_QUERY = gql`
    query {
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
`

const CATEGORY_QUERY = gql`
    query Category($category: String!) {
        categoryByHandle(handle: $category) {
            handle
            title
            description
            displayType
            products {
                id
                handle
                title
                price {
                    price
                    listPrice
                }
                image
            }
        }
    }
`

const PRODUCTS_BY_CATEGORY_QUERY = gql`
    query Category($category: String!) {
        categoryByHandle(handle: $category) {
            products {
                id
                handle
                title
                image
                price {
                    price
                    listPrice
                }
            }
        }
    }
`

const CART_INFO = `
    id
    currency
    identity {
        username
        uuid
    }
    cost {
        actual
    }
    discounts
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
`

const CART_QUERY = gql`
    query Cart($cart: ID!) {
        cart(id: $cart) {
            ${CART_INFO}
        }
    }
`

const CART_LINE_ADD = gql`
    mutation CartAdd($cartId: ID!, $productId: ID!, $quantity: Int!) {
        cartLineAdd(cartId: $cartId, line: {
            product: $productId,
            quantity: $quantity
        }) {
            ${CART_INFO}
        }
    }
`

const CART_CREATE = gql`
    mutation CartCreate($ign: String!, $uuid: String!) {
        cartCreate(
            identity: {
                username: $ign,
                uuid: $uuid
            }
        ) {
            ${CART_INFO}
        }
    }
`

const CART_CHECKOUT = gql`
    mutation CartCheckout($cartId: ID!, $country: String!, $ip: String!, $returnURL: String) {
        cartCheckout(cartId: $cartId, country:$country, ip:$ip, returnURL: $returnURL) {
            id
            country
            url
        }
    }
`

const CART_LINE_REMOVE = gql`
    mutation CartRemove($cartId: ID!, $productId: ID!, $quantity: Int!) {
        cartLineRemove(cartId: $cartId, line: {
            product: $productId,
            quantity: $quantity
        }) {
            ${CART_INFO}
        }
    }
`

const CART_LINE_UPDATE = gql`
    mutation CartUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {
        cartLineUpdate(cartId: $cartId, lineId: $lineId, quantity: $quantity) {
            ${CART_INFO}
        }
    }
`

const USER_QUERY = gql`
    query User($user: String!) {
        user(user: $user) {
            id
            name
        }
    }
`

// Globally usable types
export interface IBranding {
    logo: string;
    icon: string;
}

export interface ICategory {
    id: string;
    title: string;
    handle: string;
    order: number;
    subcategories: ICategory[];
}

export interface ICategoryInfo {
    handle: string;
    title: string;
    description: string;
    displayType: string;
    products: IProduct[];
}

export interface IProduct {
    id: string;
    handle: string;
    title: string;
    image: string;
    price: {
        price: string;
        listPrice: string;
    };
}
export interface IIdentity {
    username: string;
    uuid: string;
}

export interface ICost {
    actual: string;
    list: string;
}

export interface ICartItem {
    id: string;
    product: {
        id: string;
        handle: string;
        title: string;
        image: string;
    };
    quantity: number;
    cost: {
        actual: string;
        list: string;
    };
}

export interface ICart {
    id: string
    identity: IIdentity;
    cost: ICost;
    currency: string;
    discounts: string[];
    items: ICartItem[];
}

export interface ICheckout {
    id: string
    country: string
    url: string
}

export interface Shop {
    id: string;
    title: string;
    description: string;
    branding: IBranding;
    categories: ICategory[];
    variables: [{key: string, value: string}]
}

// TypeScript interfaces for query results
interface ShopQueryResult {
    shop: Shop;
}

interface PopularItemsResult {
    topProducts: IProduct[];
}

export interface IProductInfo extends IProduct {
    description: string
}

export interface ProductQueryResult {
    productByHandle: IProductInfo;
    recommendedProducts: IProduct[];
}

interface ProductsByTagResult {
    productsByTag: IProductInfo[];
}

interface CategoriesQueryResult {
    categories: ICategory[];
}

interface CategoryQueryResult {
    categoryByHandle: {
        handle: string;
        title: string;
        description: string;
        displayType: string;
        products: IProduct[];
    };
}

interface ProductsByCategoryQueryResult {
    categoryByHandle: {
        products: IProduct[];
    };
}

interface UserQueryResult {
    user: {
        id: string
        name: string
    };
}

interface CartQueryResult {
    cart: ICart;
}

// TypeScript interfaces for mutation results

interface CartLineAddResult {
    cartLineAdd: ICart;
}

interface CartCreateResult {
    cartCreate: ICart;
}

interface CartCheckoutResult {
    cartCheckout: ICheckout;
}

interface CartLineRemoveResult {
    cartLineRemove: ICart
}

interface CartLineUpdateResult {
    cartLineUpdate: ICart
}
