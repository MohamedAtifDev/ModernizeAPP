import { ICourseBranch } from "./ICourseBranch";
import { Iinstructor } from "./Iinstructor";

export interface ICourse{
id:number
 
    name:string,

    description:string,
price:number
 
    startDate:string,
 img:File
     endDate:string,
    imgname:string
    instructorid:number;
    courseBranches:ICourseBranch[]
    instructor:Iinstructor
}