import { ICourse } from "./ICourse";

export interface Iinstructor{
    id:number,
    name:string,
    email:string,
    phone:string,
    birthdate:Date,
    cv:File,
    cvname:string,
    img:File,
    imgname:string,
    course:ICourse
}