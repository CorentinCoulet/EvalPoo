import { Collection } from "../Collection";
import { HasId } from "../interfaces/HasId.interface";
import { Model } from "../model/Model";

export abstract class CollectionView<T extends Model<P>, P extends HasId> {
    constructor(public parent: Element, public collection: Collection<T, P>) {
        this.collection.on('change', () => {
            this.render();
        });
    }

    abstract renderItem(model: T): void;
    abstract onSelect(selectedId: string): void;

    private getName(model: Model<P>): string {
        return (model.get('name' as keyof P) as string) || 'Utilisateur inconnu';
    }

    render(): void {
        this.parent.innerHTML = '';

        const selectElement = document.createElement('select');
        selectElement.innerHTML = `<option value="">Sélectionnez un utilisateur</option>`; 

        this.collection.models.forEach((model) => {
            const option = document.createElement('option');
            option.value = (model as Model<P>).get('id')?.toString() || '';
            option.textContent = this.getName(model);
            selectElement.appendChild(option);
        });

        this.parent.appendChild(selectElement);

        selectElement.addEventListener('change', (event) => {
            const selectedUserId = (event.target as HTMLSelectElement).value;
            this.onSelect(selectedUserId);
        });
    }
}
