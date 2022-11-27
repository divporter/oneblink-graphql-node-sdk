import { Int, ArgsType, Field, ObjectType } from "type-graphql";
import { MiscTypes } from "@oneblink/types";

@ArgsType()
export class BaseSearchArgs {
  @Field((type) => Int, {
    nullable: true,
    description: "Limit the number of results returned",
  })
  limit?: number;

  @Field((type) => Int, {
    nullable: true,
    description:
      "Skip a specific number of results, used in conjunction with `limit` to enforce paging",
  })
  offset?: number;
}

@ObjectType()
class Meta {
  @Field()
  limit?: number;

  @Field()
  nextOffset?: number;

  @Field()
  offset?: number;
}

@ObjectType()
export class BaseSearchResult {
  @Field((type) => Meta)
  meta!: MiscTypes.BaseSearchResult["meta"];
}
