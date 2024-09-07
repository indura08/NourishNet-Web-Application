import { Donor } from "./Donor";
import { FoodType } from "./Enums/FoodType"
import { FoodListingStatus } from "./Enums/FoodListingStatus"

export interface FoodListing {
    DonorId : string, 
    Donor: Donor,
    FoodType: FoodType,
    Description : string,
    Quantity: number,
    PostedDate: string,
    ExpiryDate: string,
    ImagePath: string,
    CurrentStatus: FoodListingStatus
}