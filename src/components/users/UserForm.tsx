import User from '../../domains/User';
import styled from '@emotion/styled';
import { FormEvent, SyntheticEvent, useState } from 'react';

type UserFormProps = {
    user?: User,
    mode: number,
    submitPress: (user: User) => void
}

function UserForm({user, mode, submitPress}: UserFormProps) {

    const [formData, setFormData] = useState<Partial<User>>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: new Date(event.target.value)});
    }

    const pressSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData) {
            submitPress({id: formData.id === undefined ? Date.now() : formData.id, 
                username: formData.username === undefined ? "" : formData.username, 
                forename: formData.forename === undefined ? "" : formData.forename, 
                surname: formData.surname === undefined ? "" : formData.surname,
                birthdate: formData.birthdate === undefined ? new Date() : formData.birthdate} as User);
        }
    }    

    return <div>
        <form onSubmit={pressSubmit}>
            <ul>
                <li><label>ID<input type="number" name="id" onChange={handleChange} value={mode === 1 ? undefined : mode === 2 && user !== undefined ? user.id : undefined} disabled={mode === 2}/></label></li>
                <li><label>Username<input type="text" name="username" onChange={handleChange} value={mode === 1 ? undefined : mode === 2 && user !== undefined ? user.username : undefined} disabled={mode === 2}/></label></li>
                <li><label>Forename<input type="text" name="forename" onChange={handleChange} value={mode === 1 ? undefined : mode === 2 && user !== undefined ? user.forename : undefined} disabled={mode === 2}/></label></li>
                <li><label>Surname<input type="text" name="surname" onChange={handleChange} value={mode === 1 ? undefined : mode === 2 && user !== undefined ? user.surname : undefined} disabled={mode === 2}/></label></li>
                <li><label>Birthdate<input type="date" name="birthdate" onChange={handleDateChange} value={mode === 1 ? "" : mode === 2 && user !== undefined ? user.birthdate.toString() : ""} disabled={mode === 2}/></label></li>
                <li><input type="submit" value="OK" /></li>
            </ul>
        </form>
        <div>mode {mode}</div>
    </div>
}

export default UserForm;