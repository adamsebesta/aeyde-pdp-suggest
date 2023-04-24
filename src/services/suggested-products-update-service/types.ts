export interface ApplicantItemQueryResult {
  id: string;
  properties: CandidateItemProps;
  url: string;
}

export interface CandidateItemProps {
  Candidate: {
    title: Array<{
      text: {
        content: string;
      };
    }>;
  };
  "Position Applied": {
    select: {
      name: string;
      color?: string;
    };
  };
  Applicant: {
    relation: [
      {
        id: string;
      }
    ];
  };
  Assigned: {
    people: [
      {
        id: string;
      }
    ];
  };
  [key: string]: any;
}
export interface CandidateUpdateProps {
  "data-slack-notification-1": {
    checkbox: boolean;
  };
}

export interface ApplicantUpdateProps {
  "data-candidate-item-created": {
    checkbox: boolean;
  };
}

export interface NewCandidateVariables {
  name: string;
  position: string;
  profileUrl: string;
  priority: string;
  assigneeId: string;
  interviewerCalendlyLink: string;
}
