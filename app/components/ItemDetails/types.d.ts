interface IItem {
    title: string;
    description: string;
    price: {
        price: string;
        listPrice: string;
        purchaseTypes: string
    };
    image: string;
}

interface IItemDetails {
    productByHandle: IItem;
    recommendedProducts: IItem[];
}