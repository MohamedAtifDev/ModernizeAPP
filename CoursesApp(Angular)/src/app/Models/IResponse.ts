export interface IResponse<T>{
    course: any;
    code:number,
    message:string,
    messages:string[],
    data:T;
}