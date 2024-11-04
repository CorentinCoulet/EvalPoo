import { User } from "./user/User";
import { UserEdit } from "./user/UserEdit";
import { UserList } from "./user/UserList";

const rootElement = document.getElementById('root');
let userList: UserList;

if (rootElement) {
    const userShowContainer = document.createElement('div');
    userShowContainer.className = 'user-show';

    const userEditContainer = document.createElement('div');
    userEditContainer.className = 'user-edit';

    const createUserButton = document.createElement('button');
    createUserButton.innerText = "Créer un nouvel utilisateur";
    createUserButton.style.marginTop = "10px";
    createUserButton.onclick = () => {
        const newUser = User.build({ name: 'Nouvel Utilisateur', age: 0 });
        newUser.on('save', () => {
            userCollection.fetch().then(() => userList.render());
        });

        newUser.save();
    };
    
    rootElement.appendChild(userShowContainer);
    rootElement.appendChild(userEditContainer);
    rootElement.appendChild(createUserButton);

    const userCollection = User.buildCollection();

    userCollection.fetch().then(() => {
        const userList = new UserList(userShowContainer, userCollection);
        userList.render();

        userList.onSelect = (selectedId: string) => {
            const selectedUser = userCollection.models.find(user => user.get('id')?.toString() === selectedId);

            userEditContainer.innerHTML = ''; 
            if (selectedUser) {
                const userEdit = new UserEdit(userEditContainer, selectedUser);
                selectedUser.on('save', () => {
                    userList.render();
                });
        
                userEdit.render();
            } else {
                userEditContainer.innerHTML = '<p>Veuillez sélectionner un utilisateur</p>';
            }
        };
    });
}
