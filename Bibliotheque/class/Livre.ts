export class Livre {
    constructor(
        public title: string,
        public author: string,
        public publicationYear: Date,
        public disponibility: boolean
    ){}

    isAvailable(): boolean {
        return this.disponibility;
    }

    borrowing(): void {
        if (this.disponibility) {
            this.disponibility = false;
        } else {
            throw new Error(`Le livre "${this.title}" n'est pas disponible.`);
        }
    }

    returnTrue(): void {
        this.disponibility = true;
    }
}