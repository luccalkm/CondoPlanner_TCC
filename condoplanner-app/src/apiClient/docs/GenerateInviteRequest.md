
# GenerateInviteRequest


## Properties

Name | Type
------------ | -------------
`condominiumId` | number
`role` | [ETipoUsuario](ETipoUsuario.md)
`singleUse` | boolean
`maxUses` | number
`expiresInDays` | number

## Example

```typescript
import type { GenerateInviteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "condominiumId": null,
  "role": null,
  "singleUse": null,
  "maxUses": null,
  "expiresInDays": null,
} satisfies GenerateInviteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GenerateInviteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


