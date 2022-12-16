import { Field, ObjectType, createUnionType, ClassType } from "type-graphql";
import { ConditionTypes, SubmissionEventTypes } from "@oneblink/types";
import { ConditionalPredicate } from "./Condition";
import { NumberStringBooleanScalar } from "./NumberStringBoolean";

@ObjectType()
class FormEventConditional {
  @Field({ nullable: true })
  conditionallyExecute?: boolean;

  @Field((type) => [ConditionalPredicate], {
    nullable: true,
  })
  conditionallyExecutePredicates?: ConditionTypes.ConditionalPredicate[];

  @Field({ nullable: true })
  requiresAllConditionallyExecutePredicates?: boolean;
}

@ObjectType()
class FormEventBase extends FormEventConditional {
  @Field({ nullable: true })
  label?: string;
}

@ObjectType()
class CPPaySubmissionEventConfiguration {
  @Field()
  elementId!: string;

  @Field()
  gatewayId!: string;
}

@ObjectType()
class CPPaySubmissionEvent extends FormEventBase {
  @Field()
  type!: "CP_PAY";

  @Field((type) => CPPaySubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.CPPaySubmissionEvent["configuration"];
}

@ObjectType()
class BPOINTSubmissionEventConfiguration {
  @Field({ nullable: true })
  crn2?: string;
  @Field({ nullable: true })
  crn3?: string;

  @Field()
  elementId!: string;

  @Field()
  environmentId!: string;
}

@ObjectType()
class BPOINTSubmissionEvent extends FormEventBase {
  @Field()
  type!: "BPOINT";

  @Field((type) => BPOINTSubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.BPOINTSubmissionEvent["configuration"];
}

@ObjectType()
class WestpacQuickWebSubmissionEventConfiguration {
  @Field()
  customerReferenceNumber!: string;

  @Field()
  elementId!: string;

  @Field()
  environmentId!: string;
}

@ObjectType()
class WestpacQuickWebSubmissionEvent extends FormEventBase {
  @Field()
  type!: "WESTPAC_QUICK_WEB";

  @Field((type) => WestpacQuickWebSubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.BPOINTSubmissionEvent["configuration"];
}

const FormPaymentEventMap = {
  CP_PAY: CPPaySubmissionEvent,
  BPOINT: BPOINTSubmissionEvent,
  WESTPAC_QUICK_WEB: WestpacQuickWebSubmissionEvent,
};

const FormPaymentEventTypes = Object.values(FormPaymentEventMap);

export const FormPaymentEvent = createUnionType({
  name: "FormPaymentEvent",
  types: () => [...FormPaymentEventTypes] as const,
  resolveType: (value) => {
    return FormPaymentEventMap[value.type];
  },
});

@ObjectType()
class CallbackSubmissionEventConfiguration {
  @Field()
  secret!: string;

  @Field()
  url!: string;
}

@ObjectType()
class CallbackSubmissionEvent extends FormEventBase {
  @Field()
  type!: "CALLBACK";

  @Field((type) => CallbackSubmissionEventConfiguration)
  configuration!: { secret: string; url: string };
}

@ObjectType()
class PowerAutomateFlowSubmissionEventConfiguration {
  @Field()
  url!: string;
}

@ObjectType()
class PowerAutomateFlowSubmissionEvent extends FormEventBase {
  @Field()
  type!: "POWER_AUTOMATE_FLOW";

  @Field((type) => PowerAutomateFlowSubmissionEventConfiguration)
  configuration!: { url: string };
}

@ObjectType()
class ApprovalFormsInclusionAll {
  @Field()
  value!: "ALL";
}

@ObjectType()
class ApprovalFormsInclusionPartial {
  @Field()
  value!: "PARTIAL";

