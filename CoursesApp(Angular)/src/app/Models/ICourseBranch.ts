import { IBranch } from "./IBranch";
import { ICourse } from "./ICourse";

export interface ICourseBranch{
    courseid:number,
    branchid:number,
   course?:ICourse,
    branch?:IBranch
}