import { NextApiRequest, NextApiResponse } from "next";

interface CacheEntry {
  data: any;
  timestamp: number;
}

interface Cache {
  get(key: string): CacheEntry | undefined;
  set(key: string, value: CacheEntry): void;
}

const cache: Cache = new Map();

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export function withApiCache(handler: ApiHandler): ApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const cacheKey = `${req.method}-${req.url}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse && Date.now() - cachedResponse.timestamp < 60000) {
      return res.status(200).json(cachedResponse.data);
    }

    const originalJson = res.json;
    res.json = function (data: any) {
      cache.set(cacheKey, { data, timestamp: Date.now() });
      return originalJson.call(this, data);
    };

    return handler(req, res);
  };
}
