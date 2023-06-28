import Dexie, { Table } from 'dexie';
import { createContext, useContext } from 'react';

export interface Key {
    id?: number;
    key: CryptoKey;
    timestamp: Date;
}

export interface DbKeyPair {
    privateKey: Key;
    publicKey: Key;
}

export class DexieSubclass extends Dexie {
    publicKeys!: Table<Key>;
    privateKeys!: Table<Key>;

    constructor() {
        super('chatty');
        this.version(1).stores({
            publicKeys: '++id, key, timestamp',
            privateKeys: '++id, key, timestamp',
        });
    }
}

export const keyDB = new DexieSubclass();

export class DbService {
    keyDB = new DexieSubclass();

    resetDb = async () => {
        await this.keyDB.privateKeys.clear();
        await this.keyDB.publicKeys.clear();
    };

    login = async (keyPair: CryptoKeyPair) => {
        await keyDB.privateKeys.add({
            key: keyPair.privateKey,
            timestamp: new Date(),
        } as Key);
        await keyDB.publicKeys.add({
            key: keyPair.publicKey,
            timestamp: new Date(),
        } as Key);
    };

    getKeyPair = async (): Promise<DbKeyPair | undefined> => {
        const privateKey = await keyDB.privateKeys.orderBy('timestamp').last();
        const publicKey = await keyDB.publicKeys.orderBy('timestamp').last();

        if (!privateKey || !publicKey) return;

        return {
            privateKey,
            publicKey,
        };
    };

    getCache = async () => {
        const keyPair = await this.getKeyPair();
        if (!keyPair) return;

        return {
            keyPair,
        };
    };
}
export const dbService = new DbService();

export const DbContext = createContext<DbService>(dbService);

export const useDb = () => {
    return useContext(DbContext);
};
