import { Field, ObjectType } from "type-graphql";
import {
  ApprovalTypes,
  MiscTypes,
  SubmissionTypes,
  SchedulingTypes,
} from "@oneblink/types";

import { JSONScalar } from "../JSON";
import { UserProfileType } from "../UserProfile";

@ObjectType()
class Key {
  @Field()
  id!: string;

  @Field()
  name!: string;
}

@ObjectType()
class FormSubmissionMeta {
  @Field()
  dateTimeSubmitted!: string;

  @Field({ nullable: true })
  externalId?: string;

  @Field()
  formsAppId!: number;

  @Field()
  formId!: number;

  @Field({ nullable: true })
  formName?: string;

  @Field({ nullable: true })
  jobId?: string;

  @Field((type) => Key, { nullable: true })
  key?: { id: string; name: string };

  @Field()
  submissionId!: string;

  @Field((type) => UserProfileType, { nullable: true })
  user?: MiscTypes.UserProfile & {};

  @Field((type) => JSONScalar)
  validationResult?: SubmissionTypes.FormSubmissionMeta["validationResult"];
}

@ObjectType()
export class FormSubmissionMetaResult {
  //TODO go deeper
  @Field((type) => JSONScalar, { nullable: true })
  formApprovalFlowInstance?: ApprovalTypes.FormApprovalFlowInstance & {};

  @Field((type) => [JSONScalar], { nullable: true })
  formSubmissionApprovals?: ApprovalTypes.FormSubmissionApproval[];

  @Field((type) => FormSubmissionMeta, { nullable: true })
  formSubmissionMeta?: SubmissionTypes.FormSubmissionMeta & {};

  @Field((type) => [JSONScalar], { nullable: true })
  formSubmissionPayments?: SubmissionTypes.FormSubmissionPayment[];

  @Field((type) => JSONScalar, { nullable: true })
  formSubmissionSchedulingBooking?: SchedulingTypes.SchedulingBooking & {};

  @Field((type) => [JSONScalar], { nullable: true })
  formSubmissionWorkflowEvents?: SubmissionTypes.FormSubmissionWorkflowEvent[];
}
