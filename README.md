# Lambda Daily Cron Job for Looker API and Shopify Collection Update

This repository contains the code for a Lambda function that runs daily to query the Looker API, retrieve custom query results, transform the data, and update Shopify collection metaobjects. These metaobjects are used by the front-end product pages to generate the 'suggested-products' section.

## Project Overview

The goal of this project is to create an automated process that updates the 'suggested-products' section on Shopify product pages. The first three items in this section are randomly selected from a list of recent top sellers from the same collection, while the final item is a product from the same collection with the highest inventory.

## How it Works

The Lambda Daily Cron Job will be built using the following technologies:

- AWS Lambda: AWS Lambda will be used to run a function daily that queries the Looker API to retrieve custom query results.

- Looker API: Looker API will be used to fetch custom query results based on top sellers and inventory data.

- Shopify API: Shopify API will be used to update the collection metaobjects, which the front-end product pages use to generate the 'suggested-products' section.
