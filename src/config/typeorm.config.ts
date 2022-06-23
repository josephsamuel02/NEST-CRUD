
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { ConfigService, ConfigModule } from '@nestjs/config'
// import { Inject } from '@nestjs/common'
// import { typeOrmConfig } from './config/typeorm.config';


export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: configService.get('MYSQL_URL'),
            port: 3306,
            username: 'root',
            password: 'jda01jda',
            database: 'users_db',
            synchronize: true



            // type: 'mysql',
            // host: configService.get('MYSQL_URL'),
            // port: configService.get('MYSQL_PORT'),
            // username: configService.get('MYSQL_USERNAME'),
            // password: configService.get('MYSQL_PASS'),
            // database: configService.get('MYSQL_DB_NAME'),
            // synchronize: true
        }
    }
};





export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],

    useFactory: async (configService: ConfigService):
        Promise<TypeOrmModuleOptions> =>
        TypeOrmConfig.getOrmConfig(configService),

    inject: [ConfigService]

}