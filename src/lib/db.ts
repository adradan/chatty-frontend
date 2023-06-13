import Dexie, { Table } from 'dexie';

export interface Key {
    id?: number;
    key: CryptoKey;
    timestamp: Date;
    userId: number;
}

export interface Username {
    id?: number;
    username: string;
}

export class DexieSubclass extends Dexie {
    publicKeys!: Table<Key>;
    privateKeys!: Table<Key>;
    usernames!: Table<Username>;

    constructor() {
        super('chatty');
        this.version(1).stores({
            publicKeys: '++id, key, timestamp',
            privateKeys: '++id, key, timestamp',
            usernames: '++id, username',
        });
    }
}

export const keyDB = new DexieSubclass();
