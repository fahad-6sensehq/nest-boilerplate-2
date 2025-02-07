import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { appConfig } from "./app.config";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: `${appConfig.mongodbURL}${appConfig.serverType}_${appConfig.dbName}${appConfig.dbQuery}`,
            }),
        }),
    ],
})
export class DbModule { }
