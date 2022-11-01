// import { Connection } from 'mongoose';
import { FileSchema } from './schemas/file.schema';
import {RequestSchema} from "./schemas/request.schema";
import {WorkspaceSchema} from "./schemas/workspace.schema";
// console.log(global.conf.datasource.mongodb.requestSchemaName)
const {fileSchemaName,requestSchemaName,workspaceSchemaName} = global.conf.datasource.mongodb
export const fileProviders = [
    {
        provide: 'MONGODB_CONNECTION_FileRepository',
        useFactory: (connection: any) =>
            connection.model(
                'file_model',
                FileSchema,
                fileSchemaName,
            ),
        inject: ['MONGODB_CONNECTION'],
    },
    {
        provide: 'MONGODB_CONNECTION_RequestRepository',
        useFactory: (connection: any) =>
            connection.model(
                'request_model',
                RequestSchema,
                requestSchemaName,
            ),
        inject: ['MONGODB_CONNECTION'],
    },
    {
        provide: 'MONGODB_CONNECTION_WorkspaceRepository',
        useFactory: (connection: any) =>
            connection.model(
                'workspace_model',
                WorkspaceSchema,
                workspaceSchemaName,
            ),
        inject: ['MONGODB_CONNECTION'],
    },
];