  @Field((type) => [String])
  approvalStepLabels!: string[];
}

const ApprovalFormsInclusion = createUnionType({
  name: "ApprovalFormsInclusion",
  types: () =>
    [ApprovalFormsInclusionAll, ApprovalFormsInclusionPartial] as const,
  resolveType: ({ value }) => {
    if (value === "ALL") {
      return ApprovalFormsInclusionAll;
    }
    if (value === "PARTIAL") {
      return ApprovalFormsInclusionPartial;
    }
    return undefined;
  },
});

@ObjectType()
class ApprovalFormsInclusionConfiguration {
  @Field((type) => ApprovalFormsInclusion, { nullable: true })
  approvalFormsInclusion?: SubmissionEventTypes.ApprovalFormsInclusionConfiguration["approvalFormsInclusion"];
}

function PDFConfigurationMixin<TClassType extends ClassType>(Base: TClassType) {
  @ObjectType()
  class _PDFConfiguration extends Base {
    @Field((type) => [String], {
      description:
        "An array of element ids to exclude from the submission when generating pdf.",
      nullable: true,
    })
    excludedElementIds?: string[];

    @Field({
      description:
        "Whether the payment details associated with the submission should be included in the generated pdf (defaults to false).",
      nullable: true,
    })
    includePaymentInPdf?: boolean;

    @Field({
      description:
        "Whether the submission id should be included in the generated pdf (defaults to false).",
      nullable: true,
    })
    includeSubmissionIdInPdf?: boolean;

    @Field({
      description:
        "The name of the PDF file sent to the configured email address.",
      nullable: true,
    })
    pdfFileName?: string;

    @Field({
      description:
        "Whether pages in the form submission should translate to page breaks in the PDF.",
      nullable: true,
    })
    usePagesAsBreaks?: boolean;
  }
  return _PDFConfiguration;
}

@ObjectType()
class SchedulingSubmissionConfiguration extends PDFConfigurationMixin(
  ApprovalFormsInclusionConfiguration
) {
  @Field({ nullable: true })
  emailDescription?: string;

  @Field({ nullable: true })
  emailElementId?: string;

  @Field({ nullable: true })
  nameElementId?: string;

  @Field()
  nylasAccountId!: string;

  @Field()
  nylasSchedulingPageId!: number;
}

@ObjectType()
export class SchedulingSubmissionEvent extends FormEventBase {
  @Field()
  type!: "SCHEDULING";

  @Field((type) => SchedulingSubmissionConfiguration)
  configuration!: SubmissionEventTypes.SchedulingSubmissionEvent["configuration"];
}

@ObjectType()
class PdfSubmissionEventEmailTemplateMappingFormElement {
  @Field()
  mustacheTag!: string;

  @Field()
  formElementId!: string;

  @Field()
  type!: "FORM_ELEMENT";
}

@ObjectType()
class PdfSubmissionEventEmailTemplateMappingText {
  @Field()
  mustacheTag!: string;

  @Field()
  text!: string;

  @Field()
  type!: "TEXT";
}

const PdfSubmissionEventEmailTemplateMapping = createUnionType({
  name: "PdfSubmissionEventEmailTemplateMapping",
  types: () =>
    [
      PdfSubmissionEventEmailTemplateMappingFormElement,
      PdfSubmissionEventEmailTemplateMappingText,
    ] as const,
  resolveType: (value) => {
    if (value.type === "FORM_ELEMENT") {
      return PdfSubmissionEventEmailTemplateMappingFormElement;
    }
    if (value.type === "TEXT") {
      return PdfSubmissionEventEmailTemplateMappingText;
    }
    return undefined;
  },
});

@ObjectType()
class EmailTemplate {
  @Field({ description: "The id of the emailTemplate." })
  id!: number;

  @Field((type) => [PdfSubmissionEventEmailTemplateMapping], {
    description: "The mappings required from the email template.",
  })
  mapping!: SubmissionEventTypes.PdfSubmissionEventEmailTemplateMapping[];
}

function EmailConfigurationMixin<TClassType extends ClassType>(
  Base: TClassType
) {
  @ObjectType()
  class EmailConfiguration {
    @Field({
      description:
        "The email in which a PDF copy of the form submission will be sent.",
    })
    email!: string;

    @Field({
      description:
        "The subject line of the email sent to the configured email address.",
      nullable: true,
    })
    emailSubjectLine?: string;

    @Field((type) => EmailTemplate, {
      description: "A reference to a custom template for the email body.",
      nullable: true,
    })
    emailTemplate?: {
      id: number;
      mapping: SubmissionEventTypes.PdfSubmissionEventEmailTemplateMapping[];
    };
  }
  return EmailConfiguration;
}

@ObjectType()
class _EmailConfigiration {}

@ObjectType()
class EmailConfiguration extends EmailConfigurationMixin(_EmailConfigiration) {}

@ObjectType()
class PdfSubmissionEventConfiguration extends PDFConfigurationMixin(
  EmailConfigurationMixin(ApprovalFormsInclusionConfiguration)
) {}

@ObjectType()
class PdfSubmissionEvent extends FormEventBase {
  @Field()
  type!: "PDF";

  @Field((type) => PdfSubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.PdfSubmissionEvent["configuration"];
}

@ObjectType()
class OneBlinkAPISubmissionEventConfiguration {
  @Field({
    description:
      "The environment of the specified OneBlink hosted API to recieve the callback.",
  })
  apiEnvironment!: string;

