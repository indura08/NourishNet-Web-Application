import {Recipient} from "./Recipient"

export interface NotificationRecipient {
    Id : number ,
    RecipientId: string,
    Recipient: Recipient
    Description: string,
    CreatedDate : string,
    Createtime : string
}

//no error here dont get confused with the linter mistakes 