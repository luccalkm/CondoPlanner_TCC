# CommonAreaApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiCommonAreaCondominiumCondominiumIdGet**](CommonAreaApi.md#apicommonareacondominiumcondominiumidget) | **GET** /api/CommonArea/Condominium/{condominiumId} |  |
| [**apiCommonAreaIdGet**](CommonAreaApi.md#apicommonareaidget) | **GET** /api/CommonArea/{id} |  |
| [**apiCommonAreaPhotosPhotoIdDelete**](CommonAreaApi.md#apicommonareaphotosphotoiddelete) | **DELETE** /api/CommonArea/Photos/{photoId} |  |
| [**apiCommonAreaPhotosUploadPost**](CommonAreaApi.md#apicommonareaphotosuploadpost) | **POST** /api/CommonArea/Photos/Upload |  |
| [**apiCommonAreaUpsertPost**](CommonAreaApi.md#apicommonareaupsertpost) | **POST** /api/CommonArea/Upsert |  |



## apiCommonAreaCondominiumCondominiumIdGet

> Array&lt;CommonAreaDto&gt; apiCommonAreaCondominiumCondominiumIdGet(condominiumId)



### Example

```ts
import {
  Configuration,
  CommonAreaApi,
} from '';
import type { ApiCommonAreaCondominiumCondominiumIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommonAreaApi(config);

  const body = {
    // number
    condominiumId: 56,
  } satisfies ApiCommonAreaCondominiumCondominiumIdGetRequest;

  try {
    const data = await api.apiCommonAreaCondominiumCondominiumIdGet(body);
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
| **condominiumId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;CommonAreaDto&gt;**](CommonAreaDto.md)

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


## apiCommonAreaIdGet

> CommonAreaDto apiCommonAreaIdGet(id)



### Example

```ts
import {
  Configuration,
  CommonAreaApi,
} from '';
import type { ApiCommonAreaIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommonAreaApi(config);

  const body = {
    // number
    id: 56,
  } satisfies ApiCommonAreaIdGetRequest;

  try {
    const data = await api.apiCommonAreaIdGet(body);
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

[**CommonAreaDto**](CommonAreaDto.md)

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


## apiCommonAreaPhotosPhotoIdDelete

> apiCommonAreaPhotosPhotoIdDelete(photoId)



### Example

```ts
import {
  Configuration,
  CommonAreaApi,
} from '';
import type { ApiCommonAreaPhotosPhotoIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommonAreaApi(config);

  const body = {
    // number
    photoId: 56,
  } satisfies ApiCommonAreaPhotosPhotoIdDeleteRequest;

  try {
    const data = await api.apiCommonAreaPhotosPhotoIdDelete(body);
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
| **photoId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiCommonAreaPhotosUploadPost

> apiCommonAreaPhotosUploadPost(uploadCommonAreaPhotoInput)



### Example

```ts
import {
  Configuration,
  CommonAreaApi,
} from '';
import type { ApiCommonAreaPhotosUploadPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommonAreaApi(config);

  const body = {
    // UploadCommonAreaPhotoInput (optional)
    uploadCommonAreaPhotoInput: ...,
  } satisfies ApiCommonAreaPhotosUploadPostRequest;

  try {
    const data = await api.apiCommonAreaPhotosUploadPost(body);
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
| **uploadCommonAreaPhotoInput** | [UploadCommonAreaPhotoInput](UploadCommonAreaPhotoInput.md) |  | [Optional] |

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


## apiCommonAreaUpsertPost

> apiCommonAreaUpsertPost(upsertCommonAreaInput)



### Example

```ts
import {
  Configuration,
  CommonAreaApi,
} from '';
import type { ApiCommonAreaUpsertPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommonAreaApi(config);

  const body = {
    // UpsertCommonAreaInput (optional)
    upsertCommonAreaInput: ...,
  } satisfies ApiCommonAreaUpsertPostRequest;

  try {
    const data = await api.apiCommonAreaUpsertPost(body);
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
| **upsertCommonAreaInput** | [UpsertCommonAreaInput](UpsertCommonAreaInput.md) |  | [Optional] |

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

