## Files

- `app.js`: the application we want to trace
- `tracing.js`: the tracing initialization script, used in the `node -r` option before application code runs

## NodeTracerProvider

To use OpenTelemetry in nodejs, we need create a NodeTracerProvider instance and register it. The "register" means "activate". A tracer provider is used to create one or more `tracer` objects.

A `tracer` is an interface provided by the OpenTelemetry API. It is responsible for tracking the active `span` in your process.

A `span` is an unit of work in a trace. A `trace` tracks the progression of a single request. A `trace` is a tree of `span`.

> Generally, the lifecycle of a span resembles the following:
>
> 1. A request is received by a service. The span context is extracted from the request headers, if it exists.
> 2. A new span is created as a child of the extracted span context; if none exists, a new root span is created.
> 3. The service handles the request. Additional attributes and events are added to the span that are useful for understanding the context of the request, such as the hostname of the machine handling the request, or customer identifiers.
> 4. New spans may be created to represent work being done by sub-components of the service.
> 5. When the service makes a remote call to another service, the current span context is serialized and forwarded to the next service by injecting the span context into the headers or message envelope.
> 6. The work being done by the service completes, successfully or not. The span status is appropriately set, and the span is marked finished.

Back to our code, after we register the NodeTracerProvider, our application will create and propagate traces over HTTP. If an already instrumented service that supports Trace Context headers calls your application using HTTP, and you call another application using HTTP, the Trace Context headers will be correctly propagated.

## Instrument

OpenTelemetry JS support both manual and automatic instrumentation. We use HttpInstrumentaion to automatically instrument all http request.

## Export Data

Once you’ve created telemetry data, you’ll want to send it somewhere. We export our data to jaeger by using `@opentelemetry/exporter-jaeger`.

OpenTelemetry doesn't provide the "exporter" concept, so we use the [`span processor` interface](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#span-processor) to export span data to jaeger.