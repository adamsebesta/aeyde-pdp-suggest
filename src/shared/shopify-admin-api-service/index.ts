import { ShopifyAdminAPIService } from "./ShopifyAdminAPIService";
const shopifyAdminAPIService = new ShopifyAdminAPIService(
  process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || ""
);
export default shopifyAdminAPIService;
