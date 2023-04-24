import shopifyStorefrontService from "../../shared/shopify-storefront-service";
import SuggestedProductsService from "./SuggestedProductsService";

const suggestedProductsService = new SuggestedProductsService(
  shopifyStorefrontService
);

export { suggestedProductsService };
