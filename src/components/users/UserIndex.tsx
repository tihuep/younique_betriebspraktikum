import User from '../../domains/User';
import styled from '@emotion/styled';


type UserIndexProps = {
    users?: User[],
    deletePress: (userId: number) => void
}

function UserIndex({users, deletePress}: UserIndexProps) {
    return <div>
        {!users && <span>Keine Benutzer vorhanden</span>}
        {users && 
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Forename</th>
                        <th>Surname</th>
                        <th>Birthdate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr>
                            <td>{user.id ? user.id.toString() : ''}</td>
                            <td>{user.username ? user.username.toString() : ''}</td>
                            <td>{user.forename ? user.forename.toString() : ''}</td>
                            <td>{user.surname ? user.surname.toString() : ''}</td>
                            <td>{user.birthdate ? user.birthdate.toDateString() : ''}</td>
                            <td>
                                <button onClick={() => {deletePress(user.id)}}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        }
    </div>
}

export default UserIndex;