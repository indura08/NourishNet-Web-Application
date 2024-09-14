import { Donor } from "./Donor";

export interface NotificationDonor {
    id : number ,
    donorId: string,
    donor: Donor,
    description: string,
    createdDate : string,
    createtime : string
}