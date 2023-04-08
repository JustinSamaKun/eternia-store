export interface IFeature {
    id: string;
    handle: string;
    title: string;
    image: string;
    description: string;
    price: {
        price: string;
        listPrice: string;
    }
}