import { Field, ObjectType } from "type-graphql";
import { ApprovalTypes, ConditionTypes, MiscTypes } from "@oneblink/types";
import { GraphQLID } from "graphql";
import { ConditionalPredicate } from "./Condition";
import { UserProfileType } from "./UserProfile";

@ObjectType()
class FormApprovalCannedResponse {
  @Field({
    description: "The unique key for the response to allow for reporting",
  })
  key!: string;

  @Field({ description: "The human readable text to represent the response" })
  label!: string;

  @Field({
    description:
      "The text to prefill as the notes for an approval (should respect line breaks)",
  })
  notes!: string;
}

@ObjectType()
export class ApprovalConfiguration {
  @Field((type) => [FormApprovalCannedResponse], { nullable: true })
  approveCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];

  @Field((type) => [FormApprovalCannedResponse], { nullable: true })
  clarificationRequestCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];

  @Field({ nullable: true })
  defaultNotificationEmailElementId?: string;

  @Field((type) => [FormApprovalCannedResponse], { nullable: true })
  denyCannedResponses?: ApprovalTypes.FormApprovalCannedResponse[];
}

@ObjectType()
class FormApprovalFlowStepBase {
  @Field({
    description: "The group that will be assigned an approval for this step",
  })
  group!: string;

  @Field({
    description: "The unique label for the step",
  })
  label!: string;

  @Field({
    nullable: true,
    description: "The id of a form that should be submitted with approval",
  })
  approvalFormId?: number;

  @Field({
    nullable: true,
    description:
      "The id of an email template to use for clarification request emails",
  })
  clarificationRequestEmailTemplateId?: number;
}

@ObjectType()
export class FormApprovalStep extends FormApprovalFlowStepBase {
  @Field({
    nullable: true,
    description: "Indicates if step could be conditionally skipped",
  })
  isConditional?: boolean;

  @Field({
    nullable: true,
    description:
      "Indicates if all predicates need to met to determine if the step is skipped",
  })
  requiresAllConditionalPredicates?: boolean;

  @Field((type) => [ConditionalPredicate], {
    nullable: true,
    description: "The predicates to determine if the step is skipped",
  })
  conditionalPredicates?: ConditionTypes.ConditionalPredicate[];
}

@ObjectType()
class FormApprovalFlowInstanceStep extends FormApprovalFlowStepBase {
  @Field({ description: "Indicates if step has been skipped" })
  isSkipped!: boolean;
}

@ObjectType()
class NewFormApprovalFlowInstance {
  @Field({
    description:
      "The unique identifier for the form that was submitted for approval",
  })
  formId!: number;

  @Field({
    description:
      "The unique identifier for the Approvals Forms App associated with the approval",
  })
  submissionId!: string;

  @Field({
    description:
      "The unique identifier for the Approvals Forms App associated with the approval",
  })
  approvalsFormsAppId!: number;

  @Field({
    nullable: true,
    description:
      "The unique identifier for the previous FormSubmissionApproval that lead to this approval flow",
  })
  previousFormSubmissionApprovalId?: string;

  @Field((type) => [FormApprovalFlowInstanceStep], {
    description: "An array of the FormApprovalFlowInstanceSteps",
  })
  steps!: ApprovalTypes.FormApprovalFlowInstanceStep[];

  @Field({
    description:
      "Indicates if the instance is the latest for single submission after clarification requests",
  })
  isLatest!: boolean;

  @Field((type) => String, { description: "The status of the approval" })
  status!: ApprovalTypes.NewFormApprovalFlowInstance["status"];
}

@ObjectType()
export class FormApprovalFlowInstance extends NewFormApprovalFlowInstance {
  @Field({ description: "The unique identifier for the record" })
  id!: number;

  @Field({
    description:
      "The date and time (in ISO format) the approval was last updated",
  })
  updatedAt!: string;

  @Field({
    description: "The date and time (in ISO format) the approval was created",
  })
  createdAt!: string;

  @Field({
    description: "The username of the user that last updated the approval",
  })
  lastUpdatedBy?: string;
}

@ObjectType()
class NewFormSubmissionApprovalNote {
  @Field({ description: "The note text" })
  note!: string;
}

@ObjectType()
class FormSubmissionApprovalNote extends NewFormSubmissionApprovalNote {
  @Field({ description: "The unique identifier for the record" })
  id!: string;

  @Field({
    description: "The date and time (in ISO format) the note was created",
  })
  createdAt!: string;

  @Field((type) => UserProfileType, {
    description: "The user that created the note",
  })
  createdBy!: MiscTypes.UserProfile & {};

  @Field({
    description: "The date and time (in ISO format) the note was last updated",
  })
  updatedAt!: string;

  @Field((type) => UserProfileType, {
    description: "The user that last updated the note",
  })
  lastUpdatedBy!: MiscTypes.UserProfile & {};
}

@ObjectType()
class BaseFormSubmissionApproval {
  @Field({ description: "The group assigned to the approval" })
  group!: string;

  @Field((type) => [String], {
    nullable: true,
    description:
      "The email addresses of the users to be notified of the result",
  })
  notificationEmailAddress?: string[];

  @Field({
    nullable: true,
    description:
      "The unique identifier for the FormApprovalFlowInstance of this approval flow",
  })
  formApprovalFlowInstanceId!: number;

  @Field({ description: "The unique label for the step" })
  stepLabel!: string;

  @Field({
    nullable: true,
    description: "Notes sent to the use that submitted the form",
  })
  notes?: string;

  @Field({
    nullable: true,
    description:
      "Key to associate a canned response with an approval to allow for reporting",
  })
  cannedResponseKey?: string;

  @Field({
    nullable: true,
    description:
      "Internal notes that are not seen by the user that submitted the form",
  })
  internalNotes?: string;

  @Field({
    nullable: true,
    description: "The username of the user that updated the approval",
  })
  updatedBy?: string;

  @Field({
    nullable: true,
    description: "The id of a form that should be submitted with approval",
  })
  approvalFormId?: number;

  // @Field((type) => [FormSubmissionApprovalNote], {
  //   nullable: true,
  // })
  // additionalNotes?: ApprovalTypes.FormSubmissionApprovalNote[];
}

@ObjectType()
class NewFormSubmissionApproval extends BaseFormSubmissionApproval {
  @Field((type) => String, { description: "The status of the approval" })
  status!: "PENDING" | "CLARIFICATION_REQUIRED";
}

@ObjectType()
export class FormSubmissionApproval extends BaseFormSubmissionApproval {
  @Field((type) => GraphQLID, {
    description: "The unique identifier for the record",
  })
  id!: string;

  @Field((type) => String, {
    description: "The status of the approval",
  })
  status!: "PENDING" | "APPROVED" | "CLARIFICATION_REQUIRED" | "CLOSED";

  @Field((type) => GraphQLID, {
    description: "The id of a submission that was submitted with approval",
  })
  approvalFormSubmissionId?: string;

  @Field({
    description: "The date and time (in ISO format) the approval was created",
  })
  createdAt!: string;

  @Field({
    description:
      "The date and time (in ISO format) the approval was last updated",
  })
  updatedAt!: string;
}
