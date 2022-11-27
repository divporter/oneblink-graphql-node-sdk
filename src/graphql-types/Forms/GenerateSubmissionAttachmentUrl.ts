import { Field, ArgsType, ObjectType } from "type-graphql";

@ArgsType()
export class GenerateSubmissionAttachmentUrlParams {
  @Field()
  formId!: number;

  @Field()
  attachmentId!: number;

  @Field()
  expiryInSeconds!: number;
}

@ObjectType()
export class GenerateSubmissionAttachmentUrlResponse {
  @Field()
  url!: string;
}
