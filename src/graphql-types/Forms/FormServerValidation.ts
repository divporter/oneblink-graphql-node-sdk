import { Field, ObjectType, createUnionType } from "type-graphql";

@ObjectType()
class FormServerValidationCallbackConfiguration {
  @Field()
  url!: string;
}

@ObjectType()
class FormServerValidationCallback {
  @Field()
  type!: "CALLBACK";

  @Field((type) => FormServerValidationCallbackConfiguration)
  configuration!: { url: string };
}

@ObjectType()
class FormServerValidationOneBlinkAPIConfiguration {
  @Field()
  apiEnvironment!: string;

  @Field()
  apiEnvironmentRoute!: string;

  @Field()
  apiId!: string;
}

@ObjectType()
class FormServerValidationOneBlinkAPI {
  @Field()
  type!: "ONEBLINK_API";

  @Field((type) => FormServerValidationOneBlinkAPIConfiguration)
  configuration!: {
    apiEnvironment: string;
    apiEnvironmentRoute: string;
    apiId: string;
  };
}

export const FormServerValidation = createUnionType({
  name: "FormServerValidation",
  types: () =>
    [FormServerValidationCallback, FormServerValidationOneBlinkAPI] as const,
  resolveType: (value) => {
    if (value.type === "CALLBACK") {
      return FormServerValidationCallback;
    }
    if (value.type === "ONEBLINK_API") {
      return FormServerValidationOneBlinkAPI;
    }
    return undefined;
  },
});
