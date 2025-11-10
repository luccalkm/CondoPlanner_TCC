# CommonAreaApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiCommonAreaAreasAreaIdPhotosGet**](CommonAreaApi.md#apicommonareaareasareaidphotosget) | **GET** /api/CommonArea/Areas/{areaId}/Photos |  |
| [**apiCommonAreaCondominiumCondominiumIdGet**](CommonAreaApi.md#apicommonareacondominiumcondominiumidget) | **GET** /api/CommonArea/Condominium/{condominiumId} |  |
| [**apiCommonAreaIdGet**](CommonAreaApi.md#apicommonareaidget) | **GET** /api/CommonArea/{id} |  |
| [**apiCommonAreaPhotosPhotoIdDelete**](CommonAreaApi.md#apicommonareaphotosphotoiddelete) | **DELETE** /api/CommonArea/Photos/{photoId} |  |
| [**apiCommonAreaPhotosPhotoIdGet**](CommonAreaApi.md#apicommonareaphotosphotoidget) | **GET** /api/CommonArea/Photos/{photoId} |  |
| [**apiCommonAreaPhotosPhotoIdRawGet**](CommonAreaApi.md#apicommonareaphotosphotoidrawget) | **GET** /api/CommonArea/Photos/{photoId}/Raw |  |
| [**apiCommonAreaPhotosUploadPost**](CommonAreaApi.md#apicommonareaphotosuploadpost) | **POST** /api/CommonArea/Photos/Upload |  |
| [**apiCommonAreaUpsertPost**](CommonAreaApi.md#apicommonareaupsertpost) | **POST** /api/CommonArea/Upsert |  |



## apiCommonAreaAreasAreaIdPhotosGet

> Array&lt;CommonAreaPhotoDto&gt; apiCommonAreaAreasAreaIdPhotosGet(areaId, includeData)



### Example

```ts
import {
  Configuration,
  CommonAreaApi,
} from '';
import type { ApiCommonAreaAreasAreaIdPhotosGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CommonAreaApi(config);

  const body = {
    // number
    areaId: 56,
    // boolean (optional)
    includeData: true,
  } satisfies ApiCommonAreaAreasAreaIdPhotosGetRequest;

  try {
    const data = await api.apiCommonAreaAreasAreaIdPhotosGet(body);
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
| **areaId** | `number` |  | [Defaults to `undefined`] |
| **includeData** | `boolean` |  | [Optional] [Defaults to `false`] |

### Return type

[**Array&lt;CommonAreaPhotoDto&gt;**](CommonAreaPhotoDto.md)

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


## apiCommonAreaPhotosPhotoIdGet

> CommonAreaPhotoDto apiCommonAreaPhotosPhotoIdGet(photoId, includeData)



### Example

```ts
import {
  Configuration,
  CommonAreaApi,
} from '';
import type { ApiCommonAreaPhotosPhotoIdGetRequest } from '';

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
    // boolean (optional)
    includeData: true,
  } satisfies ApiCommonAreaPhotosPhotoIdGetRequest;

  try {
    const data = await api.apiCommonAreaPhotosPhotoIdGet(body);
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
| **includeData** | `boolean` |  | [Optional] [Defaults to `false`] |

### Return type

[**CommonAreaPhotoDto**](CommonAreaPhotoDto.md)

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


## apiCommonAreaPhotosPhotoIdRawGet

> apiCommonAreaPhotosPhotoIdRawGet(photoId)



### Example

```ts
import {
  Configuration,
  CommonAreaApi,
} from '';
import type { ApiCommonAreaPhotosPhotoIdRawGetRequest } from '';

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
  } satisfies ApiCommonAreaPhotosPhotoIdRawGetRequest;

  try {
    const data = await api.apiCommonAreaPhotosPhotoIdRawGet(body);
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

