# ReservationApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiReservationAreaAreaIdGet**](ReservationApi.md#apireservationareaareaidget) | **GET** /api/Reservation/Area/{areaId} |  |
| [**apiReservationPost**](ReservationApi.md#apireservationpost) | **POST** /api/Reservation |  |
| [**apiReservationReservationIdApprovePost**](ReservationApi.md#apireservationreservationidapprovepost) | **POST** /api/Reservation/{reservationId}/Approve |  |
| [**apiReservationReservationIdCancelPost**](ReservationApi.md#apireservationreservationidcancelpost) | **POST** /api/Reservation/{reservationId}/Cancel |  |



## apiReservationAreaAreaIdGet

> Array&lt;ReservationDto&gt; apiReservationAreaAreaIdGet(areaId, start, end)



### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { ApiReservationAreaAreaIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // number
    areaId: 56,
    // Date (optional)
    start: 2013-10-20T19:20:30+01:00,
    // Date (optional)
    end: 2013-10-20T19:20:30+01:00,
  } satisfies ApiReservationAreaAreaIdGetRequest;

  try {
    const data = await api.apiReservationAreaAreaIdGet(body);
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
| **start** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **end** | `Date` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ReservationDto&gt;**](ReservationDto.md)

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


## apiReservationPost

> apiReservationPost(createReservationInput)



### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { ApiReservationPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // CreateReservationInput (optional)
    createReservationInput: ...,
  } satisfies ApiReservationPostRequest;

  try {
    const data = await api.apiReservationPost(body);
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
| **createReservationInput** | [CreateReservationInput](CreateReservationInput.md) |  | [Optional] |

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


## apiReservationReservationIdApprovePost

> apiReservationReservationIdApprovePost(reservationId, approveRequest)



### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { ApiReservationReservationIdApprovePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // number
    reservationId: 56,
    // ApproveRequest (optional)
    approveRequest: ...,
  } satisfies ApiReservationReservationIdApprovePostRequest;

  try {
    const data = await api.apiReservationReservationIdApprovePost(body);
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
| **reservationId** | `number` |  | [Defaults to `undefined`] |
| **approveRequest** | [ApproveRequest](ApproveRequest.md) |  | [Optional] |

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


## apiReservationReservationIdCancelPost

> apiReservationReservationIdCancelPost(reservationId)



### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { ApiReservationReservationIdCancelPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // number
    reservationId: 56,
  } satisfies ApiReservationReservationIdCancelPostRequest;

  try {
    const data = await api.apiReservationReservationIdCancelPost(body);
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
| **reservationId** | `number` |  | [Defaults to `undefined`] |

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

