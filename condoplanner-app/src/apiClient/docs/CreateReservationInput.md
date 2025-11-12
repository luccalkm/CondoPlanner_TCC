
# CreateReservationInput


## Properties

Name | Type
------------ | -------------
`areaId` | number
`date` | Date
`startTime` | string
`endTime` | string
`guests` | number
`purpose` | string
`notes` | string

## Example

```typescript
import type { CreateReservationInput } from ''

// TODO: Update the object below with actual values
const example = {
  "areaId": null,
  "date": null,
  "startTime": null,
  "endTime": null,
  "guests": null,
  "purpose": null,
  "notes": null,
} satisfies CreateReservationInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateReservationInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


