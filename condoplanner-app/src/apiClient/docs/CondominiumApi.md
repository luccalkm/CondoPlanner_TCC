# CondominiumApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiCondominiumAddUserToCondominiumPost**](CondominiumApi.md#apicondominiumaddusertocondominiumpost) | **POST** /api/Condominium/AddUserToCondominium |  |
| [**apiCondominiumCondominioIdUsersGet**](CondominiumApi.md#apicondominiumcondominioidusersget) | **GET** /api/Condominium/{condominioId}/Users |  |
| [**apiCondominiumCreateOrEditPost**](CondominiumApi.md#apicondominiumcreateoreditpost) | **POST** /api/Condominium/CreateOrEdit |  |
| [**apiCondominiumGetAllUserIdGet**](CondominiumApi.md#apicondominiumgetalluseridget) | **GET** /api/Condominium/GetAll/{userId} |  |



## apiCondominiumAddUserToCondominiumPost

> apiCondominiumAddUserToCondominiumPost(addUserToCondominiumInput)



### Example

```ts
import {
  Configuration,
  CondominiumApi,
} from '';
import type { ApiCondominiumAddUserToCondominiumPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CondominiumApi(config);

  const body = {
    // AddUserToCondominiumInput (optional)
    addUserToCondominiumInput: ...,
  } satisfies ApiCondominiumAddUserToCondominiumPostRequest;

  try {
    const data = await api.apiCondominiumAddUserToCondominiumPost(body);
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
| **addUserToCondominiumInput** | [AddUserToCondominiumInput](AddUserToCondominiumInput.md) |  | [Optional] |

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


## apiCondominiumCondominioIdUsersGet

> Array&lt;UsuarioDto&gt; apiCondominiumCondominioIdUsersGet(condominioId)



### Example

```ts
import {
  Configuration,
  CondominiumApi,
} from '';
import type { ApiCondominiumCondominioIdUsersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CondominiumApi(config);

  const body = {
    // number
    condominioId: 56,
  } satisfies ApiCondominiumCondominioIdUsersGetRequest;

  try {
    const data = await api.apiCondominiumCondominioIdUsersGet(body);
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
| **condominioId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;UsuarioDto&gt;**](UsuarioDto.md)

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


## apiCondominiumCreateOrEditPost

> apiCondominiumCreateOrEditPost(createOrEditCondominiumInput)



### Example

```ts
import {
  Configuration,
  CondominiumApi,
} from '';
import type { ApiCondominiumCreateOrEditPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CondominiumApi(config);

  const body = {
    // CreateOrEditCondominiumInput (optional)
    createOrEditCondominiumInput: ...,
  } satisfies ApiCondominiumCreateOrEditPostRequest;

  try {
    const data = await api.apiCondominiumCreateOrEditPost(body);
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
| **createOrEditCondominiumInput** | [CreateOrEditCondominiumInput](CreateOrEditCondominiumInput.md) |  | [Optional] |

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


## apiCondominiumGetAllUserIdGet

> Array&lt;UsuarioCondominioDto&gt; apiCondominiumGetAllUserIdGet(userId)



### Example

```ts
import {
  Configuration,
  CondominiumApi,
} from '';
import type { ApiCondominiumGetAllUserIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CondominiumApi(config);

  const body = {
    // number
    userId: 56,
  } satisfies ApiCondominiumGetAllUserIdGetRequest;

  try {
    const data = await api.apiCondominiumGetAllUserIdGet(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;UsuarioCondominioDto&gt;**](UsuarioCondominioDto.md)

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

