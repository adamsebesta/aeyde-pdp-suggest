# Internal ATS System Recreation Project

This repository contains the code for an internal project aimed at recreating the functionality of an Applicant Tracking System (ATS) using AWS Lambda, Notion API, and Slack SDK.

## Project Overview

The goal of this project is to create an internal tool that allows us to manage the hiring process more efficiently. We will be using AWS Lambda to run a function at a specified interval (every 15 minutes) that queries the Notion API to confirm if any candidates meet the notification conditions. If a candidate meets the conditions, the function will utilize the Slack SDK to send personalized messages to a designated channel.

## How it Works

The ATS system will be built using the following technologies:

- AWS Lambda: AWS Lambda will be used to run a function at a specified interval. This function will be responsible for querying the Notion API to check if any candidates meet the notification conditions.

- Notion API: Notion API will be used to store candidate data, including resumes, cover letters, and job applications.

- Slack SDK: Slack SDK will be used to send notifications to a designated channel if a candidate meets the notification conditions.

## Setup

To use this internal ATS system, you will need to:

1. Clone this repository to your local machine.
2. Set up an AWS account and create a new Lambda function.
3. Set up a Notion account and obtain an API key.
4. Create a new Slack app and obtain a bot token.
5. Configure the Lambda function with the necessary environment variables (Notion API key, Slack bot token, Slack channel).
6. Upload the code to the Lambda function and test it out!

## How to Contribute

If you are interested in contributing to this project, please feel free to open an issue or pull request. Contributions are always welcome!

## License

This project is licensed under the [MIT License](LICENSE).
