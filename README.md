# OneBlink Graphql Node SDK

A graphql interface for [@oneblink/sdk](https://www.npmjs.com/package@oneblink/sdk) v1.0.0

## Installation

```javascript
npm i oneblink-graphql-sdk
```

## Usage

The package exports a number of classes that can be used to access OneBlink Productivity Suite instances

### Instance Functions

To query traditional SDK instance functions you need an access key and secret key

```javascript
import { Forms } from "oneblink-graphql-sdk";

const formsService = new Forms({ accessKey: "abc", secretKey: "xyz" });

formsService.query(`{
  getForm(formId: 1){
    id,
    name,
    description,
    organisationId,
    isMultiPage,
    formsAppIds,
    submissionEvents,
    updatedAt
  }
}`);
```

### Static functions

The static functions do not require an access key and secret key

```javascript
import { Forms } from "oneblink-graphql-sdk";

Forms.query(`{
  validateFormEvent(formElements: [], data:{type: "CALLBACK", configuration: {
      url: "https://www.oneblink.io",
      secret: "secret"
    }
  }){
    ... on CallbackSubmissionEvent {
      type,
      label
      configuration {
        url
      }
    }
  }
}`);
```

### OneBlink Node SDK

The underlying instance and static methods are still available too, e.g.

```javascript
import { Forms } from 'oneblink-graphql-sdk";

Forms.validatFormEvent(
  [],
  {
    type: "CALLBACK",
    configuration: {
      url: "https://www.oneblink.io",
      secret: "secret"
    }
  }
})
```
