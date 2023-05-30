/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Represents a valid 3 digit currency code. */
  Currency: { input: any; output: any; }
  /** Represents an ISO 8601-encoded date and time string. */
  DateTime: { input: any; output: any; }
  /** Represents an arbitrary precision decimal number encoded as a string. */
  Decimal: { input: any; output: any; }
};

export type BillingInfo = {
  __typename?: 'BillingInfo';
  email?: Maybe<Scalars['String']['output']>;
  zipCode?: Maybe<Scalars['Int']['output']>;
};

export type BillingInfoInput = {
  acceptsMarketing?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  regionCode?: InputMaybe<Scalars['String']['input']>;
};

export type Branding = {
  __typename?: 'Branding';
  colors: Array<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
};

export type Cart = Node & {
  __typename?: 'Cart';
  checkoutURL: Scalars['String']['output'];
  cost: Cost;
  currency: Scalars['String']['output'];
  discounts: Array<Discount>;
  id: Scalars['ID']['output'];
  identity: Identity;
  items: Array<CartItem>;
  metadata: Array<Entry>;
  recommendedProducts: Array<Product>;
  totalQuantity: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CartRecommendedProductsArgs = {
  amount: Scalars['Int']['input'];
};

export type CartItem = Node & {
  __typename?: 'CartItem';
  cost: Cost;
  discounts: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  variables: Array<Variable>;
};

export type CartLineInput = {
  destinations?: InputMaybe<Array<Scalars['String']['input']>>;
  product: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  variables?: InputMaybe<Array<VariableInput>>;
};

export type Category = Node & {
  __typename?: 'Category';
  description: Scalars['String']['output'];
  displayType: DisplayType;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  numericalId: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  parent?: Maybe<Category>;
  products: Array<Product>;
  subcategories: Array<Category>;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type Checkout = Node & {
  __typename?: 'Checkout';
  cart: Cart;
  cost: Cost;
  country: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  info: BillingInfo;
  paymentInfo: PaymentInfo;
  returnURL: Scalars['String']['output'];
  taxRequirement?: Maybe<TaxRequirement>;
  url: Scalars['String']['output'];
};

export type CheckoutStatus = {
  __typename?: 'CheckoutStatus';
  fulfillmentsRemaining: Scalars['Int']['output'];
  orderExists: Scalars['Boolean']['output'];
};

export type Cost = {
  __typename?: 'Cost';
  actual: Scalars['Decimal']['output'];
  list: Scalars['Decimal']['output'];
  savings: Scalars['Decimal']['output'];
  subscriptions: Array<SubscriptionPlan>;
  tax?: Maybe<Scalars['Decimal']['output']>;
};

export type Destination = Node & {
  __typename?: 'Destination';
  id: Scalars['ID']['output'];
  secret?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Discount = {
  __typename?: 'Discount';
  amount: Scalars['Decimal']['output'];
  end?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  type: DiscountType;
};

export enum DiscountType {
  Coupon = 'COUPON',
  Sale = 'SALE'
}

export enum DisplayType {
  Grid = 'GRID',
  List = 'LIST'
}

export type Entry = {
  __typename?: 'Entry';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type EntryInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type FulfillmentSpecification = {
  __typename?: 'FulfillmentSpecification';
  destinations: Array<Scalars['String']['output']>;
};

export type GameAccount = {
  __typename?: 'GameAccount';
  username?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type Identity = {
  __typename?: 'Identity';
  email?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type IdentityInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type Module = {
  __typename?: 'Module';
  metafield?: Maybe<Scalars['String']['output']>;
  metafields: Array<Entry>;
  type: ModuleType;
};


export type ModuleMetafieldArgs = {
  key: Scalars['String']['input'];
};

export enum ModuleType {
  RecentOrders = 'RECENT_ORDERS',
  TopCustomer = 'TOP_CUSTOMER'
}

export type Mutation = {
  __typename?: 'Mutation';
  cartCheckout?: Maybe<Checkout>;
  cartCreate?: Maybe<Cart>;
  cartCurrencyUpdate?: Maybe<Cart>;
  cartDiscountAdd?: Maybe<Cart>;
  cartDiscountRemove?: Maybe<Cart>;
  cartLineAdd?: Maybe<Cart>;
  cartLineDelete?: Maybe<Cart>;
  cartLineRemove?: Maybe<Cart>;
  cartLineUpdate?: Maybe<Cart>;
  cartSetIdentity?: Maybe<Cart>;
  checkoutSetInfo?: Maybe<Checkout>;
};


export type MutationCartCheckoutArgs = {
  cartId: Scalars['ID']['input'];
  country: Scalars['String']['input'];
  ip: Scalars['String']['input'];
  returnURL?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCartCreateArgs = {
  destinations?: InputMaybe<Array<Scalars['String']['input']>>;
  discountCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  identity?: InputMaybe<IdentityInput>;
  lines?: InputMaybe<Array<CartLineInput>>;
  metadata?: InputMaybe<Array<EntryInput>>;
  overwrite?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCartCurrencyUpdateArgs = {
  cartId: Scalars['ID']['input'];
  currency: Scalars['String']['input'];
};


export type MutationCartDiscountAddArgs = {
  cartId: Scalars['ID']['input'];
  discount: Scalars['String']['input'];
};


export type MutationCartDiscountRemoveArgs = {
  cartId: Scalars['ID']['input'];
  discount: Scalars['String']['input'];
};


export type MutationCartLineAddArgs = {
  cartId: Scalars['ID']['input'];
  line: CartLineInput;
};


export type MutationCartLineDeleteArgs = {
  cartId: Scalars['ID']['input'];
  lineId: Scalars['ID']['input'];
};


export type MutationCartLineRemoveArgs = {
  cartId: Scalars['ID']['input'];
  line: CartLineInput;
};


export type MutationCartLineUpdateArgs = {
  cartId: Scalars['ID']['input'];
  destinations?: InputMaybe<Array<Scalars['String']['input']>>;
  lineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  variables?: InputMaybe<Array<VariableInput>>;
};


export type MutationCartSetIdentityArgs = {
  cartId: Scalars['ID']['input'];
  identity: IdentityInput;
};


export type MutationCheckoutSetInfoArgs = {
  checkoutId: Scalars['ID']['input'];
  info: BillingInfoInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Order = Node & {
  __typename?: 'Order';
  account?: Maybe<GameAccount>;
  amount: Scalars['Decimal']['output'];
  appliedCoupons?: Maybe<Array<Scalars['String']['output']>>;
  appliedSales?: Maybe<Array<Scalars['String']['output']>>;
  customer?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  offers: Array<Product>;
  products: Array<ProductPayment>;
  returnUrl: Scalars['String']['output'];
  status: OrderStatus;
  tax: Scalars['Decimal']['output'];
};

export enum OrderStatus {
  Chargeback = 'CHARGEBACK',
  Complete = 'COMPLETE',
  Refund = 'REFUND',
  Unknown = 'UNKNOWN'
}

export type PaymentInfo = {
  __typename?: 'PaymentInfo';
  paypalId?: Maybe<Scalars['String']['output']>;
  paypalOrderId?: Maybe<Scalars['String']['output']>;
  stripeId?: Maybe<Scalars['String']['output']>;
  stripeToken?: Maybe<Scalars['String']['output']>;
};

export enum Period {
  Day = 'DAY',
  Hour = 'HOUR',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type Pricing = {
  __typename?: 'Pricing';
  discounts: Array<Discount>;
  listPrice: Scalars['Decimal']['output'];
  price: Scalars['Decimal']['output'];
  subscription?: Maybe<SubscriptionPlan>;
};

export type Product = Node & {
  __typename?: 'Product';
  category: Category;
  description: Scalars['String']['output'];
  fulfillments: Array<FulfillmentSpecification>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  numericalId: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  price: Pricing;
  purchaseType: PurchaseType;
  restricted: Scalars['Boolean']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  userSelectDestination?: Maybe<Scalars['Boolean']['output']>;
  variables: Array<ProductVariable>;
};


export type ProductPriceArgs = {
  cartId?: InputMaybe<Scalars['ID']['input']>;
};


export type ProductRestrictedArgs = {
  cartId?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductPayment = {
  __typename?: 'ProductPayment';
  amount: Scalars['Decimal']['output'];
  id: Scalars['ID']['output'];
  plan?: Maybe<SubscriptionPlan>;
  product: Product;
};

export type ProductVariable = {
  __typename?: 'ProductVariable';
  description: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  options?: Maybe<Array<VariableOption>>;
  restriction?: Maybe<TextRestriction>;
  type?: Maybe<VariableType>;
};

export enum PurchaseType {
  OneTime = 'ONE_TIME',
  Subscription = 'SUBSCRIPTION'
}

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<Cart>;
  categories: Array<Category>;
  categoriesByParent: Array<Category>;
  categoriesByTag: Array<Category>;
  categoryByHandle?: Maybe<Category>;
  categoryByID?: Maybe<Category>;
  checkout?: Maybe<Checkout>;
  checkoutStatus: CheckoutStatus;
  order?: Maybe<Order>;
  productByHandle?: Maybe<Product>;
  productByID?: Maybe<Product>;
  productByNumerical?: Maybe<Product>;
  products: Array<Product>;
  productsByTag: Array<Product>;
  recentOrders: Array<RecentOrder>;
  recommendedProducts: Array<Product>;
  shop: Shop;
  topCustomer?: Maybe<GameAccount>;
  topProducts: Array<Product>;
  user?: Maybe<User>;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesByParentArgs = {
  parent?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoriesByTagArgs = {
  tag: Scalars['String']['input'];
};


export type QueryCategoryByHandleArgs = {
  handle: Scalars['String']['input'];
};


export type QueryCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCheckoutArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCheckoutStatusArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductByHandleArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProductByNumericalArgs = {
  handle: Scalars['Int']['input'];
};


export type QueryProductsByTagArgs = {
  tag?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRecommendedProductsArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTopCustomerArgs = {
  period: Period;
};


export type QueryTopProductsArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  cart?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  user?: InputMaybe<Scalars['String']['input']>;
};

export type RecentOrder = {
  __typename?: 'RecentOrder';
  account: GameAccount;
};

export type Shop = Node & {
  __typename?: 'Shop';
  brand: Branding;
  branding: Branding;
  categories: Array<Category>;
  currency: Scalars['Currency']['output'];
  description: Scalars['String']['output'];
  destinations: Array<Destination>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  modules: Array<Module>;
  theme: Theme;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  variables: Array<ProductVariable>;
};


export type ShopThemeArgs = {
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionPlan = {
  __typename?: 'SubscriptionPlan';
  freeTrial?: Maybe<TimeSpecification>;
  initialCost: Scalars['Decimal']['output'];
  interval: TimeSpecification;
  recurringCost: Scalars['Decimal']['output'];
};

export type TaxRequirement = {
  __typename?: 'TaxRequirement';
  options: Array<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type TextRestriction = {
  __typename?: 'TextRestriction';
  maximumLength: Scalars['Int']['output'];
  minimumLength: Scalars['Int']['output'];
};

export type Theme = {
  __typename?: 'Theme';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  type: ThemeType;
  variable?: Maybe<Scalars['String']['output']>;
  variables: Array<Entry>;
};


export type ThemeVariableArgs = {
  key: Scalars['String']['input'];
};

export enum ThemeType {
  Remix = 'REMIX',
  Static = 'STATIC',
  Twig = 'TWIG'
}

export type TimeSpecification = {
  __typename?: 'TimeSpecification';
  amount: Scalars['Int']['output'];
  unit: TimeUnit;
};

export enum TimeUnit {
  Days = 'DAYS',
  Hours = 'HOURS',
  Minutes = 'MINUTES',
  Months = 'MONTHS',
  Seconds = 'SECONDS',
  Weeks = 'WEEKS',
  Years = 'YEARS'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Variable = {
  __typename?: 'Variable';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type VariableInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type VariableOption = {
  __typename?: 'VariableOption';
  name: Scalars['String']['output'];
  percent: Scalars['Boolean']['output'];
  price: Scalars['Decimal']['output'];
  value: Scalars['String']['output'];
};

export enum VariableType {
  Dropdown = 'DROPDOWN',
  Text = 'TEXT'
}

export type CartInfoFragment = { __typename?: 'Cart', id: string, currency: string, identity: { __typename?: 'Identity', username: string, uuid: string }, cost: { __typename?: 'Cost', actual: any }, discounts: Array<{ __typename?: 'Discount', title: string }>, items: Array<{ __typename?: 'CartItem', id: string, quantity: number, product: { __typename?: 'Product', id: string, handle: string, title: string, image?: string | null }, cost: { __typename?: 'Cost', actual: any, list: any } }> } & { ' $fragmentName'?: 'CartInfoFragment' };

export type CartQueryVariables = Exact<{
  cart: Scalars['ID']['input'];
}>;


export type CartQuery = { __typename?: 'Query', cart?: (
    { __typename?: 'Cart' }
    & { ' $fragmentRefs'?: { 'CartInfoFragment': CartInfoFragment } }
  ) | null };

export type CartAddMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartAddMutation = { __typename?: 'Mutation', cartLineAdd?: (
    { __typename?: 'Cart' }
    & { ' $fragmentRefs'?: { 'CartInfoFragment': CartInfoFragment } }
  ) | null };

export type CartCreateMutationVariables = Exact<{
  ign: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
}>;


export type CartCreateMutation = { __typename?: 'Mutation', cartCreate?: (
    { __typename?: 'Cart' }
    & { ' $fragmentRefs'?: { 'CartInfoFragment': CartInfoFragment } }
  ) | null };

export type CartCheckoutMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  country: Scalars['String']['input'];
  ip: Scalars['String']['input'];
  returnURL?: InputMaybe<Scalars['String']['input']>;
}>;


export type CartCheckoutMutation = { __typename?: 'Mutation', cartCheckout?: { __typename?: 'Checkout', id: string, country: string, url: string } | null };

export type CartRemoveMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartRemoveMutation = { __typename?: 'Mutation', cartLineRemove?: (
    { __typename?: 'Cart' }
    & { ' $fragmentRefs'?: { 'CartInfoFragment': CartInfoFragment } }
  ) | null };

export type CartUpdateMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  lineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartUpdateMutation = { __typename?: 'Mutation', cartLineUpdate?: (
    { __typename?: 'Cart' }
    & { ' $fragmentRefs'?: { 'CartInfoFragment': CartInfoFragment } }
  ) | null };

export type UserQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string } | null };

export type ProductInfoFragment = { __typename?: 'Product', id: string, handle: string, title: string, image?: string | null, price: { __typename?: 'Pricing', price: any, listPrice: any } } & { ' $fragmentName'?: 'ProductInfoFragment' };

export type ShopQueryVariables = Exact<{
  theme?: InputMaybe<Scalars['String']['input']>;
}>;


export type ShopQuery = { __typename?: 'Query', shop: { __typename?: 'Shop', id: string, title: string, description: string, theme: { __typename?: 'Theme', slideshow?: string | null }, branding: { __typename?: 'Branding', logo?: string | null, icon?: string | null }, categories: Array<{ __typename?: 'Category', id: string, title: string, handle: string, order: number, subcategories: Array<{ __typename?: 'Category', id: string, title: string, handle: string, order: number }> }> } };

export type TopProductsQueryVariables = Exact<{
  amount?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  cart?: InputMaybe<Scalars['ID']['input']>;
}>;


export type TopProductsQuery = { __typename?: 'Query', topProducts: Array<(
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductInfoFragment': ProductInfoFragment } }
  )> };

export type ProductQueryVariables = Exact<{
  product: Scalars['String']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', productByHandle?: { __typename?: 'Product', title: string, description: string, image?: string | null, price: { __typename?: 'Pricing', price: any, listPrice: any } } | null, recommendedProducts: Array<{ __typename?: 'Product', title: string, image?: string | null, price: { __typename?: 'Pricing', price: any, listPrice: any } }> };

export type SlideshowProductQueryVariables = Exact<{
  product: Scalars['ID']['input'];
}>;


export type SlideshowProductQuery = { __typename?: 'Query', productByID?: { __typename?: 'Product', title: string, description: string, image?: string | null, price: { __typename?: 'Pricing', price: any, listPrice: any } } | null };

export type NavigationQueryVariables = Exact<{ [key: string]: never; }>;


export type NavigationQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', handle: string, title: string, description: string, subcategories: Array<{ __typename?: 'Category', handle: string, title: string, description: string }> }> };

export type CategoryQueryVariables = Exact<{
  category: Scalars['String']['input'];
}>;


export type CategoryQuery = { __typename?: 'Query', categoryByHandle?: { __typename?: 'Category', handle: string, title: string, description: string, displayType: DisplayType, products: Array<(
      { __typename?: 'Product' }
      & { ' $fragmentRefs'?: { 'ProductInfoFragment': ProductInfoFragment } }
    )> } | null };

export const CartInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}},{"kind":"Field","name":{"kind":"Name","value":"list"}}]}}]}}]}}]} as unknown as DocumentNode<CartInfoFragment, unknown>;
export const ProductInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"listPrice"}}]}}]}}]} as unknown as DocumentNode<ProductInfoFragment, unknown>;
export const CartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Cart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cart"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cart"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}},{"kind":"Field","name":{"kind":"Name","value":"list"}}]}}]}}]}}]} as unknown as DocumentNode<CartQuery, CartQueryVariables>;
export const CartAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLineAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"line"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"product"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}},{"kind":"Field","name":{"kind":"Name","value":"list"}}]}}]}}]}}]} as unknown as DocumentNode<CartAddMutation, CartAddMutationVariables>;
export const CartCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ign"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}},{"kind":"Field","name":{"kind":"Name","value":"list"}}]}}]}}]}}]} as unknown as DocumentNode<CartCreateMutation, CartCreateMutationVariables>;
export const CartCheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartCheckout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"returnURL"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartCheckout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"ip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ip"}}},{"kind":"Argument","name":{"kind":"Name","value":"returnURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"returnURL"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CartCheckoutMutation, CartCheckoutMutationVariables>;
export const CartRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLineRemove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"line"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"product"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}},{"kind":"Field","name":{"kind":"Name","value":"list"}}]}}]}}]}}]} as unknown as DocumentNode<CartRemoveMutation, CartRemoveMutationVariables>;
export const CartUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLineUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lineId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"}},{"kind":"Field","name":{"kind":"Name","value":"list"}}]}}]}}]}}]} as unknown as DocumentNode<CartUpdateMutation, CartUpdateMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const ShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Shop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"theme"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"theme"},"value":{"kind":"Variable","name":{"kind":"Name","value":"theme"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"slideshow"},"name":{"kind":"Name","value":"variable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"slideshow","block":false}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"branding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ShopQuery, ShopQueryVariables>;
export const TopProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cart"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"cart"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cart"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"listPrice"}}]}}]}}]} as unknown as DocumentNode<TopProductsQuery, TopProductsQueryVariables>;
export const ProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Product"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productByHandle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"listPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommendedProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"listPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const SlideshowProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SlideshowProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"listPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<SlideshowProductQuery, SlideshowProductQueryVariables>;
export const NavigationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Navigation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<NavigationQuery, NavigationQueryVariables>;
export const CategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Category"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryByHandle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"displayType"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"listPrice"}}]}}]}}]} as unknown as DocumentNode<CategoryQuery, CategoryQueryVariables>;