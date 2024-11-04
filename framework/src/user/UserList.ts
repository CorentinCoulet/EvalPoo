import { CollectionView } from "../framework/views/CollectionView";
import { User, UserProps } from "./User";
import { UserShow } from "./UserShow";

export class UserList extends CollectionView<User, UserProps> {
    renderItem(model: User): void {}

    onSelect(selectedId: string): void {
        const selectedUser = this.collection.models.find(user => user.get('id')?.toString() === selectedId);

        const rootElement = document.querySelector('.user-show');
        if (selectedUser && rootElement) {
            const userShow = new UserShow(rootElement, selectedUser);
            userShow.render();
        } else if (rootElement) {
            rootElement.innerHTML = '<p>Veuillez sélectionner un utilisateur</p>';
        }
    }
}
