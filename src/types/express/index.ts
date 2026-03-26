import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            adminId?: string;
        }
    }
}

export interface ILink {
    _id?: string;
    title: string;
    url: string;
    icon?: string;
    description?: string;
    category?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface JWTPayload {
    id: string;
    username: string;
}


