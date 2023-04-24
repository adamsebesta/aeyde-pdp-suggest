//
import suggestedProductsUpdateService from "../services/suggested-products-update-service";
import SuggestedProductsUpdateService from "../services/suggested-products-update-service/SuggestedProductsUpdateService";
test("Should import an instance of SuggestedProductsService", () => {
  expect(suggestedProductsUpdateService).toBeInstanceOf(
    SuggestedProductsUpdateService
  );
});

test("Should return 10 suggested products sorted by items_sold", async () => {
  const results = await suggestedProductsUpdateService.execute();
  expect(results).toBeInstanceOf(Object);
  if (results) {
    expect(results.by_items_sold.length).toBe(10);
  }
});
