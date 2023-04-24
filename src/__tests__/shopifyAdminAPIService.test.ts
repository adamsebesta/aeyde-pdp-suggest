import shopifyAdminAPIService from "../shared/shopify-admin-api-service";
import { ShopifyAdminAPIService } from "../shared/shopify-admin-api-service/ShopifyAdminAPIService";

// test Admin service
test("Should import an instance of shopifyAdminAPIService", () => {
  expect(shopifyAdminAPIService).toBeInstanceOf(ShopifyAdminAPIService);
});

// test getMetafield function
test("Should return a metafield value", async () => {
  const metafield = await shopifyAdminAPIService.getMetafieldValue(
    "137904095299",
    "pdp",
    "dynamic_suggested_products"
  );
  expect(metafield).toBeInstanceOf(Object);
});

// test getMetafield function
test("Should return a metafield value", async () => {
  const metafield = await shopifyAdminAPIService.getMetafield();
  expect(metafield).toBeInstanceOf(Object);
});
