import {District} from "../Models/Enums/DistrictValue"
import { Province } from "../Models/Enums/ProvinceValue"
import { Role } from "../Models/Enums/Role"

export interface Donor {
    id:string,
    organizaTionName:string, 
    organizationType: string, 
    contactPerson:string,
    phone: string,
    baseDistrict: District 
    baseProvince: Province 
    address: string,
    operatingHours: string, 
    email: string 
    password: string, 
    confirmPassword:string 
    userName: string,
    role: Role, 
    userType: string
} 