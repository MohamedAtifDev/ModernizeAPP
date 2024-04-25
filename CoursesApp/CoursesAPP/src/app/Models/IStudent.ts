import { IStudentCourse } from "./IStudentCourse";

export interface IStudent{
    id :string,
     name  :string,
     phone :string,
     email :string,
    
    studentCourses:IStudentCourse[]
}