  @Field({
    description:
      "The route of the specified API and Environment to recieve the callback payload.",
  })
  apiEnvironmentRoute!: string;

  @Field({
    description:
      "The ID of the OneBlink hosted API that a callback is made to on submission.",
  })
  apiId!: string;

  @Field({
    nullable: true,
    description:
      "Secret string used for verifying the authenticity of the request made from the OneBlink system.",
  })
  secret?: string;
}

@ObjectType()
class OneBlinkAPISubmissionEvent extends FormEventBase {
  @Field()
  type!: "ONEBLINK_API";

  @Field((type) => OneBlinkAPISubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.OneBlinkAPISubmissionEvent["configuration"];
}

@ObjectType()
class TrimUriOption {
  @Field({ description: "The attribute label." })
  label!: string;

  @Field({ description: "The attribute uri." })
  uri!: number;
}

@ObjectType()
class TrimSubmissionEventConfiguration extends PDFConfigurationMixin(
  ApprovalFormsInclusionConfiguration
) {
  @Field((type) => TrimUriOption)
  actionDefinition!: SubmissionEventTypes.TrimSubmissionEvent["configuration"]["actionDefinition"];

  @Field((type) => TrimUriOption, { nullable: true })
  author?: SubmissionEventTypes.TrimSubmissionEvent["configuration"]["author"];

  @Field((type) => TrimUriOption)
  container!: SubmissionEventTypes.TrimSubmissionEvent["configuration"]["container"];

  @Field()
  environmentId!: string;

  @Field({ nullable: true })
  groupFiles?: boolean;

  @Field((type) => TrimUriOption)
  location!: SubmissionEventTypes.TrimSubmissionEvent["configuration"]["location"];
}

@ObjectType()
class TrimSubmissionEvent extends FormEventBase {
  @Field()
  type!: "TRIM";

  @Field((type) => TrimSubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.TrimSubmissionEvent["configuration"];
}

@ObjectType()
class CPHCMSSubmissionEventConfiguration extends PDFConfigurationMixin(
  ApprovalFormsInclusionConfiguration
) {
  @Field()
  contentTypeName!: string;

  @Field({ nullable: true })
  encryptPdf?: boolean;

  @Field((type) => [String], { nullable: true })
  encryptedElementIds?: string[];
}

@ObjectType()
class CPHCMSSubmissionEvent extends FormEventBase {
  @Field()
  type!: "CP_HCMS";

  @Field((type) => CPHCMSSubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.CPHCMSSubmissionEvent["configuration"];
}

@ObjectType()
class CivicaRecord {
  @Field()
  id!: number;

  @Field()
  label!: string;
}

@ObjectType()
class CivicaCustomerContactMethod {
  @Field()
  code!: string;

  @Field()
  description!: string;
}

@ObjectType()
class CivicaCrmSubmissionEventMapping {
  @Field({
    description:
      "The item number of the civica category to map the OB form field to.",
  })
  civicaCategoryItemNumber!: number;

  @Field({
    description: "The elementId of the field to map to the civica category.",
  })
  formElementId!: string;

  @Field()
  isDescription!: boolean;
}

@ObjectType()
class CivicaCrmSubmissionEventConfiguration extends PDFConfigurationMixin(
  ApprovalFormsInclusionConfiguration
) {
  @Field((type) => CivicaRecord)
  civicaCategory!: SubmissionEventTypes.CivicaCrmSubmissionEvent["configuration"]["civicaCategory"];

  @Field((type) => CivicaCustomerContactMethod)
  civicaCustomerContactMethod!: SubmissionEventTypes.CivicaCrmSubmissionEvent["configuration"]["civicaCustomerContactMethod"];

  @Field()
  environmentId!: string;

  @Field((type) => [CivicaCrmSubmissionEventMapping])
  mapping!: SubmissionEventTypes.CivicaCrmSubmissionEventMapping[];
}

@ObjectType()
class CivicaCrmSubmissionEvent extends FormEventBase {
  @Field()
  type!: "CIVICA_CRM";

  @Field((type) => CivicaCrmSubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.CivicaCrmSubmissionEvent["configuration"];
}

@ObjectType()
class EmailOnlySubmissionEvent extends FormEventBase {
  @Field()
  type!: "EMAIL";

  @Field((type) => EmailConfiguration)
  configuration!: SubmissionEventTypes.EmailOnlySubmissionEvent["configuration"];
}

@ObjectType()
class FreshdeskSubmissionEventFieldMappingBase {
  @Field()
  freshdeskFieldName!: string;
}

@ObjectType()
class FreshdeskSubmissionEventFieldMappingFormElement extends FreshdeskSubmissionEventFieldMappingBase {
  @Field()
  type!: "FORM_ELEMENT";

