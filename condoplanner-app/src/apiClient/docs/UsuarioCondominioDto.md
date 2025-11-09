
# UsuarioCondominioDto


## Properties

Name | Type
------------ | -------------
`usuarioId` | number
`condominioId` | number
`tipoUsuario` | [ETipoUsuario](ETipoUsuario.md)
`ativo` | boolean
`dataInicio` | Date
`usuario` | [UsuarioDto](UsuarioDto.md)
`condominio` | [CondominioDto](CondominioDto.md)

## Example

```typescript
import type { UsuarioCondominioDto } from ''

// TODO: Update the object below with actual values
const example = {
  "usuarioId": null,
  "condominioId": null,
  "tipoUsuario": null,
  "ativo": null,
  "dataInicio": null,
  "usuario": null,
  "condominio": null,
} satisfies UsuarioCondominioDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UsuarioCondominioDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


