import { Field, ObjectType, createUnionType } from "type-graphql";
import { FormTypes } from "@oneblink/types";

import { Form } from "./Form";
import { JSONScalar } from "../JSON";
import { UserProfileType } from "../UserProfile";

@ObjectType()
class SubmissionDataDeviceBrowser {
  @Field({ nullable: true })
  appCodeName!: string;

  @Field({ nullable: true })
  appName!: string;

  @Field({ nullable: true })
  appVersion!: string;

  @Field({ nullable: true })
  cookieEnabled!: boolean;

  @Field({ nullable: true })
  hardwareConcurrency!: number;

  @Field({ nullable: true })
  language!: string;

  @Field({ nullable: true })
  maxTouchPoints!: number;

  @Field({ nullable: true })
  platform!: string;

  @Field((type) => String, { nullable: true })
  type!: "PWA" | "BROWSER";

  @Field({ nullable: true })
  userAgent!: string;

  @Field({ nullable: true })
  vendor!: string;

  @Field({ nullable: true })
  vendorSub!: string;

  @Field({ nullable: true })
  webdriver!: boolean;
}

@ObjectType()
class S3SubmissionDataDeviceCordova {
  @Field({ nullable: true })
  cordova?: boolean;

  @Field({ nullable: true })
  isVirtual?: boolean;

  @Field({ nullable: true })
  manufacturer?: string;

  @Field({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  platform?: string;

  @Field({ nullable: true })
  serial?: string;

  @Field()
  type!: "CORDOVA";

  @Field({ nullable: true })
  uuid?: string;

  @Field({ nullable: true })
  version?: string;
}

const SubmissionDataDeviceUnion = createUnionType({
  name: "SubmissionDataDevice",
  types: () =>
    [SubmissionDataDeviceBrowser, S3SubmissionDataDeviceCordova] as const,
  resolveType: (value) => {
    if (value.type === "BROWSER" || value.type === "PWA") {
      return SubmissionDataDeviceBrowser;
    }
    if (value.type === "CORDOVA") {
      return S3SubmissionDataDeviceCordova;
    }
  },
});

@ObjectType()
export class SubmissionData {
  @Field((type) => Form)
  definition!: Omit<FormTypes.Form, "cancelAction" | "postSubmissionAction"> & {
    cancelAction: FormTypes.Form["cancelAction"];
    postSubmissionAction: FormTypes.Form["postSubmissionAction"];
  };

  @Field((type) => SubmissionDataDeviceUnion)
  device?: Record<string, unknown>;

  @Field()
  formsAppId!: number;

  @Field()
  ipAddress?: string;

  @Field()
  keyId?: string;

  @Field((type) => JSONScalar)
  submission!: Record<string, unknown>;

  @Field()
  submissionTimestamp!: string;

  @Field((type) => UserProfileType, { nullable: true })
  // user?: MiscTypes.UserProfile;
  user?: Record<string, unknown>;
}
