
# UpsertUserCondominiumInput


## Properties

Name | Type
------------ | -------------
`condominiumId` | number
`userId` | number
`userType` | [ETipoUsuario](ETipoUsuario.md)
`active` | boolean
`startDate` | Date

## Example

```typescript
import type { UpsertUserCondominiumInput } from ''

// TODO: Update the object below with actual values
const example = {
  "condominiumId": null,
  "userId": null,
  "userType": null,
  "active": null,
  "startDate": null,
} satisfies UpsertUserCondominiumInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpsertUserCondominiumInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


