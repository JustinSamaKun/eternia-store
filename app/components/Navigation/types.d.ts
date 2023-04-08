export interface IBranding {
    logo: string;
    icon: string;
}

export interface INavigationSubcategory {
    id: string;
    title: string;
    handle: string;
    order: number;
}

export interface INavigationCategory {
    id: string;
    title: string;
    handle: string;
    order: number;
    subcategories: INavigationSubcategory
}

export interface INavigation {
    shop: {
        id: string;
        branding: IBranding;
        categories: INavigationCategory[];
    }
}
