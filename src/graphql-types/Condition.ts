import { ObjectType, Field, createUnionType } from "type-graphql";
import { ConditionTypes } from "@oneblink/types";

@ObjectType()
class ConditionalPredicateBase {
  @Field({ description: "The identifier of the element to evaluate against" })
  elementId!: string;
}

@ObjectType()
class CompareWithElement {
  @Field()
  compareWith!: "ELEMENT";

  @Field()
  value!: string;
}

@ObjectType()
class CompareWithValue {
  @Field({ nullable: true })
  compareWith?: "VALUE";

  @Field()
  value!: number;
}

const CompareWith = createUnionType({
  name: "compareWith",
  types: () => [CompareWithElement, CompareWithValue] as const,
  resolveType: (value) => {
    if (value.compareWith === "ELEMENT") {
      return CompareWithElement;
    }
    return CompareWithValue;
  },
});

@ObjectType()
class ConditionalPredicateNumeric extends ConditionalPredicateBase {
  @Field()
  type!: "NUMERIC";

  @Field((type) => String)
  operator!: ConditionTypes.ConditionalPredicateNumeric["operator"];

  @Field((type) => CompareWith, { nullable: true })
  compareWith?: ConditionTypes.ConditionalPredicateNumeric["compareWith"];
}

@ObjectType()
class ConditionalPredicateOptions extends ConditionalPredicateBase {
  @Field()
  type!: "OPTIONS";

  @Field((type) => [String])
  optionIds!: string[];
}

@ObjectType()
class ConditionalPredicateHasValue extends ConditionalPredicateBase {
  @Field()
  type!: "VALUE";

  @Field()
  hasValue!: boolean;
}

@ObjectType()
class ConditionalPredicateBetween extends ConditionalPredicateBase {
  @Field()
  type!: "BETWEEN";

  @Field()
  max!: number;

  @Field()
  min!: number;
}

const ConditionalPredicateMap = {
  NUMERIC: ConditionalPredicateNumeric,
  OPTIONS: ConditionalPredicateOptions,
  VALUE: ConditionalPredicateHasValue,
  BETWEEN: ConditionalPredicateBetween,
};

const ConditionalPredicateTypes = Object.values(ConditionalPredicateMap);

export const ConditionalPredicate = createUnionType({
  name: "ConditionalPredicate",
  types: () => [...ConditionalPredicateTypes] as const,
  resolveType: (value) => {
    return ConditionalPredicateMap[value.type];
  },
});
