import {District} from "./Enums/DistrictValue"
import { Province } from "./Enums/ProvinceValue"
import { Role } from "./Enums/Role"
import { RecipientType } from "./Enums/RecipientType" //this was adde like ../ to pactice path scens in react

export interface Recipient{
    id : string,
    recipientName: string,
    contactPerson: string,
    phone: string,
    baseDistrict: District
    baseProvince: Province 
    address: string 
    recipientType: RecipientType
    role: Role
    email: string, 
    password: string , 
    confirmPassword: string ,  
    userName: string 
    userType: string
}