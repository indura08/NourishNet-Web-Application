import {Recipient} from "./Recipient"

export interface NotificationRecipient {
    id : number ,
    recipientId: string,
    recipient: Recipient
    description: string,
    createdDate : string,
    createdTime : string
}

//no error here dont get confused with the linter mistakes 