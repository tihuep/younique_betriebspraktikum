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
        //setUsers(users.filter(user => user.id !== userId));
    }

    const submitPress = (user: User) => {
        setUsers([...users, user]);
        navigate('/users');
    }

    return (
        <Routes>
            <Route path="" element={<>
                <NavLink to="new">Create New</NavLink>
                <UserIndex users={users} deletePress={deleteUser} />
            </>} />
            <Route path="new" element={<>
                <UserForm mode={1} submitPress={submitPress}/>
            </>} />
        </Routes>);
}

export default Users;