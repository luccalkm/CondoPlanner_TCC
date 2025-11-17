# PackageApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiPackageCondominiumCondominiumIdGet**](PackageApi.md#apipackagecondominiumcondominiumidget) | **GET** /api/Package/Condominium/{condominiumId} |  |
| [**apiPackageIdDelete**](PackageApi.md#apipackageiddelete) | **DELETE** /api/Package/{id} |  |
| [**apiPackageIdGet**](PackageApi.md#apipackageidget) | **GET** /api/Package/{id} |  |
| [**apiPackageIdPut**](PackageApi.md#apipackageidput) | **PUT** /api/Package/{id} |  |
| [**apiPackageIdUpdateStatusPatch**](PackageApi.md#apipackageidupdatestatuspatch) | **PATCH** /api/Package/{id}/UpdateStatus |  |
| [**apiPackageLinkResidentialLinkIdGet**](PackageApi.md#apipackagelinkresidentiallinkidget) | **GET** /api/Package/Link/{residentialLinkId} |  |
| [**apiPackagePost**](PackageApi.md#apipackagepost) | **POST** /api/Package |  |



## apiPackageCondominiumCondominiumIdGet

> Array&lt;PackageDto&gt; apiPackageCondominiumCondominiumIdGet(condominiumId)



### Example

```ts
import {
  Configuration,
  PackageApi,
} from '';
import type { ApiPackageCondominiumCondominiumIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PackageApi(config);

  const body = {
    // number
    condominiumId: 56,
  } satisfies ApiPackageCondominiumCondominiumIdGetRequest;

  try {
    const data = await api.apiPackageCondominiumCondominiumIdGet(body);
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

[**Array&lt;PackageDto&gt;**](PackageDto.md)

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


## apiPackageIdDelete

> apiPackageIdDelete(id)



### Example

```ts
import {
  Configuration,
  PackageApi,
} from '';
import type { ApiPackageIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PackageApi(config);

  const body = {
    // number
    id: 56,
  } satisfies ApiPackageIdDeleteRequest;

  try {
    const data = await api.apiPackageIdDelete(body);
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


## apiPackageIdGet

> PackageDto apiPackageIdGet(id)



### Example

```ts
import {
  Configuration,
  PackageApi,
} from '';
import type { ApiPackageIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PackageApi(config);

  const body = {
    // number
    id: 56,
  } satisfies ApiPackageIdGetRequest;

  try {
    const data = await api.apiPackageIdGet(body);
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

[**PackageDto**](PackageDto.md)

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


## apiPackageIdPut

> apiPackageIdPut(id, updatePackageInput)



### Example

```ts
import {
  Configuration,
  PackageApi,
} from '';
import type { ApiPackageIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PackageApi(config);

  const body = {
    // number
    id: 56,
    // UpdatePackageInput (optional)
    updatePackageInput: ...,
  } satisfies ApiPackageIdPutRequest;

  try {
    const data = await api.apiPackageIdPut(body);
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
| **updatePackageInput** | [UpdatePackageInput](UpdatePackageInput.md) |  | [Optional] |

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


## apiPackageIdUpdateStatusPatch

> apiPackageIdUpdateStatusPatch(id, updatePackageStatusInput)



### Example

```ts
import {
  Configuration,
  PackageApi,
} from '';
import type { ApiPackageIdUpdateStatusPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PackageApi(config);

  const body = {
    // number
    id: 56,
    // UpdatePackageStatusInput (optional)
    updatePackageStatusInput: ...,
  } satisfies ApiPackageIdUpdateStatusPatchRequest;

  try {
    const data = await api.apiPackageIdUpdateStatusPatch(body);
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
| **updatePackageStatusInput** | [UpdatePackageStatusInput](UpdatePackageStatusInput.md) |  | [Optional] |

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


## apiPackageLinkResidentialLinkIdGet

> Array&lt;PackageDto&gt; apiPackageLinkResidentialLinkIdGet(residentialLinkId)



### Example

```ts
import {
  Configuration,
  PackageApi,
} from '';
import type { ApiPackageLinkResidentialLinkIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PackageApi(config);

  const body = {
    // number
    residentialLinkId: 56,
  } satisfies ApiPackageLinkResidentialLinkIdGetRequest;

  try {
    const data = await api.apiPackageLinkResidentialLinkIdGet(body);
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
| **residentialLinkId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;PackageDto&gt;**](PackageDto.md)

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


## apiPackagePost

> apiPackagePost(createPackageInput)



### Example

```ts
import {
  Configuration,
  PackageApi,
} from '';
import type { ApiPackagePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PackageApi(config);

  const body = {
    // CreatePackageInput (optional)
    createPackageInput: ...,
  } satisfies ApiPackagePostRequest;

  try {
    const data = await api.apiPackagePost(body);
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
| **createPackageInput** | [CreatePackageInput](CreatePackageInput.md) |  | [Optional] |

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

