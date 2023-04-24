import { LookerNodeSDK } from "@looker/sdk-node";

// Define the LookerServiceError class
class LookerServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LookerServiceError";
  }
}

interface LookerQueryResult {
  "sql_runner_query.cg3": string;
  "sql_runner_query.config_sku": string;
  "sql_runner_query.product_name": string;
  "sql_runner_query.product_id": number;
  "sql_runner_query.items_sold": number;
  "sql_runner_query.inventory": number;
}

export class LookerAPIService {
  // LOOKERSDK_CLIENT_ID, LOOKERSDK_CLIENT_SECRET, LOOKERSDK_BASE_URL must be set in environment variables
  private sdk = LookerNodeSDK.init40();
  constructor() {
    this.sdk = LookerNodeSDK.init40();
  }
  public query = async (queryId: string) => {
    try {
      const queryResult = await this.sdk.ok(
        this.sdk.run_query({ query_id: queryId, result_format: "json" })
      );
      // const data = queryResult.map((jsonString) => JSON.parse(jsonString));
      return queryResult;
    } catch (error: any) {
      console.error("Error running Looker query:", error);
      // Throw an instance of LookerServiceError with a relevant message
      throw new LookerServiceError(
        `Error running Looker query: ${error.message}`
      );
    }
  };
}

export default LookerAPIService;
