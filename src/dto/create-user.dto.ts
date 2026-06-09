import { IsString, IsNotEmpty } from "class-validator";
import { userRoles } from "src/users/user-role.enum";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name!:string;
    role!:string;

}