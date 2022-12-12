import { createUnionType, Field, ObjectType } from "type-graphql";
import {
  ApprovalTypes,
  MiscTypes,
  SubmissionTypes,
  SchedulingTypes,
} from "@oneblink/types";

import { FormApprovalFlowInstance, FormSubmissionApproval } from "../Approval";
import {
  FormPaymentEvent,
  SchedulingSubmissionEvent,
  FormWorkFlowEvent,
} from "../SubmissionEvent";
import { UserProfileType } from "../UserProfile";

@ObjectType()
class Key {
  @Field()
  id!: string;

  @Field()
  name!: string;
}

@ObjectType()
class ValidationResultInvalid {
  @Field((type) => Boolean)
  isInvalid!: true;

  @Field()
  error!: string;
}

@ObjectType()
class ValidationResultValid {
  @Field((type) => Boolean)
  isInvalid!: false;
}

const ValidationResult = createUnionType({
  name: "ValidationResult",
  types: () => [ValidationResultInvalid, ValidationResultValid] as const,
  resolveType: (value) => {
    if (value.isInvalid) {
      return ValidationResultValid;
    }
    if (!value.isInvalid) {
      return ValidationResultInvalid;
    }
    return undefined;
  },
});

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

  @Field((type) => ValidationResult, { nullable: true })
  validationResult?: SubmissionTypes.FormSubmissionMeta["validationResult"];
}

@ObjectType()
export class FormSubmissionMetaResult {
  @Field((type) => FormApprovalFlowInstance, { nullable: true })
  formApprovalFlowInstance?: ApprovalTypes.FormApprovalFlowInstance & {};

  @Field((type) => [FormSubmissionApproval], { nullable: true })
  formSubmissionApprovals?: ApprovalTypes.FormSubmissionApproval[];

  @Field((type) => FormSubmissionMeta, { nullable: true })
  formSubmissionMeta?: SubmissionTypes.FormSubmissionMeta & {};

  @Field((type) => [FormPaymentEvent], { nullable: true })
  formSubmissionPayments?: SubmissionTypes.FormSubmissionPayment[];

  @Field((type) => SchedulingSubmissionEvent, { nullable: true })
  formSubmissionSchedulingBooking?: SchedulingTypes.SchedulingBooking & {};

  @Field((type) => [FormWorkFlowEvent], { nullable: true })
  formSubmissionWorkflowEvents?: SubmissionTypes.FormSubmissionWorkflowEvent[];
}
