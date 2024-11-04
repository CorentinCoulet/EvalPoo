import { Emprunteur } from "./Emprunteur";
import { Livre } from "./Livre";
import { TransactionEmprunt } from "./TransactionEmprunt";

export class Bibliotheque {
    private livres: Livre[] = [];
    private emprunteurs: Emprunteur[] = [];
    private transactions: TransactionEmprunt[] = [];

    addBook(livre: Livre): void {
        this.livres.push(livre);
        console.log(`Le livre "${livre.title}" a été ajouté à la bibliothèque.`);
    }

    saveBorrowing(emprunteur: Emprunteur): void {
        this.emprunteurs.push(emprunteur);
        console.log(`L'emprunteur ${emprunteur.name} a été enregistré.`);
    }

    borrowBook(livre: Livre, emprunteur: Emprunteur): void {
        try {
            if (!livre.isAvailable()) {
                console.log(`Le livre "${livre.title}" n'est pas disponible pour l'emprunt.`);
                return;
            }

            if (!emprunteur.canBorrow()) {
                console.log(`L'emprunteur ${emprunteur.name} a atteint la limite de 3 livres.`);
                return;
            }

            livre.borrowing();
            emprunteur.addBook(livre);

            const transaction = new TransactionEmprunt(livre, emprunteur, new Date());
            this.transactions.push(transaction);

            console.log(`Le livre "${livre.title}" a été emprunté par ${emprunteur.name}. Date de retour prévue : ${transaction.returnDate.toLocaleDateString()}.`);
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    returnBook(livre: Livre, emprunteur: Emprunteur): void {
        try {
            emprunteur.deleteBook(livre);
            
            livre.returnTrue();
            
            this.transactions = this.transactions.filter(
                transaction => transaction.bookBorrowed !== livre || transaction.borrower !== emprunteur
            );

            console.log(`Le livre "${livre.title}" a été retourné par ${emprunteur.name}.`);
        } catch (error) {
            console.error((error as Error).message);
        }
    }
}
