# WeatherForecastApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**weatherForecastGet**](WeatherForecastApi.md#weatherforecastget) | **GET** /WeatherForecast |  |



## weatherForecastGet

> Array&lt;WeatherForecast&gt; weatherForecastGet()



### Example

```ts
import {
  Configuration,
  WeatherForecastApi,
} from '';
import type { WeatherForecastGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WeatherForecastApi(config);

  try {
    const data = await api.weatherForecastGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;WeatherForecast&gt;**](WeatherForecast.md)

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

