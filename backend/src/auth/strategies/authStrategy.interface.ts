import { User } from "src/users/user.entity";




export interface AuthStrategy{
    validate(...args: any[]): Promise<User>;
}