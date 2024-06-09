export class Enquiry {
    fullName: string;
    phoneNumber: string;
    numberOfShares: number;
    notes: string;
    property_id: number;
  
    constructor() {
      this.fullName = '';
      this.phoneNumber = '';
      this.numberOfShares = 0;
      this.notes = '';
      this.property_id = 0;
    }
  }
  