interface CacheEntry {
    data: any;
    expiry: number;
}

class Cache {
    private store: Map<string, CacheEntry>;
    private defaultTTL: number;

    constructor(defaultTTL: number = 3600) {
        this.store = new Map();
        this.defaultTTL = defaultTTL;
    }

    set(key: string, data: any, ttl: number = this.defaultTTL): void {
        const expiry = Date.now() + ttl * 1000;
        this.store.set(key, { data, expiry });
    }

    get(key: string): any | null {
        const entry = this.store.get(key);
        if (!entry) {
            return null;
        }
        if (Date.now() > entry.expiry) {
            this.store.delete(key);

            return null;
        }

        return entry.data;
    }

    delete(key: string): void {
        this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }
}

export default Cache;
