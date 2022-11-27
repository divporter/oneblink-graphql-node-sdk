import { ArgsType, Field, Int } from "type-graphql";
import { BaseSearchArgs } from "../BaseSearch";

@ArgsType()
export class FormsSearchArgs extends BaseSearchArgs {
  @Field({
    nullable: true,
    description:
      "Search on the `isAuthenticated` property of a form. Must be either `true`or `false` or not specified.",
  })
  isAuthenticated?: boolean;

  @Field({
    nullable: true,
    description:
      "Search on the `name` property of a form. Can be a prefix, suffix or partial match",
  })
  name?: string;

  @Field({
    nullable: true,
    description:
      "Search on the `isInfoPage` property of a form. Must be either `true` or `false` or not specified.",
  })
  isInfoPage?: boolean;

  @Field({
    nullable: true,
    description:
      "Search on the `formsAppIds` property of a form. Must be the exact match of one the ids in `formsAppIds`.",
  })
  formsAppId?: number;

  @Field({
    nullable: true,
    description:
      "Search on the `formsAppEnvironmentId` property of a form. Must be the exact * match of a `formsAppEnvironmentId`.",
  })
  formsAppEnvironmentId?: number;
}
