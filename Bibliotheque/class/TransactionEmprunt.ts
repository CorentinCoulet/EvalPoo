import { Emprunteur } from "./Emprunteur";
import { Livre } from "./Livre";

export class TransactionEmprunt {
    public returnDate: Date;
    
    constructor(
        public bookBorrowed: Livre,
        public borrower: Emprunteur,
        public borrowingDate: Date,
    ){
        this.returnDate = new Date(this.borrowingDate);
        this.returnDate.setDate(this.borrowingDate.getDate() + 14);
    }
}