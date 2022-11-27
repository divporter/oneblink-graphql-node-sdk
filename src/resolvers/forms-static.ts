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
  @Field()
  token!: string;
}

@Resolver()
export class StaticFormsResolver {
  @Query((returns) => TokenObj)
  decryptUserToken(
    @Arg("secret") secret: string,
    @Arg("userToken") userToken: string
  ) {
    return { token: Forms.decryptUserToken({ userToken, secret }) };
  }

  @Query((returns) => TokenObj)
  encryptUserToken(
    @Arg("secret") secret: string,
    @Arg("username") username: string
  ) {
    return { token: Forms.encryptUserToken({ username, secret }) };
  }

  @Mutation((returns) => FormElement)
  generateFormElement(
    @Arg("formElementGenerationData", (type) => JSONScalar)
    formElementGenerationData: Record<string, unknown>
  ) {
    return {
      element: Forms.generateFormElement(formElementGenerationData),
    };
  }

  @Mutation((returns) => PageElement)
  generatePageElement(
    @Arg("formElementGenerationData", (type) => JSONScalar)
    formElementGenerationData: Record<string, unknown>
  ) {
    return Forms.generatePageElement(formElementGenerationData);
  }

  @Query((returns) => FormServerValidation)
  validateApiRequest(
    @Arg("apiRequest", (type) => JSONScalar) apiRequest: unknown
  ) {
    return Forms.validateApiRequest(apiRequest);
  }

  @Query((returns) => [ConditionalPredicate])
  validateConditionalPredicates(
    @Arg("predicates", (type) => [JSONScalar]) predicates: unknown[]
  ) {
    return Forms.validateConditionalPredicates(predicates);
  }

  @Query((returns) => Form)
  validateForm(
    @Arg("form", (type) => JSONScalar)
    form: unknown
  ) {
    return Forms.validateForm(form);
  }

  @Query((returns) => FormEvent)
  validateFormEvent(
    @Arg("formElements", (type) => [JSONScalar])
    formElements: FormTypes.FormElement[],
    @Arg("data", (type) => JSONScalar) data: unknown
  ) {
    return Forms.validateFormEvent(formElements, data);
  }
}
