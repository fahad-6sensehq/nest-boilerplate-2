import * as dotenv from 'dotenv';
dotenv.config();

export interface IConfig {
    port: number;
    mongodbURL: string;
    dbName: string;
    serverType: string;
    dbQuery: string;
    jwtSecret: string;
    redisHost: string;
    redisPort: number;
}

const getAppConfig = (): IConfig => {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const mongodbURL = process.env.MONGODB_URL || '';
    const dbName = process.env.DB_NAME || '';
    const serverType = process.env.SERVER_TYPE || '';
    const dbQuery = process.env.DB_QUERY || '';
    const jwtSecret = process.env.JWT_SECRET || '';
    const redisHost = process.env.REDIS_HOST || '';
    const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;

    if (!port) console.log('port must be specified');
    if (!mongodbURL) console.log('mongodbURL must be specified');
    if (!dbName) console.log('dbName must be specified');
    if (!serverType) console.log('serverType must be specified');
    if (!dbQuery) console.log('dbQuery must be specified');
    if (!jwtSecret) console.log('jwtSecret must be specified');
    if (!redisHost) console.log('redisHost must be specified');
    if (!redisPort) console.log('redisPort must be specified');

    return {
        port,
        mongodbURL,
        dbName,
        serverType,
        dbQuery,
        jwtSecret,
        redisHost,
        redisPort,
    };
};
export const appConfig = getAppConfig();
