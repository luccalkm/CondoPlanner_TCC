# ResidentialLinksApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiResidentialLinksActiveCondominiumIdGet**](ResidentialLinksApi.md#apiresidentiallinksactivecondominiumidget) | **GET** /api/ResidentialLinks/active/{condominiumId} |  |
| [**apiResidentialLinksMyCondominiumIdGet**](ResidentialLinksApi.md#apiresidentiallinksmycondominiumidget) | **GET** /api/ResidentialLinks/my/{condominiumId} |  |
| [**apiResidentialLinksPendingCondominiumIdGet**](ResidentialLinksApi.md#apiresidentiallinkspendingcondominiumidget) | **GET** /api/ResidentialLinks/pending/{condominiumId} |  |
| [**apiResidentialLinksRequestPost**](ResidentialLinksApi.md#apiresidentiallinksrequestpost) | **POST** /api/ResidentialLinks/request |  |
| [**apiResidentialLinksReviewPost**](ResidentialLinksApi.md#apiresidentiallinksreviewpost) | **POST** /api/ResidentialLinks/review |  |



## apiResidentialLinksActiveCondominiumIdGet

> Array&lt;ResidentialLinkDto&gt; apiResidentialLinksActiveCondominiumIdGet(condominiumId)



### Example

```ts
import {
  Configuration,
  ResidentialLinksApi,
} from '';
import type { ApiResidentialLinksActiveCondominiumIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ResidentialLinksApi(config);

  const body = {
    // number
    condominiumId: 56,
  } satisfies ApiResidentialLinksActiveCondominiumIdGetRequest;

  try {
    const data = await api.apiResidentialLinksActiveCondominiumIdGet(body);
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

[**Array&lt;ResidentialLinkDto&gt;**](ResidentialLinkDto.md)

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


## apiResidentialLinksMyCondominiumIdGet

> ResidentialLinkDto apiResidentialLinksMyCondominiumIdGet(condominiumId)



### Example

```ts
import {
  Configuration,
  ResidentialLinksApi,
} from '';
import type { ApiResidentialLinksMyCondominiumIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ResidentialLinksApi(config);

  const body = {
    // number
    condominiumId: 56,
  } satisfies ApiResidentialLinksMyCondominiumIdGetRequest;

  try {
    const data = await api.apiResidentialLinksMyCondominiumIdGet(body);
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

[**ResidentialLinkDto**](ResidentialLinkDto.md)

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


## apiResidentialLinksPendingCondominiumIdGet

> Array&lt;ResidentialLinkDto&gt; apiResidentialLinksPendingCondominiumIdGet(condominiumId)



### Example

```ts
import {
  Configuration,
  ResidentialLinksApi,
} from '';
import type { ApiResidentialLinksPendingCondominiumIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ResidentialLinksApi(config);

  const body = {
    // number
    condominiumId: 56,
  } satisfies ApiResidentialLinksPendingCondominiumIdGetRequest;

  try {
    const data = await api.apiResidentialLinksPendingCondominiumIdGet(body);
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

[**Array&lt;ResidentialLinkDto&gt;**](ResidentialLinkDto.md)

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


## apiResidentialLinksRequestPost

> ResidentialLinkDto apiResidentialLinksRequestPost(createResidentialLinkRequest)



### Example

```ts
import {
  Configuration,
  ResidentialLinksApi,
} from '';
import type { ApiResidentialLinksRequestPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ResidentialLinksApi(config);

  const body = {
    // CreateResidentialLinkRequest (optional)
    createResidentialLinkRequest: ...,
  } satisfies ApiResidentialLinksRequestPostRequest;

  try {
    const data = await api.apiResidentialLinksRequestPost(body);
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
| **createResidentialLinkRequest** | [CreateResidentialLinkRequest](CreateResidentialLinkRequest.md) |  | [Optional] |

### Return type

[**ResidentialLinkDto**](ResidentialLinkDto.md)

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


## apiResidentialLinksReviewPost

> ResidentialLinkDto apiResidentialLinksReviewPost(reviewResidentialLinkRequest)



### Example

```ts
import {
  Configuration,
  ResidentialLinksApi,
} from '';
import type { ApiResidentialLinksReviewPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ResidentialLinksApi(config);

  const body = {
    // ReviewResidentialLinkRequest (optional)
    reviewResidentialLinkRequest: ...,
  } satisfies ApiResidentialLinksReviewPostRequest;

  try {
    const data = await api.apiResidentialLinksReviewPost(body);
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
| **reviewResidentialLinkRequest** | [ReviewResidentialLinkRequest](ReviewResidentialLinkRequest.md) |  | [Optional] |

### Return type

[**ResidentialLinkDto**](ResidentialLinkDto.md)

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

