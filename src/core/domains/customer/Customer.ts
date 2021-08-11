
export default class Customer {


  constructor(
    private id: number,
    private businessName: string,
    private legalName: string,
    private vatNumber: string,
    private country: string,
    private address: string,
    private houseNumber: string,
    private postalCode: string,
    private city: string,
    private province: string,
    private contactName: string,
    private email: string,
    private mobile: string,
  ) {  }

  
}