import lookerAPIService from "../shared/looker-api-service";
import LookerAPIService from "../shared/looker-api-service/LookerAPIService";

// test looker service
test("Should import an instance of LookerAPIService", () => {
  expect(lookerAPIService).toBeInstanceOf(LookerAPIService);
});

// test query function
test("Should return a query result", async () => {
  const queryId = "192639";
  const queryResult = await lookerAPIService.query(queryId);
  const expectedShape = {
    "sql_runner_query.cg3": expect.any(String),
    "sql_runner_query.config_sku": expect.any(String),
    "sql_runner_query.product_name": expect.any(String),
    "sql_runner_query.product_id": expect.any(Number),
    "sql_runner_query.items_sold": expect.any(Number),
    "sql_runner_query.inventory": expect.any(Number),
  };

  expect(queryResult).toBeInstanceOf(Array);
  if (queryResult) {
    expect(queryResult[0]).toEqual(expectedShape);
  }
});
