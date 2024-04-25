import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudentCourse } from '../Models/IStudentCourse';
import { environment } from 'src/environments/environment';
import { IResponse } from '../Models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  constructor(private http:HttpClient) {

   }

   GetStudentCourses(id:string):Observable<IResponse<IStudentCourse[]>>{
    return this.http.get<IResponse<IStudentCourse[]>>(`${environment.APIHost}/GetStudentCourses/${id}`)
   }
   GetCourseCountOfStudent(CourseID:number):Observable<IResponse<number>>{
    return this.http.get<IResponse<number>>(`${environment.APIHost}/GetCourseCountOfStudent/${CourseID}`);
   }
}
