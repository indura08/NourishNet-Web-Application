import { Donor } from "./Donor";

export interface NotificationDonor {
    Id : number ,
    DonorId: string,
    Donor: Donor,
    Description: string,
    CreatedDate : string,
    Createtime : string
}