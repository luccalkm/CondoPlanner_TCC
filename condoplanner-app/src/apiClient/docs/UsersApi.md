# UsersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiUsersChangePasswordPost**](UsersApi.md#apiuserschangepasswordpost) | **POST** /api/Users/ChangePassword |  |
| [**apiUsersIdGet**](UsersApi.md#apiusersidget) | **GET** /api/Users/{id} |  |
| [**apiUsersPut**](UsersApi.md#apiusersput) | **PUT** /api/Users |  |



## apiUsersChangePasswordPost

> apiUsersChangePasswordPost(changePasswordInput)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersChangePasswordPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // ChangePasswordInput (optional)
    changePasswordInput: ...,
  } satisfies ApiUsersChangePasswordPostRequest;

  try {
    const data = await api.apiUsersChangePasswordPost(body);
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
| **changePasswordInput** | [ChangePasswordInput](ChangePasswordInput.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersIdGet

> UsuarioDto apiUsersIdGet(id)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // number
    id: 56,
  } satisfies ApiUsersIdGetRequest;

  try {
    const data = await api.apiUsersIdGet(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |

### Return type

[**UsuarioDto**](UsuarioDto.md)

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


## apiUsersPut

> UsuarioDto apiUsersPut(usuarioDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // UsuarioDto (optional)
    usuarioDto: ...,
  } satisfies ApiUsersPutRequest;

  try {
    const data = await api.apiUsersPut(body);
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
| **usuarioDto** | [UsuarioDto](UsuarioDto.md) |  | [Optional] |

### Return type

[**UsuarioDto**](UsuarioDto.md)

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

