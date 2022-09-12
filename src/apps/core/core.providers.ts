// import { Connection } from 'mongoose';
import { FileSchema } from './schemas/file.schema';
import {RequestSchema} from "./schemas/request.schema";

export const fileProviders = [
    {
        provide: 'MONGODB_CONNECTION_FileRepository',
        useFactory: (connection: any) =>
            connection.model(
                'file_model',
                FileSchema,
                'file',
            ),
        inject: ['MONGODB_CONNECTION'],
    },
    {
        provide: 'MONGODB_CONNECTION_RequestRepository',
        useFactory: (connection: any) =>
            connection.model(
                'request_model',
                RequestSchema,
                'request',
            ),
        inject: ['MONGODB_CONNECTION'],
    },
];