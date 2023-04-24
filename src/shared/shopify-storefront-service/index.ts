import ShopifyStorefrontService from "./ShopifyStorefrontAPIService";
const shopifyStorefrontService = new ShopifyStorefrontService(
  process.env.STOREFRONT_ACCESS_TOKEN || ""
);
export default shopifyStorefrontService;
