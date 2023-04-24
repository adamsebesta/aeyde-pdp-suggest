import ShopifyAdminAPIService from "../../shared/shopify-admin-api-service/ShopifyAdminAPIService";
import LookerAPIService from "../../shared/looker-api-service/LookerAPIService";

type SuggestedProductsUpdateServiceResponse = Array<any>;
interface PDPDynamicSuggestedProductsMetafieldValue {
  by_items_sold: Array<PDPDynamicSuggestedProduct>;
  by_inventory: Array<PDPDynamicSuggestedProduct>;
}
interface PDPDynamicSuggestedProduct {
  handle: string;
  id: string;
  items_sold: number;
  inventory: number;
}

class SuggestedProductsUpdateService {
  private lookerService: LookerAPIService;
  private lookerQueryId: string;
  private shopifyAdminAPIService: ShopifyAdminAPIService;

  constructor(
    lookerService: LookerAPIService,
    lookerQueryId: string,
    shopifyAdminAPIService: ShopifyAdminAPIService
  ) {
    this.lookerService = lookerService;
    this.lookerQueryId = lookerQueryId;
    this.shopifyAdminAPIService = shopifyAdminAPIService;
  }

  // extract query results from looker service
  // Update Shopify cg3 collection metafields

  private sortDescBy = (
    results: any,
    property: string
  ): PDPDynamicSuggestedProduct[] => {
    // select 10 products with highest sales for each cg3
    const sortedResults = results.sort((a: any, b: any) => {
      return (
        b[`sql_runner_query.${property}`] - a[`sql_runner_query.${property}`]
      );
    });
    return sortedResults;
  };

  private transformResults = (
    results: any
  ): PDPDynamicSuggestedProductsMetafieldValue => {
    // select 10 products with highest sales for each cg3
    // select 10 products with highest inventory for each cg3
    const filteredResults = results.filter((result: any) => {
      return result["sql_runner_query.cg3"] == "Ankle Boots";
    });

    const byItemsSold = this.sortDescBy(filteredResults, "items_sold");
    const formattedByItemsSold = byItemsSold
      .slice(0, 10)
      .map((product: any) => this.formatProductForFrontend(product));

    const byInventory = this.sortDescBy(filteredResults, "inventory");
    const formattedByInventory = byInventory
      .slice(0, 10)
      .map((product: any) => this.formatProductForFrontend(product));

    // return collections pdp.suggested_products metafield value
    return {
      by_items_sold: formattedByItemsSold,
      by_inventory: formattedByInventory,
    };
  };

  private updateCollectionMetafield = async (
    collectionId: string,
    metafieldKey: string,
    metafieldValue: PDPDynamicSuggestedProductsMetafieldValue
  ): Promise<void> => {
    const metafield = {
      key: metafieldKey,
      value: JSON.stringify(metafieldValue),
      value_type: "json_string",
      namespace: "pdp",
    };
    await this.shopifyAdminAPIService.updateMetafield(collectionId, metafield);
  };

  private formatProductForFrontend = (
    product: any
  ): PDPDynamicSuggestedProduct => {
    return {
      handle: product["sql_runner_query.product_name"].toLowerCase(),
      id: product["sql_runner_query.product_id"],
      items_sold: product["sql_runner_query.items_sold"],
      inventory: product["sql_runner_query.inventory"],
    };
  };

  private async executeFlow(): Promise<PDPDynamicSuggestedProductsMetafieldValue> {
    try {
      const results = await this.lookerService.query(this.lookerQueryId);
      const transformedResults = this.transformResults(results);

      // Update Shopify cg3 collection metafields
      // Update Shopify Global cg3 meta

      return transformedResults;
    } catch (error) {
      if (error instanceof LookerServiceError) {
        // Handle the specific error from LookerService if it's defined
        console.error("LookerServiceError:", error.message);
      } else {
        // Handle any other errors
        console.error(
          "An error occurred while executing the flow:",
          error.message
        );
      }
      throw error; // Re-throw the error to be caught and handled by the caller
    }
  }
  async execute(): Promise<PDPDynamicSuggestedProductsMetafieldValue> {
    return await this.executeFlow();
  }
}

export default SuggestedProductsUpdateService;
