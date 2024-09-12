import { Donor } from "./Donor";
import { FoodType } from "./Enums/FoodType"
import { FoodListingStatus } from "./Enums/FoodListingStatus"

export interface FoodListing {
    id: number,
    donorId : string, 
    donor: Donor,
    foodType: FoodType,
    description : string,
    quantity: number,
    postedDate: string,
    expiryDate: string,
    imagePath: string,
    currentStatus: FoodListingStatus
}