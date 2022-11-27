import { Field, ObjectType, ClassType } from "type-graphql";
import { _NestedElementsMixin, _FormElementBase } from "./FormElement";

@ObjectType()
export class PageElement extends _NestedElementsMixin(_FormElementBase) {
  @Field()
  label!: string;

  @Field()
  type!: string;
}
