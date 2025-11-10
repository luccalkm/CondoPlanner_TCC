# CondominiumInviteApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiCondominiumAcceptInvitePost**](CondominiumInviteApi.md#apicondominiumacceptinvitepost) | **POST** /api/Condominium/AcceptInvite |  |
| [**apiCondominiumInvitesPost**](CondominiumInviteApi.md#apicondominiuminvitespost) | **POST** /api/Condominium/Invites |  |



## apiCondominiumAcceptInvitePost

> AcceptInviteResponse apiCondominiumAcceptInvitePost(acceptInviteRequest)



### Example

```ts
import {
  Configuration,
  CondominiumInviteApi,
} from '';
import type { ApiCondominiumAcceptInvitePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CondominiumInviteApi(config);

  const body = {
    // AcceptInviteRequest (optional)
    acceptInviteRequest: ...,
  } satisfies ApiCondominiumAcceptInvitePostRequest;

  try {
    const data = await api.apiCondominiumAcceptInvitePost(body);
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
| **acceptInviteRequest** | [AcceptInviteRequest](AcceptInviteRequest.md) |  | [Optional] |

### Return type

[**AcceptInviteResponse**](AcceptInviteResponse.md)

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


## apiCondominiumInvitesPost

> GenerateInviteResponse apiCondominiumInvitesPost(generateInviteRequest)



### Example

```ts
import {
  Configuration,
  CondominiumInviteApi,
} from '';
import type { ApiCondominiumInvitesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CondominiumInviteApi(config);

  const body = {
    // GenerateInviteRequest (optional)
    generateInviteRequest: ...,
  } satisfies ApiCondominiumInvitesPostRequest;

  try {
    const data = await api.apiCondominiumInvitesPost(body);
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
| **generateInviteRequest** | [GenerateInviteRequest](GenerateInviteRequest.md) |  | [Optional] |

### Return type

[**GenerateInviteResponse**](GenerateInviteResponse.md)

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

