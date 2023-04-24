import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { highPriorityApplicantCreateCandidate } from "./automations/high-priority-applicant-create-candidate";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    let highPriorityApplicantCreateCandidateResponse =
      await highPriorityApplicantCreateCandidate.execute();

    // TODO: Add more automations here
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: {
          highPriorityApplicantCreateCandidate:
            highPriorityApplicantCreateCandidateResponse.length > 0
              ? `${highPriorityApplicantCreateCandidateResponse.length} candidate items created successfully.`
              : "All items up to date.",
        },
      }),
    };
  } catch (error) {
    console.error("Error creating candidate items:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message || "Internal Error",
      }),
    };
  }
};
