
# AddUserToCondominiumInput


## Properties

Name | Type
------------ | -------------
`condominioId` | number
`usuarioId` | number
`tipoUsuario` | [ETipoUsuario](ETipoUsuario.md)
`ativo` | boolean
`dataInicio` | Date

## Example

```typescript
import type { AddUserToCondominiumInput } from ''

// TODO: Update the object below with actual values
const example = {
  "condominioId": null,
  "usuarioId": null,
  "tipoUsuario": null,
  "ativo": null,
  "dataInicio": null,
} satisfies AddUserToCondominiumInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AddUserToCondominiumInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


