import lookerAPIService from "../../shared/looker-api-service";
import dynamoDBService from "../../shared/dynamo-db-service";
import shopifyAdminService from "../../shared/shopify-admin-api-service";
import SuggestedProductsUpdateService from "./SuggestedProductsUpdateService";

const suggestedProductsUpdateService = new SuggestedProductsUpdateService(
  lookerAPIService,
  process.env.LOOKER_QUERY_ID || "",
  shopifyAdminService
);

export default suggestedProductsUpdateService;
