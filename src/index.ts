import "reflect-metadata";
import { Forms } from "./schemas/forms";

//TODO ApolloClient option

async function doStuff(query: string) {
  // const result = await formsService.query(query);

  // console.log(JSON.stringify(result, null, 2));

  const result2 = await Forms.query(`
    mutation {
      generateFormElement(formElementGenerationData:{type: "text", name: "namo", label: "labia"}){
        element
      }
      generatePageElement(formElementGenerationData: {
        label: "myPage"
      }){
        id
        label
      }
    }`);
  console.log(JSON.stringify(result2, null, 2));

  const result3 = await Forms.query(`{
      validateFormEvent(formElements: [], data:{type: "CALLBACK", configuration: {
          url: "https://veganfeeds.com.au",
          secret: "secret"
        }
      }){
        ... on CallbackSubmissionEvent {
          type,
          label
        }
      }
    }
  `);

  console.log(JSON.stringify(result3, null, 2));
}

// doStuff(`{
//   getForm(formId: 6668){
//     id,
//     name,
//     description,
//     organisationId,
//     isMultiPage,
//     formsAppIds,
//     submissionEvents,
//     updatedAt
//   }
//   getFormSubmissionMeta(submissionId: "f96a6c9e-adc9-4e46-a037-7147172d78f4"){
//     formSubmissionMeta {
//       formsAppId
//       formId
//     }
//   }
//   searchForms(formsAppId: 992){
//     forms {
//       name
//     }
//   }
// }`);

// doStuff(`
//   mutation {
//     createForm(
//       name: "testsform",
//       formsAppEnvironmentId: 1,
//       description: "a form",
//       organisationId: "0101010101010",
//       elements: [],
//       tags: [],
//       isAuthenticated: false,
//       submissionEvents: [],
//       postSubmissionAction: "FORMS_LIBRARY",
//       formsAppIds: [1, 2, 3],
//       isMultiPage: false,
//       isInfoPage: false,
//       cancelAction: "CLOSE"
//     ){
//       name
//     }
//   }
// `);

doStuff(`
  mutation {
    generateFormUrl(formId: 6668){
      expiry
      formUrl
    }
  }
`);

export { Forms };
