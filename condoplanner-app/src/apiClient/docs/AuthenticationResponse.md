
# AuthenticationResponse


## Properties

Name | Type
------------ | -------------
`token` | string
`nome` | string
`email` | string
`sucesso` | boolean
`erro` | string

## Example

```typescript
import type { AuthenticationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "token": null,
  "nome": null,
  "email": null,
  "sucesso": null,
  "erro": null,
} satisfies AuthenticationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthenticationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


