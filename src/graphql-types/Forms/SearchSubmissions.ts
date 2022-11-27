import { ArgsType, Field, ObjectType } from "type-graphql";
import { SubmissionTypes } from "@oneblink/types";

import { BaseSearchArgs } from "../BaseSearch";
import { FormSubmissionMetaResult } from "./FormSubmissionMetaResult";

@ArgsType()
export class FormSubmissionHistorySearchParameters extends BaseSearchArgs {
  @Field()
  formId!: number;

  @Field({ nullable: true })
  isValid?: boolean;

  @Field({ nullable: true })
  submissionDateFrom?: string;

  @Field({ nullable: true })
  submissionDateTo?: string;
}

@ObjectType()
export class FormSubmissionHistorySearchResults {
  @Field((type) => [FormSubmissionMetaResult])
  formSubmissionMeta!: SubmissionTypes.FormSubmissionMeta[];
}
