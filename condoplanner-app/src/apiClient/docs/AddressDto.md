
# AddressDto


## Properties

Name | Type
------------ | -------------
`street` | string
`number` | string
`complement` | string
`district` | string
`city` | string
`state` | string
`zipCode` | string
`country` | string

## Example

```typescript
import type { AddressDto } from ''

// TODO: Update the object below with actual values
const example = {
  "street": null,
  "number": null,
  "complement": null,
  "district": null,
  "city": null,
  "state": null,
  "zipCode": null,
  "country": null,
} satisfies AddressDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AddressDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


