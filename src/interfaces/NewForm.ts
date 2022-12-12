import { InterfaceType, Field, Int } from "type-graphql";
import {
  FormTypes,
  SubmissionEventTypes,
  ApprovalTypes,
} from "@oneblink/types";

import { FormServerValidation } from "../graphql-types/Forms/FormServerValidation";
import {
  FormPaymentEvent,
  FormWorkFlowEvent,
  SchedulingSubmissionEvent,
} from "../graphql-types/SubmissionEvent";
import {
  ApprovalConfiguration,
  FormApprovalStep,
} from "../graphql-types/Approval";
import { JSONScalar } from "../graphql-types/JSON";

@InterfaceType()
export abstract class NewFormType {
  @Field()
  name!: string;

  @Field((type) => [JSONScalar])
  elements!: FormTypes.FormElement[];

  @Field((type) => [Int])
  formsAppIds!: number[];

  //TODO go deeper on the types
  @Field((type) => ApprovalConfiguration, { nullable: true })
  approvalConfiguration?: {
    approveCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
    clarificationRequestCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
    defaultNotificationEmailElementId?: string;
    denyCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
  };

  @Field((type) => [FormWorkFlowEvent], { nullable: true })
  approvalEvents?: SubmissionEventTypes.FormWorkflowEvent[];

  //TODO go deeper on the types
  @Field((type) => [FormApprovalStep], { nullable: true })
  approvalSteps?: ApprovalTypes.FormApprovalFlowStep[];

  @Field()
  cancelAction!: FormTypes.Form["cancelAction"];

  @Field({ nullable: true })
  cancelRedirectUrl?: string;

  @Field({ nullable: true })
  description!: string;

  @Field((type) => [FormWorkFlowEvent], { nullable: true })
  draftEvents?: SubmissionEventTypes.FormWorkflowEvent[];

  @Field((type) => FormServerValidation, { nullable: true })
  externalIdGeneration?: FormTypes.FormServerValidation & {};

  @Field()
  formsAppEnvironmentId!: number;

  @Field()
  isAuthenticated!: boolean;

  @Field()
  isInfoPage!: boolean;

  @Field()
  isMultiPage!: boolean;

  @Field()
  organisationId!: string;

  @Field((type) => [FormPaymentEvent], { nullable: true })
  paymentEvents?: SubmissionEventTypes.FormPaymentEvent[];

  @Field()
  postSubmissionAction!: FormTypes.Form["postSubmissionAction"];

  @Field({ nullable: true })
  publishEndDate?: string;

  @Field({ nullable: true })
  publishStartDate?: string;

  @Field({ nullable: true })
  redirectUrl?: string;

  @Field((type) => [SchedulingSubmissionEvent], { nullable: true })
  schedulingEvents?: SubmissionEventTypes.FormSchedulingEvent[];

  @Field((type) => FormServerValidation, { nullable: true })
  serverValidation?: FormTypes.FormServerValidation & {};

  @Field((type) => [FormWorkFlowEvent])
  submissionEvents!: SubmissionEventTypes.FormWorkflowEvent[];

  @Field((type) => [String])
  tags!: string[];
}
