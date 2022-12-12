import {
  Resolver,
  Arg,
  Query,
  Mutation,
  ObjectType,
  Field,
} from "type-graphql";
import { Forms } from "@oneblink/sdk";
import { FormTypes } from "@oneblink/types";
import { JSONScalar } from "../graphql-types/JSON";
import { Form } from "../graphql-types/Forms/Form";
import { PageElement } from "../graphql-types/Forms/PageElement";
import { FormEvent } from "../graphql-types/SubmissionEvent";
import { FormServerValidation } from "../graphql-types/Forms/FormServerValidation";
import { ConditionalPredicate } from "../graphql-types/Condition";

@ObjectType()
class FormElement {
  @Field((type) => JSONScalar)
  element!: Record<string, unknown>;
}

@ObjectType()
class TokenObj {
  @Field({ description: "The encrypted representation of the username" })
  token!: string;
}

@ObjectType()
class UsernameObj {
  @Field({ description: "The decrypted username" })
  username!: string;
}

@Resolver()
export class StaticFormsResolver {
  @Query((returns) => UsernameObj, {
    description:
      "A static method available on the forms class for decrypting a user token. This token is passed to OneBlink webhooks in the userToken property.",
  })
  decryptUserToken(
    @Arg("secret") secret: string,
    @Arg("userToken") userToken: string
  ) {
    return { username: Forms.decryptUserToken({ userToken, secret }) };
  }

  @Query((returns) => TokenObj, {
    description:
      "A static method available on the forms class for securely encrypting a user identifier (e.g. email address) when the OneBlink API is being called with a FaaS key and not a user JWT. This is automatically done for the user in generateFormUrl() by passing the username and secret options.",
  })
  encryptUserToken(
    @Arg("secret") secret: string,
    @Arg("username") username: string
  ) {
    return { token: Forms.encryptUserToken({ username, secret }) };
  }

  @Mutation((returns) => FormElement, {
    description:
      "A static method available on the forms class, used for both creating and validating a OneBlink Form Element.\n\nThe method will set reasonable defaults for any values not passed to it, and validate ones that are against our Element Schema.",
  })
  generateFormElement(
    @Arg("formElementGenerationData", (type) => JSONScalar)
    formElementGenerationData: Record<string, unknown>
  ) {
    return {
      element: Forms.generateFormElement(formElementGenerationData),
    };
  }

  @Mutation((returns) => PageElement, {
    description:
      "A static method available on the forms class, used for both creating and validating a OneBlink Page Element.\n\nThe method will set reasonable defaults for any values not passed to it, and validate ones that are against our Element Schema.",
  })
  generatePageElement(
    @Arg("formElementGenerationData", (type) => JSONScalar)
    formElementGenerationData: Record<string, unknown>
  ) {
    return Forms.generatePageElement(formElementGenerationData);
  }

  @Query((returns) => FormServerValidation, {
    description:
      "A static method available on the forms class, used for validating a api request configuration.",
  })
  validateApiRequest(
    @Arg("apiRequest", (type) => JSONScalar) apiRequest: unknown
  ) {
    return Forms.validateApiRequest(apiRequest);
  }

  @Query((returns) => [ConditionalPredicate], {
    description:
      "A static method available on the forms class, used for validating an array of Conditional Predicates found on form elements or submission events.",
  })
  validateConditionalPredicates(
    @Arg("predicates", (type) => [JSONScalar]) predicates: unknown[]
  ) {
    return Forms.validateConditionalPredicates(predicates);
  }

  @Query((returns) => Form, {
    description:
      "A static method available on the forms class, used for validating a OneBlink compatible Forms Definition.",
  })
  validateForm(
    @Arg("form", (type) => JSONScalar)
    form: unknown
  ) {
    return Forms.validateForm(form);
  }

  @Query((returns) => FormEvent, {
    description:
      "A static method available on the forms class, used for validating a OneBlink Form Event.",
  })
  validateFormEvent(
    @Arg("formElements", (type) => [JSONScalar])
    formElements: FormTypes.FormElement[],
    @Arg("data", (type) => JSONScalar) data: unknown
  ) {
    return Forms.validateFormEvent(formElements, data);
  }
}
