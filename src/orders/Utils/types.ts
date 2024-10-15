export type orderparams={
    OrderNumber:string;
    CustomerName:string;
    ProductName:string;
    Price:string;
    Quantity:number;
    Description:string;
    Location:string;
    PhoneNumber:string;
    OrderDate:Date;
  


}

export interface UpdateOrderParams {
    OrderNumber?:string;
    CustomerName?:string;
    ProductName?:string;
    Price?:number;
    Quantity?:number;
    Description?:string;
    Location?:string;
    PhoneNumber?:string;
    OrderDate?:Date;
  
  }
  



