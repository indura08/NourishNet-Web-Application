import {District} from "./Enums/DistrictValue"
import { Province } from "./Enums/ProvinceValue"
import { Role } from "./Enums/Role"
import { RecipientType } from "./Enums/RecipientType" //this was adde like ../ to pactice path scens in react

export interface Recipient{
    Id : string,
    RecipientName: string,
    ContactPerson: string,
    Phone: string,
    BaseDistrict: District
    BaseProvince: Province 
    Address: string 
    RecipientType: RecipientType
    Role: Role
    Email: string, 
    Password: string , 
    ConfirmPassword: string ,  
    UserName: string 
    UserType: string
}