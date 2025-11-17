
# PackageDto


## Properties

Name | Type
------------ | -------------
`id` | number
`carrier` | string
`receivedAt` | Date
`status` | [EStatusEncomenda](EStatusEncomenda.md)
`notes` | string
`pickedUpAt` | Date
`pickupPersonName` | string
`condominiumId` | number
`residentialLinkId` | number

## Example

```typescript
import type { PackageDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "carrier": null,
  "receivedAt": null,
  "status": null,
  "notes": null,
  "pickedUpAt": null,
  "pickupPersonName": null,
  "condominiumId": null,
  "residentialLinkId": null,
} satisfies PackageDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PackageDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


