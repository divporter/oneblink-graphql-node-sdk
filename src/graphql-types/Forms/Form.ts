import { Field, ObjectType, ID, Int, ArgsType, InputType } from "type-graphql";
import {
  FormTypes,
  SubmissionEventTypes,
  ApprovalTypes,
} from "@oneblink/types";

import { FormServerValidation } from "./FormServerValidation";
import {
  FormWorkFlowEvent,
  FormPaymentEvent,
  SchedulingSubmissionEvent,
} from "../SubmissionEvent";
import { JSONScalar } from "../JSON";
import { ApprovalConfiguration, FormApprovalStep } from "../Approval";
import { NewFormType } from "../../interfaces/NewForm";

@ObjectType()
export class Form implements NewFormType {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field((type) => [JSONScalar])
  elements!: FormTypes.FormElement[];

  @Field((type) => [Int])
  formsAppIds!: number[];

  @Field((type) => ApprovalConfiguration, {
    nullable: true,
    description: "Configuration options that affect the whole approval flow",
  })
  approvalConfiguration?: {
    approveCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
    clarificationRequestCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
    defaultNotificationEmailElementId?: string;
    denyCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
  };

  @Field((type) => [FormWorkFlowEvent], { nullable: true })
  approvalEvents?: SubmissionEventTypes.FormWorkflowEvent[];

  @Field((type) => [FormApprovalStep], { nullable: true })
  approvalSteps?: ApprovalTypes.FormApprovalFlowStep[];

  @Field((type) => String)
  cancelAction!: FormTypes.Form["cancelAction"];

  @Field({ nullable: true })
  cancelRedirectUrl?: string;

  @Field()
  createdAt!: string;

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

  @Field((type) => String)
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

  @Field()
  updatedAt!: string;
}

@ArgsType()
export class CreateFormArgs
  implements Omit<Form, "id" | "createdAt" | "updatedAt">
{
  @Field()
  name!: string;

  @Field((type) => [JSONScalar])
  elements!: FormTypes.FormElement[];

  @Field((type) => [Int])
  formsAppIds!: number[];

  @Field((type) => JSONScalar, { nullable: true })
  approvalConfiguration?: {
    approveCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
    clarificationRequestCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
    defaultNotificationEmailElementId?: string;
    denyCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
  };

  @Field((type) => [JSONScalar], { nullable: true })
  approvalEvents?: SubmissionEventTypes.FormWorkflowEvent[];

  @Field((type) => [JSONScalar], { nullable: true })
  approvalSteps?: ApprovalTypes.FormApprovalFlowStep[];

  @Field((type) => String)
  cancelAction!: FormTypes.Form["cancelAction"];

  @Field({ nullable: true })
  cancelRedirectUrl?: string;

  @Field({ nullable: true })
  description!: string;

  @Field((type) => [JSONScalar], { nullable: true })
  draftEvents?: SubmissionEventTypes.FormWorkflowEvent[];

  @Field((type) => JSONScalar, { nullable: true })
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

  @Field((type) => [JSONScalar], { nullable: true })
  paymentEvents?: SubmissionEventTypes.FormPaymentEvent[];

  @Field((type) => String)
  postSubmissionAction!: FormTypes.Form["postSubmissionAction"];

  @Field({ nullable: true })
  publishEndDate?: string;

  @Field({ nullable: true })
  publishStartDate?: string;

  @Field({ nullable: true })
  redirectUrl?: string;

  @Field((type) => [JSONScalar], { nullable: true })
  schedulingEvents?: SubmissionEventTypes.FormSchedulingEvent[];

  @Field((type) => JSONScalar, { nullable: true })
  serverValidation?: FormTypes.FormServerValidation & {};

  @Field((type) => [JSONScalar])
  submissionEvents!: SubmissionEventTypes.FormWorkflowEvent[];

  @Field((type) => [String])
  tags!: string[];
}

@InputType()
export class UpdateFormArgs extends CreateFormArgs implements Form {
  @Field()
  id!: number;

  @Field()
  createdAt!: string;

  @Field()
  updatedAt!: string;
}
