
# UpdatePackageStatusInput


## Properties

Name | Type
------------ | -------------
`packageId` | number
`status` | [EStatusEncomenda](EStatusEncomenda.md)
`pickupPersonName` | string
`pickedUpAt` | Date

## Example

```typescript
import type { UpdatePackageStatusInput } from ''

// TODO: Update the object below with actual values
const example = {
  "packageId": null,
  "status": null,
  "pickupPersonName": null,
  "pickedUpAt": null,
} satisfies UpdatePackageStatusInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdatePackageStatusInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


