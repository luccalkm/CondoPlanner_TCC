
# EnderecoDto


## Properties

Name | Type
------------ | -------------
`logradouro` | string
`numero` | string
`complemento` | string
`bairro` | string
`cidade` | string
`estado` | string
`cep` | string
`pais` | string

## Example

```typescript
import type { EnderecoDto } from ''

// TODO: Update the object below with actual values
const example = {
  "logradouro": null,
  "numero": null,
  "complemento": null,
  "bairro": null,
  "cidade": null,
  "estado": null,
  "cep": null,
  "pais": null,
} satisfies EnderecoDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnderecoDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


