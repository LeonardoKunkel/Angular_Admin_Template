import { User } from "../models/user.model";

export interface LoadUser {
    totalUsers: number;
    users: User[];
}
