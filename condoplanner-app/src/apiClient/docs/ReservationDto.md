
# ReservationDto


## Properties

Name | Type
------------ | -------------
`id` | number
`areaId` | number
`commonArea` | [CommonAreaDto](CommonAreaDto.md)
`condominiumId` | number
`vinculoResidencialId` | number
`purpose` | string
`date` | Date
`startTime` | string
`endTime` | string
`guests` | number
`status` | [EStatusReserva](EStatusReserva.md)
`notes` | string

## Example

```typescript
import type { ReservationDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "areaId": null,
  "commonArea": null,
  "condominiumId": null,
  "vinculoResidencialId": null,
  "purpose": null,
  "date": null,
  "startTime": null,
  "endTime": null,
  "guests": null,
  "status": null,
  "notes": null,
} satisfies ReservationDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReservationDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


