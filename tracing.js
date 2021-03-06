"use strict";

const { NodeTracerProvider } = require("@opentelemetry/node");
const { BatchSpanProcessor } = require("@opentelemetry/tracing");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new BatchSpanProcessor(new JaegerExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [new HttpInstrumentation()],
});
