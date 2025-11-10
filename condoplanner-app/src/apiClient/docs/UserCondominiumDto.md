
# UserCondominiumDto


## Properties

Name | Type
------------ | -------------
`userId` | number
`condominiumId` | number
`userType` | [ETipoUsuario](ETipoUsuario.md)
`active` | boolean
`creationTime` | Date
`endDate` | Date
`user` | [UserDto](UserDto.md)
`condominium` | [CondominiumDto](CondominiumDto.md)

## Example

```typescript
import type { UserCondominiumDto } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "condominiumId": null,
  "userType": null,
  "active": null,
  "creationTime": null,
  "endDate": null,
  "user": null,
  "condominium": null,
} satisfies UserCondominiumDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserCondominiumDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


