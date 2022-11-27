import { ArgsType, Field, InputType } from "type-graphql";

@InputType()
class EmbeddedForms {
  @Field()
  sourceElementId!: string;

  @Field()
  targetFormId!: number;
}

@ArgsType()
export class FormMigrationData {
  @Field()
  approvalSteps!: boolean;

  @Field()
  elements!: boolean;

  @Field((type) => [EmbeddedForms], { nullable: true })
  embeddedForms?: Array<{ sourceElementId: string; targetFormId: number }>;

  @Field()
  externalIdGeneration!: boolean;

  @Field()
  formsAppEnvironmentId!: number;

  @Field()
  postSubmissionAction!: boolean;

  @Field()
  serverValidation!: boolean;

  @Field()
  sourceFormId!: number;

  @Field()
  submissionEvents!: boolean;

  @Field()
  tags!: boolean;

  @Field()
  targetFormId?: number;
}