  @Field()
  formElementId!: string;
}

@ObjectType()
class FreshdeskSubmissionEventFieldMappingValue extends FreshdeskSubmissionEventFieldMappingBase {
  @Field()
  type!: "VALUE";

  @Field((type) => NumberStringBooleanScalar)
  value!: number | string | boolean;
}

@ObjectType()
class _FreshdeskSubmissionEventFieldMappingDependentFieldValue {
  @Field()
  category!: string;

  @Field()
  item!: string;

  @Field()
  subCategory!: string;
}

@ObjectType()
class FreshdeskSubmissionEventFieldMappingDependentFieldValue extends FreshdeskSubmissionEventFieldMappingBase {
  @Field((type) => _FreshdeskSubmissionEventFieldMappingDependentFieldValue)
  dependentFieldValue!: { category: string; item: string; subCategory: string };

  @Field()
  type!: "DEPENDENT_FIELD_VALUE";
}

const FreshdeskSubmissionEventFieldMapping = createUnionType({
  name: "FreshdeskSubmissionEventFieldMappingUnion",
  types: () =>
    [
      FreshdeskSubmissionEventFieldMappingFormElement,
      FreshdeskSubmissionEventFieldMappingValue,
      FreshdeskSubmissionEventFieldMappingDependentFieldValue,
    ] as const,
  resolveType: (value) => {
    if (value.type === "FORM_ELEMENT") {
      return FreshdeskSubmissionEventFieldMappingFormElement;
    }
    if (value.type === "VALUE") {
      return FreshdeskSubmissionEventFieldMappingValue;
    }
    if (value.type === "DEPENDENT_FIELD_VALUE") {
      return FreshdeskSubmissionEventFieldMappingDependentFieldValue;
    }
    return undefined;
  },
});

@ObjectType()
class FreshdeskCreateTicketSubmissionEventConfiguration extends ApprovalFormsInclusionConfiguration {
  @Field((type) => [FreshdeskSubmissionEventFieldMapping])
  mapping!: SubmissionEventTypes.FreshdeskSubmissionEventFieldMapping[];
}

@ObjectType()
class FreshdeskCreateTicketSubmissionEvent extends FormEventBase {
  @Field()
  type!: "FRESHDESK_CREATE_TICKET";

  @Field((type) => FreshdeskCreateTicketSubmissionEventConfiguration)
  configuration!: SubmissionEventTypes.FreshdeskCreateTicketSubmissionEvent["configuration"];
}

@ObjectType()
class FreshdeskAddNoteToTicketSubmissionEvent extends FormEventBase {
  @Field()
  type!: "FRESHDESK_ADD_NOTE_TO_TICKET";

  @Field((type) => ApprovalFormsInclusionConfiguration)
  configuration!: SubmissionEventTypes.FreshdeskAddNoteToTicketSubmissionEvent["configuration"];
}

const FormWorkFlowEventMap = {
  CALLBACK: CallbackSubmissionEvent,
  POWER_AUTOMATE_FLOW: PowerAutomateFlowSubmissionEvent,
  PDF: PdfSubmissionEvent,
  ONEBLINK_API: OneBlinkAPISubmissionEvent,
  TRIM: TrimSubmissionEvent,
  CP_HCMS: CPHCMSSubmissionEvent,
  CIVICA_CRM: CivicaCrmSubmissionEvent,
  EMAIL: EmailOnlySubmissionEvent,
  FRESHDESK_CREATE_TICKET: FreshdeskCreateTicketSubmissionEvent,
  FRESHDESK_ADD_NOTE_TO_TICKET: FreshdeskAddNoteToTicketSubmissionEvent,
};

const FormWorkFlowEventTypes = Object.values(FormWorkFlowEventMap);

export const FormWorkFlowEvent = createUnionType({
  name: "FormWorkFlowEvent",
  types: () => [...FormWorkFlowEventTypes] as const,
  resolveType: (value) => {
    return FormWorkFlowEventMap[value.type];
  },
});

export const FormEvent = createUnionType({
  name: "FormEvent",
  types: () =>
    [
      ...FormPaymentEventTypes,
      SchedulingSubmissionEvent,
      ...FormWorkFlowEventTypes,
    ] as const,
  resolveType: (value) => {
    const typeMap = {
      ...FormPaymentEventMap,
      SCHEDULING: SchedulingSubmissionEvent,
      ...FormWorkFlowEventMap,
    };
    return typeMap[value.type];
  },
});
