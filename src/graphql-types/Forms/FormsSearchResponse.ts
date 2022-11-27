import { ObjectType, Field } from "type-graphql";
import { FormTypes } from "@oneblink/types";
import { Form } from "./Form";

@ObjectType()
class Meta {
  @Field()
  offset!: number;
}

@ObjectType()
export class FormsSearchResponse {
  @Field((type) => Meta)
  meta!: { offest: number };

  @Field((type) => [Form])
  forms!: FormTypes.Form & {};
}
