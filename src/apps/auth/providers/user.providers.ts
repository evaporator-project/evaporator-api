// import { Connection } from 'mongoose';
import { UserSchema } from './../schemas/user.schema';

export const userProviders = [
  {
    provide: 'MONGODB_CONNECTION_UserRepository',
    useFactory: (connection: any) =>
        connection.model(
            'user_model',
            UserSchema,
            'user',
        ),
    inject: ['MONGODB_CONNECTION'],
  },
];