# AddressApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAddressPost**](AddressApi.md#apiaddresspost) | **POST** /api/Address |  |



## apiAddressPost

> EnderecoDto apiAddressPost(getCepInput)



### Example

```ts
import {
  Configuration,
  AddressApi,
} from '';
import type { ApiAddressPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AddressApi(config);

  const body = {
    // GetCepInput (optional)
    getCepInput: ...,
  } satisfies ApiAddressPostRequest;

  try {
    const data = await api.apiAddressPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **getCepInput** | [GetCepInput](GetCepInput.md) |  | [Optional] |

### Return type

[**EnderecoDto**](EnderecoDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

