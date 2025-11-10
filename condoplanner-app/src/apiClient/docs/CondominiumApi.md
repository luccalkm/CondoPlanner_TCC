# CondominiumApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiCondominiumCondominioIdRelationsGet**](CondominiumApi.md#apicondominiumcondominioidrelationsget) | **GET** /api/Condominium/{condominioId}/Relations |  |
| [**apiCondominiumCondominioIdUsersGet**](CondominiumApi.md#apicondominiumcondominioidusersget) | **GET** /api/Condominium/{condominioId}/Users |  |
| [**apiCondominiumCreateOrEditPost**](CondominiumApi.md#apicondominiumcreateoreditpost) | **POST** /api/Condominium/CreateOrEdit |  |
| [**apiCondominiumGetAllUserIdGet**](CondominiumApi.md#apicondominiumgetalluseridget) | **GET** /api/Condominium/GetAll/{userId} |  |
| [**apiCondominiumUpsertUserCondominiumPost**](CondominiumApi.md#apicondominiumupsertusercondominiumpost) | **POST** /api/Condominium/UpsertUserCondominium |  |



## apiCondominiumCondominioIdRelationsGet

> Array&lt;UserCondominiumDto&gt; apiCondominiumCondominioIdRelationsGet(condominioId)



### Example

```ts
import {
  Configuration,
  CondominiumApi,
} from '';
import type { ApiCondominiumCondominioIdRelationsGetRequest } from '';

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
  } satisfies ApiCondominiumCondominioIdRelationsGetRequest;

  try {
    const data = await api.apiCondominiumCondominioIdRelationsGet(body);
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

[**Array&lt;UserCondominiumDto&gt;**](UserCondominiumDto.md)

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


## apiCondominiumCondominioIdUsersGet

> Array&lt;UserDto&gt; apiCondominiumCondominioIdUsersGet(condominioId)



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

[**Array&lt;UserDto&gt;**](UserDto.md)

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

> Array&lt;UserCondominiumDto&gt; apiCondominiumGetAllUserIdGet(userId)



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

[**Array&lt;UserCondominiumDto&gt;**](UserCondominiumDto.md)

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


## apiCondominiumUpsertUserCondominiumPost

> apiCondominiumUpsertUserCondominiumPost(upsertUserCondominiumInput)



### Example

```ts
import {
  Configuration,
  CondominiumApi,
} from '';
import type { ApiCondominiumUpsertUserCondominiumPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CondominiumApi(config);

  const body = {
    // UpsertUserCondominiumInput (optional)
    upsertUserCondominiumInput: ...,
  } satisfies ApiCondominiumUpsertUserCondominiumPostRequest;

  try {
    const data = await api.apiCondominiumUpsertUserCondominiumPost(body);
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
| **upsertUserCondominiumInput** | [UpsertUserCondominiumInput](UpsertUserCondominiumInput.md) |  | [Optional] |

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

