
# CommonAreaPhotoDto


## Properties

Name | Type
------------ | -------------
`id` | number
`contentType` | string
`originalFileName` | string
`originalSize` | number
`hashSha256` | string
`base64Data` | string

## Example

```typescript
import type { CommonAreaPhotoDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "contentType": null,
  "originalFileName": null,
  "originalSize": null,
  "hashSha256": null,
  "base64Data": null,
} satisfies CommonAreaPhotoDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CommonAreaPhotoDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


