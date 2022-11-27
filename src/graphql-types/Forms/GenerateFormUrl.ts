import { Field, ArgsType, ObjectType } from "type-graphql";
import { JSONScalar } from "../JSON";

@ArgsType()
export class GenerateFormUrlParams {
  @Field({ nullable: true })
  expiryInSeconds?: number;

  @Field({ nullable: true })
  externalId?: string;

  @Field()
  formId!: number;

  @Field({ nullable: true })
  formsAppId?: number;

  @Field((type) => JSONScalar, { nullable: true })
  preFillData?: Record<string, unknown>;

  @Field({ nullable: true })
  previousFormSubmissionApprovalId?: string;

  @Field({ nullable: true })
  secret?: string;

  @Field({ nullable: true })
  username?: string;
}

@ObjectType()
export class GenerateFormUrlResponse {
  @Field()
  expiry!: string;

  @Field()
  formUrl!: string;
}
