data "archive_file" "zipit" {
  type        = "zip"
  source_file = "./dist/index.js"
  output_path = "index.zip"
}

resource "aws_lambda_function" "cron_lambda" {
  function_name    = var.lamda_function_name
  handler          = "index.handler"
  runtime          = "nodejs16.x"
  role             = aws_iam_role.lambda_exec.arn
  filename         = "index.zip" # Replace with the filename of your Lambda function code
  source_code_hash = data.archive_file.zipit.output_base64sha256
  timeout          = 60


  environment {
    variables = {

      LOOKERSDK_CLIENT_ID= var.LOOKERSDK_CLIENT_ID
LOOKERSDK_CLIENT_SECRET= var.LOOKERSDK_CLIENT_SECRET
LOOKERSDK_BASE_URL= var.LOOKERSDK_BASE_URL
LOOKER_QUERY_ID= var.LOOKER_QUERY_ID
SHOPIFY_ADMIN_ACCESS_TOKEN= var.SHOPIFY_ADMIN_ACCESS_TOKEN
SHOPIFY_STOREFRONT_ACCESS_TOKEN= var.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  }
  tags = {
    track = "pdp-dynamic-suggested-products"
  }
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          "AWS" : "arn:aws:iam::262863902191:user/terraform"
        }
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "lambda_exec" {
  name       = "lambda_exec"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  roles      = [aws_iam_role.lambda_exec.name]
}

resource "aws_cloudwatch_event_rule" "cron_rule" {
  name        = "hr_system_cron_rule"
  description = "Runs pdp-dynamic-suggested-products-cron every minute"

  schedule_expression = "cron(1 * * * ? *)"

  tags = {
    Environment = "production"
    track       = "pdp-dynamic-suggested-products"
  }
}

resource "aws_cloudwatch_event_target" "cron_target" {
  rule      = aws_cloudwatch_event_rule.cron_rule.name
  arn       = aws_lambda_function.cron_lambda.arn
  target_id = "cron_target"
}
