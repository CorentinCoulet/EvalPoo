import { Livre } from "./Livre";

export class Emprunteur {
    constructor(
        public name: string,
        public email: string,
        public booksList: Livre[]
    ){}

    canBorrow(): boolean {
        return this.booksList.length < 3;
    }

    addBook(livre: Livre): void {
        if (this.canBorrow()) {
            this.booksList.push(livre);
        } else {
            throw new Error(`${this.name} a atteint la limite de 3 livres.`);
        }
    }

    deleteBook(livre: Livre): void {
        const index = this.booksList.findIndex(b => b.title === livre.title);
        if (index !== -1) {
            this.booksList.splice(index, 1);
        } else {
            throw new Error(`Le livre "${livre.title}" n'est pas dans la liste des emprunts de ${this.name}.`);
        }
    }
}