const { config } = require('./config');

function getTmdbApiKey() {
  // 1. Read from process.env.TMDB_API_KEY first
  if (process.env.TMDB_API_KEY && typeof process.env.TMDB_API_KEY === 'string' && process.env.TMDB_API_KEY.trim()) {
    return process.env.TMDB_API_KEY.trim();
  }

  // 2. Fallback to process.env.TMDB_API_KEYS (parse JSON array)
  if (process.env.TMDB_API_KEYS) {
    try {
      const parsed = typeof process.env.TMDB_API_KEYS === 'string'
        ? JSON.parse(process.env.TMDB_API_KEYS)
        : process.env.TMDB_API_KEYS;
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid = parsed.map(k => String(k).trim()).filter(Boolean);
        if (valid.length > 0) {
          const idx = Math.floor(Math.random() * valid.length);
          return valid[idx];
        }
      }
    } catch {
      if (typeof process.env.TMDB_API_KEYS === 'string') {
        const parts = process.env.TMDB_API_KEYS.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
        if (parts.length > 0) {
          const idx = Math.floor(Math.random() * parts.length);
          return parts[idx];
        }
      }
    }
  }

  // 3. Fallback to config multi-keys if populated
  if (config && Array.isArray(config.tmdbApiKeys) && config.tmdbApiKeys.length > 0) {
    const idx = Math.floor(Math.random() * config.tmdbApiKeys.length);
    return config.tmdbApiKeys[idx];
  }

  // 4. Fallback to config single key
  if (config && config.tmdbApiKey && typeof config.tmdbApiKey === 'string' && config.tmdbApiKey.trim()) {
    return config.tmdbApiKey.trim();
  }

  return null;
}

module.exports = { getTmdbApiKey };
