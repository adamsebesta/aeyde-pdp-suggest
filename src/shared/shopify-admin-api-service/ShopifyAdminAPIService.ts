import { GraphQLClient } from "graphql-request";

export class ShopifyAdminAPIService {
  private readonly apiVersion: string = "2023-04";
  private readonly shopifyAdminApiUrl: string = `https://novhi.myshopify.com/admin/api/${this.apiVersion}/graphql.json`;
  private accessToken: string;
  client: GraphQLClient;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.client = new GraphQLClient(this.shopifyAdminApiUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Admin-Access-Token": this.accessToken,
      },
    });
  }
  public updateMetafield = async (
    metafieldId: string,
    metafieldValue: string
  ): Promise<void> => {
    const query = `
      mutation metafieldUpdate($input: MetafieldInput!) {
        metafieldUpdate(input: $input) {
          metafield {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    const variables = {
      input: {
        id: metafieldId,
        value: metafieldValue,
      },
    };
    const data = await this.client.request(query, variables);
    console.log(data);
  };
  public getMetafield = async (): Promise<void> => {
    const query = `
    {
  shop {
    id
  }
}
  `;
    const data = await this.client.request(query);
    console.log(data);
    return data;
  };
  public getMetafieldValue = async (
    collectionId: string,
    metafieldNamespace: string, // e.g. "pdp"
    metafieldKey: string // e.g. "dynamic_suggested_products"
  ): Promise<void> => {
    const query = `
    {
      collection(id: "gid://shopify/Collection/${collectionId}") {
        metafield(namespace: "${metafieldNamespace}", key: "${metafieldKey}") {
          value
        }
      }
    }
  `;
    const data = await this.client.request(query);
    console.log(data);
    return data;
  };
}
