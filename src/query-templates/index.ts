export const productDetailsQuery = `
query GetProductDetails($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Product {
      id
      title
      handle
      description
      productType
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            id
            src
            altText
          }
        }
      }
      metafields(namespace: "product", first: 10) {
        edges {
          node {
            key
            value
          }
        }
      }
      metafields(namespace: "filter", first: 10) {
        edges {
          node {
            key
            value
          }
        }
      }
      metafields(namespace: "custom", first: 10) {
        edges {
          node {
            key
            value
          }
        }
      }
      metafields(namespace: "globale_attributes", first: 10) {
        edges {
          node {
            key
            value
          }
        }
      }
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1, sortKey: RELEVANT) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
            metafields(namespace: "filter", first: 10) {
              edges {
                node {
                  key
                  value
                }
              }
            }
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price
            compareAtPrice
            metafields(namespace: "globale_attributes", first: 10) {
              edges {
                node {
                  key
                  value
                }
              }
            }
            inventoryQuantity
          }
        }
      }
    }
  }
}
`;
