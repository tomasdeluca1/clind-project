const cache = new Map();

export function withApiCache(handler) {
  return async (req, res) => {
    const cacheKey = `${req.method}-${req.url}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse && Date.now() - cachedResponse.timestamp < 60000) {
      return res.status(200).json(cachedResponse.data);
    }

    // Modify res.json to intercept and cache the response
    const originalJson = res.json;
    res.json = function (data) {
      cache.set(cacheKey, { data, timestamp: Date.now() });
      originalJson.call(this, data);
    };

    return handler(req, res);
  };
}
