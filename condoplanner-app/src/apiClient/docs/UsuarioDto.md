
# UsuarioDto


## Properties

Name | Type
------------ | -------------
`id` | number
`nome` | string
`email` | string
`telefone` | string
`cpf` | string

## Example

```typescript
import type { UsuarioDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "nome": null,
  "email": null,
  "telefone": null,
  "cpf": null,
} satisfies UsuarioDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UsuarioDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


