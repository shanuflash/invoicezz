const rateLimit = (options = {}) => {
  const {
    interval = 60 * 1000,
    uniqueTokenPerInterval = 500,
    limit = 60,
  } = options;

  const tokenCache = new Map();

  let cleanupTimer;
  const scheduleCleanup = () => {
    if (cleanupTimer) return;
    cleanupTimer = setTimeout(() => {
      cleanupTimer = null;
      const now = Date.now();
      for (const [key, entry] of tokenCache) {
        if (now - entry.timestamp > interval) {
          tokenCache.delete(key);
        }
      }
      if (tokenCache.size > uniqueTokenPerInterval) {
        const sorted = [...tokenCache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp);
        const excess = sorted.slice(0, sorted.length - uniqueTokenPerInterval);
        for (const [key] of excess) tokenCache.delete(key);
      }
    }, interval);
  };

  return {
    check: (token) => {
      const now = Date.now();
      const entry = tokenCache.get(token);

      if (!entry || now - entry.timestamp > interval) {
        tokenCache.set(token, { count: 1, timestamp: now });
        scheduleCleanup();
        return { success: true, remaining: limit - 1, limit };
      }

      entry.count += 1;

      if (entry.count > limit) {
        return { success: false, remaining: 0, limit };
      }

      scheduleCleanup();
      return { success: true, remaining: limit - entry.count, limit };
    },
  };
};

export const pageRateLimiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
  limit: 60,
});

export const apiRateLimiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
  limit: 20,
});
