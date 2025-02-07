import * as dotenv from 'dotenv';
dotenv.config();

export interface IConfig {
    port: number;
    mongodbURL: string;
    dbName: string;
    serverType: string;
    dbQuery: string;
}

const getAppConfig = (): IConfig => {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const mongodbURL = process.env.MONGODB_URL || '';
    const dbName = process.env.DB_NAME || '';
    const serverType = process.env.SERVER_TYPE || '';
    const dbQuery = process.env.DB_QUERY || '';

    if (!port) console.log('port must be specified');
    if (!mongodbURL) console.log('mongodbURL must be specified');
    if (!dbName) console.log('dbName must be specified');
    if (!serverType) console.log('serverType must be specified');

    return {
        port,
        mongodbURL,
        dbName,
        serverType,
        dbQuery,
    };
};
export const appConfig = getAppConfig();
