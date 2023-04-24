import { GraphQLClient } from "graphql-request";
type ShopifyStorefrontAPIService = {
  client: GraphQLClient;
};

class ShopifyStorefrontService {
  private readonly apiVersion: string = "2023-04";
  private readonly shopifyStorefrontApiUrl: string = `https://novhi.myshopify.com/api/${this.apiVersion}/graphql.json`;
  private accessToken: string;
  client: GraphQLClient;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.client = new GraphQLClient(this.shopifyStorefrontApiUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": this.accessToken,
      },
    });
  }
}

export default ShopifyStorefrontService;
