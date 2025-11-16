
# ResidentialLinkDto


## Properties

Name | Type
------------ | -------------
`id` | number
`usuarioId` | number
`userName` | string
`condominiumId` | number
`condominiumName` | string
`apartmentId` | number
`apartmentNumber` | string
`blockId` | number
`blockName` | string
`occupationType` | [ETipoOcupacao](ETipoOcupacao.md)
`active` | boolean
`startDate` | Date
`endDate` | Date
`status` | [EStatusVinculoResidencial](EStatusVinculoResidencial.md)

## Example

```typescript
import type { ResidentialLinkDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "usuarioId": null,
  "userName": null,
  "condominiumId": null,
  "condominiumName": null,
  "apartmentId": null,
  "apartmentNumber": null,
  "blockId": null,
  "blockName": null,
  "occupationType": null,
  "active": null,
  "startDate": null,
  "endDate": null,
  "status": null,
} satisfies ResidentialLinkDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResidentialLinkDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


