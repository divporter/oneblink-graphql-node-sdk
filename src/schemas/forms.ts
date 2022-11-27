import { buildSchemaSync } from "type-graphql";
import { graphql, GraphQLSchema } from "graphql";
import { Container, ContainerInstance } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { Forms as FormsService } from "@oneblink/sdk";

import { FormsResolver } from "../resolvers/forms";
import { StaticFormsResolver } from "../resolvers/forms-static";

let globalSchema: GraphQLSchema;

export class Forms extends FormsService {
  private schema: GraphQLSchema;
  private container: ContainerInstance;
  constructor(private accessOptions: { accessKey: string; secretKey: string }) {
    super(accessOptions);
    this.container = Container.of(uuidv4());
    this.container.set({
      id: "FORMS_SERVICE",
      factory: () => new FormsService(accessOptions),
    });
    this.schema = buildSchemaSync({
      resolvers: [FormsResolver],
      container: this.container,
    });
  }

  async query(query: string) {
    return graphql({
      schema: this.schema,
      source: query,
    });
  }

  static query(query: string) {
    if (!globalSchema) {
      globalSchema = buildSchemaSync({
        resolvers: [StaticFormsResolver],
      });
    }
    return graphql({
      schema: globalSchema,
      source: query,
    });
  }
}
