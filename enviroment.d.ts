export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ClientToken: string;
            MongoURI: string;
            ClientGuildId: string;
        }
    }
}
