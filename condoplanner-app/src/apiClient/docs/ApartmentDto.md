
# ApartmentDto


## Properties

Name | Type
------------ | -------------
`id` | number
`number` | string
`floorNumber` | string
`blockId` | number

## Example

```typescript
import type { ApartmentDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "number": null,
  "floorNumber": null,
  "blockId": null,
} satisfies ApartmentDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApartmentDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


