
# CreatePackageInput


## Properties

Name | Type
------------ | -------------
`carrier` | string
`receivedAt` | Date
`notes` | string
`condominiumId` | number
`residentialLinkId` | number

## Example

```typescript
import type { CreatePackageInput } from ''

// TODO: Update the object below with actual values
const example = {
  "carrier": null,
  "receivedAt": null,
  "notes": null,
  "condominiumId": null,
  "residentialLinkId": null,
} satisfies CreatePackageInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreatePackageInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


