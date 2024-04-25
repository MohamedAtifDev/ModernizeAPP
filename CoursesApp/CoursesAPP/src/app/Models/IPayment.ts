import { IStudentCourse } from "./IStudentCourse";

export interface IPayment{
  id             :string,
 name            :string,
 expirationYear  :string,
 expirationMonth :string,
 cardNumber      :string,
 date:Date,    
 studentCourse:IStudentCourse
}