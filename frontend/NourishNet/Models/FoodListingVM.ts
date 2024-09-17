import { Donor } from "./Donor";
import { FoodType } from "./Enums/FoodType"
import { FoodListingStatus } from "./Enums/FoodListingStatus"

export interface FoodListingVM {
    Id: number,
    DonorId : string, 
    Donor: Donor,
    FoodType: FoodType,
    Description : string,
    Quantity: number,
    PostedDate: string,
    ExpiryDate: string,
    Image: File | string,
    CurrentStatus: FoodListingStatus
}