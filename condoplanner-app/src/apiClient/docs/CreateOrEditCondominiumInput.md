
# CreateOrEditCondominiumInput


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`cnpj` | string
`email` | string
`address` | [AddressDto](AddressDto.md)
`userIds` | Array&lt;number&gt;
`blocks` | [Array&lt;BlockInputDto&gt;](BlockInputDto.md)

## Example

```typescript
import type { CreateOrEditCondominiumInput } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "cnpj": null,
  "email": null,
  "address": null,
  "userIds": null,
  "blocks": null,
} satisfies CreateOrEditCondominiumInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateOrEditCondominiumInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


