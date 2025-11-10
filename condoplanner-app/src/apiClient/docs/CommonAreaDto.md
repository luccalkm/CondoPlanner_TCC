
# CommonAreaDto


## Properties

Name | Type
------------ | -------------
`id` | number
`condominiumId` | number
`name` | string
`description` | string
`type` | string
`capacity` | number
`openingTime` | string
`closingTime` | string
`maxDuration` | number
`available` | boolean
`requiresApproval` | boolean
`availableDays` | number
`notes` | string
`photos` | [Array&lt;CommonAreaPhotoDto&gt;](CommonAreaPhotoDto.md)

## Example

```typescript
import type { CommonAreaDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "condominiumId": null,
  "name": null,
  "description": null,
  "type": null,
  "capacity": null,
  "openingTime": null,
  "closingTime": null,
  "maxDuration": null,
  "available": null,
  "requiresApproval": null,
  "availableDays": null,
  "notes": null,
  "photos": null,
} satisfies CommonAreaDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CommonAreaDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


