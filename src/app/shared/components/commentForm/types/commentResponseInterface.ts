import { ProfileInterface } from "src/app/shared/types/profile.interface"

export interface CommentResponseInterface{
    comment:{
        "comment":any,
        "id": number,
        "createdAt": string
        "updatedAt": string,
        "body": string,
        "author": ProfileInterface
    }
}