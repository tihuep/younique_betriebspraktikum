import User from '../domains/User';
import UserForm from '../components/users/UserForm';
import UserIndex from '../components/users/UserIndex';
import { useState } from 'react';
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";

function Users() {
    const navigate = useNavigate();

    const initialUsers: User[] = [];

    const [users, setUsers] = useState(initialUsers);

    const loadUsers = (): void => {
        fetch('http://localhost:4000/users')
            .then(response => response.json())
            .then(data => {
                let dataUsers: User[] = data;
                setUsers(dataUsers);
            });
    }

    if (users === initialUsers) {
        loadUsers();
    }

    const deleteUser = (userId: number) => {
        alert("delete " + userId);

        fetch('http://localhost:4000/users/' + userId, {
            method: 'DELETE'
        }).then(() => {loadUsers()});
    }

    const submitPress = (user: User) => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        
        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                'id': user.id,
                'username': user.username,
                'forename': user.forename,
                'surname': user.surname,
                'birthdate': user.birthdate
            })
        }).then(() => {loadUsers()});

        navigate('/users');
    }

    const editPress = (userId: number): void => {
        navigate('/users/edit/' + userId);
    }

    const submitEdit = (user: User): void => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        console.log(JSON.stringify(user));
        fetch('http://localhost:4000/users/' + user.id, {
            method: 'PUT',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                'id': user.id,
                'username': user.username,
                'forename': user.forename,
                'surname': user.surname,
                'birthdate': user.birthdate
            })
        }).then(() => {loadUsers(); navigate('/users');});

        navigate('/users');
    }

    return (
        <Routes>
            <Route path="" element={<>
                <NavLink to="new">Create New</NavLink>
                <UserIndex users={users} deletePress={deleteUser} editPress={editPress} />
            </>} />
            <Route path="new" element={<>
                <UserForm mode={1} submitPress={submitPress}/>
            </>} />
            <Route path="edit/:userId" element={<>
                <UserForm mode={2} submitEdit={submitEdit}/>
            </>} />
        </Routes>);
}

export default Users;