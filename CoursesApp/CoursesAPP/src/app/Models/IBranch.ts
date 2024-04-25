import { ICourseBranch } from "./ICourseBranch"

export interface IBranch{
    id:number,
    name:string
    location:string
    CourseBranches:ICourseBranch[]
}