# AddressApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAddressCepGet**](AddressApi.md#apiaddresscepget) | **GET** /api/Address/{cep} |  |



## apiAddressCepGet

> EnderecoDto apiAddressCepGet(cep)



### Example

```ts
import {
  Configuration,
  AddressApi,
} from '';
import type { ApiAddressCepGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AddressApi(config);

  const body = {
    // string
    cep: cep_example,
  } satisfies ApiAddressCepGetRequest;

  try {
    const data = await api.apiAddressCepGet(body);
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
| **cep** | `string` |  | [Defaults to `undefined`] |

### Return type

[**EnderecoDto**](EnderecoDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

