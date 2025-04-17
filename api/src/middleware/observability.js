const morgan = require('morgan');
const promClient = require('prom-client');

const requestDurationHistogram = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Histogram of HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5, 10],
});

const requestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const requestLogger = morgan('combined');

const monitorRequests = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const durationInSeconds = getDurationInSeconds(start);
    const route = req.route?.path || req.originalUrl || req.url;

    requestDurationHistogram
      .labels(req.method, route, res.statusCode)
      .observe(durationInSeconds);

    requestCounter
      .labels(req.method, route, res.statusCode)
      .inc();

    console.log(`[OBSERVABILITY] ${req.method} ${route} - ${res.statusCode} - ${durationInSeconds.toFixed(3)}s`);
  });

  next();
};

function getDurationInSeconds(start) {
  const diff = process.hrtime(start);
  return diff[0] + diff[1] / 1e9;
}

module.exports = {
  requestLogger,
  monitorRequests,
};
