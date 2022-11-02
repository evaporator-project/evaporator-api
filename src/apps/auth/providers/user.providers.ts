// import { Connection } from 'mongoose';
import { UserSchema } from './../schemas/user.schema';
const {userSchemaName} = global.conf.datasource.mongodb
export const userProviders = [
  {
    provide: 'MONGODB_CONNECTION_UserRepository',
    useFactory: (connection: any) =>
        connection.model(
            'user_model',
            UserSchema,
            userSchemaName,
        ),
    inject: ['MONGODB_CONNECTION'],
  },
];