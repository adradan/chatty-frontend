import Dexie, { Table } from 'dexie';
import { createContext, useContext } from 'react';

export interface Key {
    id?: number;
    key: CryptoKey;
    timestamp: Date;
    userId: number;
}

export interface Username {
    id?: number;
    username: string;
    timestamp: Date;
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
            usernames: '++id, username, timestamp',
        });
    }
}

export const keyDB = new DexieSubclass();

export class DbService {
    keyDB = new DexieSubclass();

    resetDb = async () => {
        await this.keyDB.privateKeys.clear();
        await this.keyDB.publicKeys.clear();
        await this.keyDB.usernames.clear();
    };

    login = async (keyPair: CryptoKeyPair, username: string) => {
        const userId = await keyDB.usernames.add({
            username,
            timestamp: new Date(),
        });
        await keyDB.privateKeys.add({
            key: keyPair.privateKey,
            timestamp: new Date(),
            userId,
        } as Key);
        await keyDB.publicKeys.add({
            key: keyPair.publicKey,
            timestamp: new Date(),
            userId,
        } as Key);
    };

    getUsername = async () => {
        const usr = await keyDB.usernames.orderBy('timestamp').last();

        if (!usr) return;
        return usr.username;
    };
    getKeyPair = async () => {
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
        const username = await this.getUsername();
        if (!keyPair || !username) return;

        return {
            keyPair,
            username,
        };
    };
}
export const dbService = new DbService();

export const DbContext = createContext<DbService>(dbService);

export const useDb = () => {
    return useContext(DbContext);
};
