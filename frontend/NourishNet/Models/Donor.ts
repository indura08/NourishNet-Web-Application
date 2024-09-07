import {District} from "../Models/Enums/DistrictValue"
import { Province } from "../Models/Enums/ProvinceValue"
import { Role } from "../Models/Enums/Role"

export interface Donor {
    Id:string,
    OrganizationName:string, 
    OrganizationType: string, 
    ContactPerson:string,
    Phone: string,
    BaseDistrict: District 
    BaseProvince: Province 
    Address: string,
    OperatingHours: string, 
    Email: string 
    Password: string, 
    ConfirmPassword:string 
    UserName: string,
    Role: Role, 
    UserType: string
} 