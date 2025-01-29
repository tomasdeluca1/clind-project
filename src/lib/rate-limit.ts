type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: Options) {
  const tokenCache = new Map<string, { count: number; expires: number }>();
  const interval = options?.interval || 60000;

  return {
    check: (res: Response, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const now = Date.now();
        const tokenData = tokenCache.get(token) || {
          count: 0,
          expires: now + interval,
        };

        if (tokenData.expires < now) {
          tokenData.count = 0;
          tokenData.expires = now + interval;
        }

        tokenData.count += 1;
        tokenCache.set(token, tokenData);

        const currentUsage = tokenData.count;
        const isRateLimited = currentUsage > limit;

        res.headers.set("X-RateLimit-Limit", limit.toString());
        res.headers.set(
          "X-RateLimit-Remaining",
          isRateLimited ? "0" : (limit - currentUsage).toString()
        );

        return isRateLimited ? reject() : resolve();
      }),
  };
}
