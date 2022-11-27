import { Resolver, Arg, Query, Args, Mutation } from "type-graphql";
import { Forms } from "@oneblink/sdk";
import { FormsSearchArgs } from "../graphql-types/Forms/FormsSearchArgs";
import { Inject, Service } from "typedi";
import {
  Form,
  CreateFormArgs,
  UpdateFormArgs,
} from "../graphql-types/Forms/Form";
import { FormsSearchResponse } from "../graphql-types/Forms/FormsSearchResponse";
import { FormSubmissionMetaResult } from "../graphql-types/Forms/FormSubmissionMetaResult";
import {
  GenerateFormUrlParams,
  GenerateFormUrlResponse,
} from "../graphql-types/Forms/GenerateFormUrl";
import {
  GenerateSubmissionAttachmentUrlParams,
  GenerateSubmissionAttachmentUrlResponse,
} from "../graphql-types/Forms/GenerateSubmissionAttachmentUrl";
import { FormMigrationData } from "../graphql-types/Forms/FormMigrationData";
import { SubmissionAttachmentMetaResponse } from "../graphql-types/Forms/SubmissionAttachmentMeta";
import {
  FormSubmissionHistorySearchParameters,
  FormSubmissionHistorySearchResults,
} from "../graphql-types/Forms/SearchSubmissions";
import { SubmissionData } from "../graphql-types/Forms/SubmissionData";

//refer to https://oneblink.github.io/sdk-node-js/classes/oneblink.Forms.html
@Service()
@Resolver()
export class FormsResolver {
  constructor(@Inject("FORMS_SERVICE") private readonly formsService: Forms) {}

  @Mutation((returns) => Form)
  async createForm(
    @Args()
    newForm: CreateFormArgs
  ) {
    //@ts-expect-error fudge it
    return await this.formsService.createForm(newForm);
  }

  @Mutation((returns) => GenerateFormUrlResponse)
  async generateFormUrl(@Args() parameters: GenerateFormUrlParams) {
    return await this.formsService.generateFormUrl(parameters);
  }

  @Mutation((returns) => GenerateSubmissionAttachmentUrlResponse)
  async generateSubmissionAttachmentUrl(
    @Args() parameters: GenerateSubmissionAttachmentUrlParams
  ) {
    return await this.formsService.generateFormUrl(parameters);
  }

  @Query((returns) => Form)
  async getForm(
    @Arg("formId") formId: number,
    @Arg("injectForms", { nullable: true }) injectForms?: boolean
  ): Promise<Form> {
    return await this.formsService.getForm(formId, injectForms);
  }

  @Query((returns) => FormSubmissionMetaResult)
  async getFormSubmissionMeta(
    @Arg("submissionId") submissionId: string
  ): Promise<FormSubmissionMetaResult> {
    return await this.formsService.getFormSubmissionMeta(submissionId);
  }

  @Query((returns) => SubmissionAttachmentMetaResponse)
  async getSubmissionAttachmentMeta(
    @Arg("formId") formId: number,
    @Arg("attachmentId") attachmentId: string
  ) {
    return await this.formsService.getSubmissionAttachmentMeta(
      formId,
      attachmentId
    );
  }

  @Query((returns) => SubmissionData)
  async getSubmissionData(
    @Arg("formId") formId: number,
    @Arg("submissionId") submissionId: string,
    @Arg("isDraft") isDraft: boolean
  ) {
    return await this.formsService.getSubmissionData(
      formId,
      submissionId,
      isDraft
    );
  }

  @Mutation((returns) => Form)
  async migrateForm(@Args() migrationOptions: FormMigrationData) {
    return await this.formsService.migrateForm(migrationOptions);
  }

  // //TODO maybe add some relay pagination?
  @Query((returns) => FormsSearchResponse)
  async searchForms(
    @Args()
    formSearchOptions?: FormsSearchArgs
  ) {
    return await this.formsService.searchForms(formSearchOptions);
  }

  @Query((returns) => [FormSubmissionHistorySearchResults])
  async searchSubmissions(
    @Args() options: FormSubmissionHistorySearchParameters
  ) {
    return await this.formsService.searchSubmissions(options);
  }

  @Query((returns) => Form)
  async updateForm(
    @Arg("form") form: UpdateFormArgs,
    @Arg("overrideLock") overrideLock?: boolean
  ) {
    //@ts-expect-error fudge it
    return await this.formsService.updateForm(form, overrideLock);
  }
}
