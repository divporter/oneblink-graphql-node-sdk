import { FormTypes } from "@oneblink/types";
import { Field, ObjectType, ClassType } from "type-graphql";
import { JSONScalar } from "../JSON";
import { ConditionalPredicate } from "../Condition";

@ObjectType()
export class _FormElementBase {
  @Field({
    description: "The unique identifier for an individual form element",
  })
  id!: string;

  @Field({ nullable: true })
  isNew?: boolean;

  @Field({
    description:
      "Determine if the element is conditionally shown (true) or not (false).",
  })
  conditionallyShow!: boolean;

  @Field({
    nullable: true,
    description:
      "Determine if the predicates must all match (`true`) or if only one needs to match (false) for the element to shown.",
  })
  requiresAllConditionallyShowPredicates?: boolean;

  @Field((type) => [ConditionalPredicate], {
    nullable: true,
    description: "Predicates to evaluate.",
  })
  conditionallyShowPredicates?: FormTypes.FormElement["conditionallyShowPredicates"];

  @Field((type) => [String], {
    nullable: true,
    description:
      "Custom Css classes that will be added to the element during rendering",
  })
  customCssClasses?: string[];

  @Field({
    nullable: true,
    description:
      "JSON metadata associated with the form element. This field is for primarily for developer use.",
  })
  meta?: string;
}

export function _NestedElementsMixin<TClassType extends ClassType>(
  Base: TClassType
) {
  @ObjectType()
  class _NestedElementsElement extends Base {
    @Field((type) => [JSONScalar])
    elements!: FormTypes.FormElement[];
  }
  return _NestedElementsElement;
}
