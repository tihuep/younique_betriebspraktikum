import User from '../../domains/User';
import styled from '@emotion/styled';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { useParams } from "react-router-dom";

type UserFormProps = {
    mode: number,
    submitPress?: (user: User) => void,
    submitEdit?: (user: User) => void
}

function UserForm({mode, submitPress, submitEdit}: UserFormProps) {

    const parameters: any = useParams();

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
            submitPress && submitPress({id: formData.id === undefined ? Date.now() : formData.id, 
                username: formData.username === undefined ? "" : formData.username, 
                forename: formData.forename === undefined ? "" : formData.forename, 
                surname: formData.surname === undefined ? "" : formData.surname,
                birthdate: formData.birthdate === undefined ? new Date() : formData.birthdate} as User);
        }
    }    

    const editSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData) {
            submitEdit && submitEdit({id: formData.id === undefined ? Date.now() : formData.id, 
                username: formData.username === undefined ? "" : formData.username, 
                forename: formData.forename === undefined ? "" : formData.forename, 
                surname: formData.surname === undefined ? "" : formData.surname,
                birthdate: formData.birthdate === undefined ? new Date() : formData.birthdate} as User);
        }
    }    

    if (mode === 2 && formData === undefined){
        let user: User | undefined;

        fetch('http://localhost:4000/users/' + parameters.userId)
            .then(response => response.json())
            .then(data => {
                user = data;
                setFormData(data as User);
            });
    }

    return <div>
        <form onSubmit={mode === 1 ? pressSubmit : editSubmit}>
            <ul>
                <li><label>ID<input type="number" name="id" onChange={handleChange} value={formData && formData.id} disabled={mode === 2}/></label></li>
                <li><label>Username<input type="text" name="username" onChange={handleChange} value={formData && formData.username} disabled={mode === 3}/></label></li>
                <li><label>Forename<input type="text" name="forename" onChange={handleChange} value={formData && formData.forename} disabled={mode === 3}/></label></li>
                <li><label>Surname<input type="text" name="surname" onChange={handleChange} value={formData && formData.surname} disabled={mode === 3}/></label></li>
                <li><label>Birthdate<input type="date" name="birthdate" onChange={handleDateChange} value={formData &&  new Date(Date.parse(formData.birthdate != undefined ? formData.birthdate.toString() : '0000-01-01')).toISOString().split('T')[0]} disabled={mode === 3}/></label></li>
                <li><input type="submit" value="OK" /></li>
            </ul>
        </form>
        <div>mode {mode}</div>
    </div>
}

export default UserForm;