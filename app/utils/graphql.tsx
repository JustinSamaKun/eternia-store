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
    let store: string, url = 'https://api.agoramp.com/graphql';
    if (request) {
        store = getStoreId(request)
    } else {
        store = useShop().id;
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
