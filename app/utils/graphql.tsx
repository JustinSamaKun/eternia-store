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
import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import {FragmentType, useFragment} from "~/graphql/generated";

export function asFragment<T>(object: { ' $fragmentRefs'?: object }, type: TypedDocumentNode<T, unknown>): T {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFragment(type, object as FragmentType<typeof type>)
}

export function useClient() {
    let url = 'https://api.agoramp.com/graphql';
    let store = useShop().id;

    return new GraphQLClient(createClient({
        url,
        requestPolicy: 'network-only',
        exchanges: [fetchExchange]
    }), store)
}

export function getClient(request: Request) {
    let url = 'https://api.agoramp.com/graphql';
    let store = getStoreId(request)

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

    public async query<Data = any, Variables extends AnyVariables = AnyVariables>(query: DocumentInput<Data, Variables>, variables?: Variables): Promise<Data> {
        const result = await this.client.query<Data, Variables>(query, variables ?? ({} as any), {
            fetchOptions: {
                headers: {
                    'X-Agora-Store-Id': this.shop
                }
            }
        });

        if (result.error || !result.data) {
            return Promise.reject(result.error || new Error("No data received."));
        }

        return result.data
    }

    public async mutation<Data = any, Variables extends AnyVariables = AnyVariables>(query: DocumentInput<Data, Variables>, variables?: Variables): Promise<Data> {
        const result = await this.client.mutation<Data, Variables>(query, variables ?? ({} as any), {
            fetchOptions: {
                headers: {
                    'X-Agora-Store-Id': this.shop
                }
            }
        });

        if (result.error || !result.data) {
            return Promise.reject(result.error || new Error("No data received."));
        }

        return result.data
    }
}
