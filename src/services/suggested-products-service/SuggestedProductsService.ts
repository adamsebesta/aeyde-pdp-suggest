import { topSellingQuery, allProductsQuery } from "../../query-templates";

import ShopifyStorefrontAPIService from "../../shared/shopify-storefront-service/ShopifyStorefrontAPIService";

class SuggestedProductsService {
  private shopifyStorefrontAPIService: ShopifyStorefrontAPIService;

  constructor(shopifyStorefrontAPIService: ShopifyStorefrontAPIService) {
    this.shopifyStorefrontAPIService = shopifyStorefrontAPIService;
  }

  // execute with collection ID
  // query DynamoDB for top 10 from collection (cg3)
  // choose n random products from top 10
  // choose 1 product with highest inventory from all products in collection which arent the n random products
  // returns top n products from collection, and formatted for frontend

  private fetchTopSellingProducts = async (
    collectionId: string,
    first: number
  ) => {
    const variables = { collectionId, first };
    const response = await this.shopifyStorefrontAPIService.client.request(
      topSellingQuery,
      variables
    );
    return response.node.products.edges;
  };

  private fetchAllProducts = async (collectionId: string, first: number) => {
    const variables = { collectionId, first };
    const response = await this.shopifyStorefrontAPIService.client.request(
      allProductsQuery,
      variables
    );
    return response.node.products.edges;
  };

  private filterByInventory = (products: any[], minInventory: number) => {
    return products.filter((product) => {
      const quantityAvailable =
        product.node.variants.edges[0].node.quantityAvailable;
      return quantityAvailable >= minInventory;
    });
  };

  private selectRandomProducts = (products: any[], count: number) => {
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, count);
  };

  private findProductWithHighestInventory = (
    products: any[],
    excludeProducts: any[]
  ) => {
    const excludedIds = excludeProducts.map((product) => product.node.id);

    return products
      .filter((product) => !excludedIds.includes(product.node.id))
      .reduce((prev, current) => {
        const prevQuantity = prev.node.variants.edges[0].node.quantityAvailable;
        const currentQuantity =
          current.node.variants.edges[0].node.quantityAvailable;

        return prevQuantity > currentQuantity ? prev : current;
      });
  };

  private async executeFlow(): Promise<Array<CreatePageResponse>> {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2OTE2ODIwMjQ=";

    // Fetch top 10 selling products
    const topSellingProducts = await this.fetchTopSellingProducts(
      collectionId,
      10
    );

    // Filter products by inventory and select 3 random products
    const filteredTopSellingProducts = this.filterByInventory(
      topSellingProducts,
      15
    );
    const randomTopSellingProducts = this.selectRandomProducts(
      filteredTopSellingProducts,
      3
    );

    // Fetch all products in the collection
    const allProducts = await this.fetchAllProducts(collectionId, 250);

    // Filter products by inventory and find the highest inventory product, excluding the top 3 randomly chosen products
    const filteredAllProducts = this.filterByInventory(allProducts, 1);
    const highestInventoryProduct = this.findProductWithHighestInventory(
      filteredAllProducts,
      randomTopSellingProducts
    );

    console.log("Random Top 3 Selling Products:", randomTopSellingProducts);
    console.log("Highest Inventory Product:", highestInventoryProduct);
  }
  async execute(): Promise<Array<any>> {
    return await this.executeFlow();
  }
}

export default SuggestedProductsService;
