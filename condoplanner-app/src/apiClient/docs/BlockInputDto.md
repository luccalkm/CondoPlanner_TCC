
# BlockInputDto


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`apartments` | [Array&lt;ApartmentInputDto&gt;](ApartmentInputDto.md)

## Example

```typescript
import type { BlockInputDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "apartments": null,
} satisfies BlockInputDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BlockInputDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


