
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Aos from 'aos';
import *  as anime from 'aos';
import { CountUpOptions } from 'countup.js';
import { NgwWowService } from 'ngx-wow';
import { Observable, fromEvent, map, throttleTime } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CourseService } from 'src/app/services/course.service';
import { ICourse } from 'src/app/Models/ICourse';
import { InstructorService } from 'src/app/services/instructor.service';
import { Iinstructor } from 'src/app/Models/Iinstructor';
import { StudentCourseService } from 'src/app/services/student-course.service';
import { Width } from 'ngx-owl-carousel-o/lib/services/carousel.service';

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styleUrls: ['./client-index.component.css']
})
export class ClientIndexComponent implements OnInit {

@ViewChild("MobileNavbar") MobileNavbar!:ElementRef;
@ViewChild("navbar") navbar!:ElementRef;
courses!:ICourse[];
CoursesID:number[]=[];

 options!:any;
opts:CountUpOptions={
  duration:1,
  enableScrollSpy: true,
  separator: '',
  useEasing:true,
  scrollSpyOnce:true,


}
  instructors!:Iinstructor[];
  instuctorSlideoptions:any;

constructor(private wow:NgwWowService,private elementRef: ElementRef,private CourseServices:CourseService,private InstructorService:InstructorService,private StudentCours:StudentCourseService){
  fromEvent(window, 'scroll')
  .pipe(throttleTime(100))
  .subscribe((event) => this.onWindowScroll(event));

  this.StudentCours.GetStudentCourses(localStorage.getItem("user")||'').subscribe(result=>{
    console.log(result.data);
    result.data.forEach((ele)=>{
      this.CoursesID.push(ele.course.id)
    })
  })

}

  ngOnInit(): void {
 anime.init();
 this.InstructorService.GetAll().subscribe(response=>{
  this.instructors=response.data;
  console.log(this.instructors);
  this.instuctorSlideoptions={type: 'loop', perPage: 2, keyboard: false,
  padding:"10px",
  gap:"1.8em",
  arrows:true,
pagination:false,
  omitEnd:true,
  breakpoints: {
  
    2000:{
      perPage:this.instructors.length <4 ? this.instructors.length :4,
      width:this.instructors.length==1 ?"300px" :this.instructors.length==2 ?"600px" :this.instructors.length==3 ?"100%" :"100%",
  
   
    },
    1500:{
      perPage:this.instructors.length <3 ? this.instructors.length :3,
      width:this.instructors.length==1 ?"300px" :this.instructors.length==2 ?"600px" :this.instructors.length==3 ?"100%" :"100%",
  
    },
    1024: {
      perPage:this.instructors.length <3 ? this.instructors.length :3,
      width:this.instructors.length==1 ?"300px" :this.instructors.length==2 ?"600px" :this.instructors.length==3 ?"100%" :"100%",
  
     
    },
    991:{
      perPage:this.instructors.length <2 ? this.instructors.length :2,
      width:this.instructors.length==1 ?"300px" :this.instructors.length==2 ?"600px" :this.instructors.length==3 ?"100%" :"100%",
  
    },
    767: {
      perPage:this.instructors.length <1 ? this.instructors.length :1,
      width:this.instructors.length==1 ?"300px" :this.instructors.length==2 ?"600px" :this.instructors.length==3 ?"100%" :"100%",
  
    
  
    },
    586: {
      perPage:this.instructors.length <1 ? this.instructors.length :1,
      width:this.instructors.length==1 ?"300px" :this.instructors.length==2 ?"600px" :this.instructors.length==3 ?"100%" :"100%",
  
     
    },
  },
  }
  
})

 this.CourseServices.getAll().subscribe((response)=>{
  this.courses=response.data;
  console.log(response.data);


  this.options={type: 'loop', perPage: 2, keyboard: false,
gap:"2em",
arrows:true,
pagination:false,
padding:"10px",
breakpoints: {

  2000:{
    perPage:this.courses.length <4 ? this.courses.length :4,
    width:this.courses.length==1 ?"300px" :this.courses.length==2 ?"600px" :this.courses.length==3 ?"100%" :"100%",

 
  },
  1500:{
    perPage:this.courses.length <3 ? this.courses.length :3,
    width:this.courses.length==1 ?"300px" :this.courses.length==2 ?"600px" :this.courses.length==3 ?"100%" :"100%",

  },
  1024: {
    perPage:this.courses.length <3 ? this.courses.length :3,
    width:this.courses.length==1 ?"300px" :this.courses.length==2 ?"600px" :this.courses.length==3 ?"100%" :"100%",

   
  },
  991:{
    perPage:this.courses.length <2 ? this.courses.length :2,
    width:this.courses.length==1 ?"300px" :this.courses.length==2 ?"600px" :this.courses.length==3 ?"100%" :"100%",

  },
  767: {
    perPage:this.courses.length <1 ? this.courses.length :1,
    width:this.courses.length==1 ?"300px" :this.courses.length==2 ?"600px" :this.courses.length==3 ?"100%" :"100%",

  

  },
  586: {
    perPage:this.courses.length <1 ? this.courses.length :1,
    width:this.courses.length==1 ?"300px" :this.courses.length==2 ?"600px" :this.courses.length==3 ?"100%" :"100%",

   
  },
},
}

  
})


console.log(this.CoursesID);

  }
isCourseAssignedByStudent(id:number){
  return this.CoursesID.findIndex(e=>e==id)
}
  changeTheme(value:any){
    this.elementRef.nativeElement.style.setProperty('--maincolor', value);
    
  }
hideMobileNavbar(){

  this.MobileNavbar.nativeElement.style.opacity=0;
  setTimeout(()=>{
    this.MobileNavbar.nativeElement.style.display="none";
  },100)
  setTimeout(()=>{
    this.navbar.nativeElement.style["z-index"]=1800;
  },100)
  
}
ShowMobileNavbar(){
  this.navbar.nativeElement.style["z-index"]=998;
  this.MobileNavbar.nativeElement.style.display="block";
  setTimeout(()=>{
    this.MobileNavbar.nativeElement.style.opacity=1;
  },100)

 
  
}
onWindowScroll(_event: Event) {

  // Logic to handle scroll events will be here
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;
  scrollPosition = scrollPosition + 160;

  const sections: any = document.querySelectorAll('section');

  sections.forEach((section: HTMLElement) => {
    if (
      section.offsetTop <= scrollPosition &&
      section.offsetTop + section.offsetHeight > scrollPosition
    ) {
      console.log(section.id);
      let navLinks: any = document.querySelectorAll('.navbar a');
      let mobilelinks:any=document.querySelectorAll('.navbar-mobile a')
      navLinks.forEach((link: HTMLAnchorElement) => {
        if (link.href.includes(section.id)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      mobilelinks.forEach((link: HTMLAnchorElement) => {
        if (link.href.includes(section.id)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

    }
  });
}
}
