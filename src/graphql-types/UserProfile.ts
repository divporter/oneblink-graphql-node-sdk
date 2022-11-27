import { Field, ObjectType } from "type-graphql";
import { MiscTypes } from "@oneblink/types";

@ObjectType()
class Supervisor {
  @Field({ description: "The user's supervisor's full name" })
  fullName?: string;

  @Field({ description: "The user's supervisor's full email address" })
  email?: string;

  @Field({
    description: "The user's supervisor's user id from the login provider",
  })
  providerUserId?: string;
}

@ObjectType()
export class UserProfileType {
  @Field({
    description: "The user's email address",
    nullable: true,
  })
  email?: string;

  @Field({
    description: "True if the email address is verified",
    nullable: true,
  })
  emailVerified?: string;

  @Field({
    description: "The user's first name",
    nullable: true,
  })
  firstName?: string;

  @Field({
    description: "The user's full name",
    nullable: true,
  })
  fullName?: string;

  @Field({
    description: "true if the user logged in using a SAML provider",
    nullable: true,
  })
  isSAMLUser?: boolean;

  @Field({
    description: "The user's last name",
    nullable: true,
  })
  lastName?: string;

  @Field({
    description: "The user's phone number from a SAML configuration",
    nullable: true,
  })
  phoneNumber?: string;

  @Field({
    description: "True if the phone number is verified",
    nullable: true,
  })
  phoneNumberVerified?: boolean;

  @Field({
    description: "A URL to a picture of the user",
    nullable: true,
  })
  picture?: string;

  @Field({
    description: "Which provider was used to login",
    nullable: true,
  })
  providerType?: string;

  @Field({
    description: "The id of the user from the login provider",
    nullable: true,
  })
  providerUserId?: string;

  @Field({
    description: "The user's role from a SAML configuration",
    nullable: true,
  })
  role?: string;

  @Field((type) => Supervisor, {
    description: "The user's supervisor information from a SAML configuration",
    nullable: true,
  })
  supervisor?: MiscTypes.UserProfile["supervisor"];

  @Field({ description: "The username used to login" })
  userId!: string;

  @Field({ description: "The user's email address" })
  username!: string;
}
