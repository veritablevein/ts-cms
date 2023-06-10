enum cacheType {
  Local,
  Session
}

class cache {
  storage: Storage
  constructor(type: cacheType) {
    this.storage = type === cacheType.Local ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    if (value !== undefined && value !== null) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear()
  }
}

const localCache = new cache(cacheType.Local)
const sessionCache = new cache(cacheType.Session)
export { localCache, sessionCache }
