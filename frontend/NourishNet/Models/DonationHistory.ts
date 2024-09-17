import { Recipient } from "./Recipient"
import { FoodListing } from "./FoodListing"

export interface DonationHistory {
    donationId: number ,
    recipientId: string,
    recipient: Recipient,
    foodListingId: number | null,
    foodListing: FoodListing | null
    dataRecieved: string        //methna dateRecieved kiyla hadenna one , backend eke mata wardila data kiyla daala hinda methanth daanna una 
}