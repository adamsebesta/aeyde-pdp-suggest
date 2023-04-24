terraform {
  cloud {
    organization = "adamsebesta"

    workspaces {
      name = "pdp-dynamic-suggested-products"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  assume_role {
    role_arn = "arn:aws:iam::262863902191:role/TerraformExecutionRole"
  }
}

data "aws_region" "current" {}

provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
  assume_role {
    role_arn = "arn:aws:iam::262863902191:role/TerraformExecutionRole"
  }
}

