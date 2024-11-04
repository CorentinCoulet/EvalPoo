import { Bibliotheque } from "./class/Bibliotheque";
import { Emprunteur } from "./class/Emprunteur";
import { Livre } from "./class/Livre";

const biblio = new Bibliotheque();

const livre1 = new Livre("Le Petit Prince", "Antoine de Saint-Exupéry", new Date(1943, 3, 6), true);
const livre2 = new Livre("1984", "George Orwell", new Date(1949, 5, 8), true);
const livre3 = new Livre("Les Misérables", "Victor Hugo", new Date(1862, 1, 3), true);

const emprunteur1 = new Emprunteur("Alice", "alice@example.com", []);
const emprunteur2 = new Emprunteur("Bob", "bob@example.com", []);

biblio.addBook(livre1);
biblio.addBook(livre2);
biblio.addBook(livre3);

console.log("Liste des livres dans la bibliothèque :");
console.log(biblio['livres'])

biblio.saveBorrowing(emprunteur1);
biblio.saveBorrowing(emprunteur2);

console.log("Liste des emprunteurs dans la bibliothèque :");
console.log(biblio['emprunteurs']);

biblio.borrowBook(livre1, emprunteur1);
console.log(`Disponibilité du livre "${livre1.title}" :`, livre1.isAvailable() ? "Disponible" : "Emprunté");

biblio.returnBook(livre1, emprunteur1);
console.log(`Disponibilité du livre "${livre1.title}" :`, livre1.isAvailable() ? "Disponible" : "Emprunté");
