import { Expose } from "class-transformer";


export class UserDTO{


    @Expose()
    email : string

    @Expose()
    id:number

    @Expose()
    nomComplet: string

    @Expose()
    omnivoxDA: number

    @Expose()
    calendrierId: number
}