import { ICourse } from "./ICourse"
import { IPayment } from "./IPayment"
import { IStudent } from "./IStudent"

export interface IStudentCourse{
 studentid :string
 courseid  :number,

 assigmentDate:Date


 student:IStudent


course    :ICourse

paymentid :number

 payment: IPayment
}