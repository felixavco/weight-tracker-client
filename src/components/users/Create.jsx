import React, { useState, Fragment } from 'react';
import { createUser } from '../../redux/actions/usersActions';
import { connect } from 'react-redux';


const Create = ({ createUser, history }) => {
    const [name, setName] = useState('');
    const [user_name, setUser_name] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false)

    const onSubmitHandler = (e) => {
        e.preventDefault();
         createUser({name, user_name, password}, history);
    }

    const onChangeHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value)
                break;

            case 'user_name':
                setUser_name(e.target.value.trim())
                break;

            case 'password':
                setPassword(e.target.value.trim())
                break;
        
            default:
                break;
        }

        if(name.length >= 3 && user_name.length >= 3 && password.length >= 6) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    return (
        <Fragment>
            <h3 className="text-center my-4">Crear nuevo usuario</h3>
            <div className="row">
                <form className="col-12 col-md-6 mx-auto" onSubmit={e => onSubmitHandler(e)}>
                    <label htmlFor="name">Nombre</label>
                    <input name="name" className="form-control" type="text" value={name} onChange={e => onChangeHandler(e)} id="name" />

                    <label className="mt-3" htmlFor="user_name">Nombre de usuario</label>
                    <input name="user_name" className="form-control" type="text" value={user_name} onChange={e => onChangeHandler(e)} id="user_name" />

                    <label className="mt-3" htmlFor="password">Contraseña</label>
                    <input name="password" className="form-control" type="password" value={password} onChange={e => onChangeHandler(e)} id="password" />
                    <small>La contraseña debe de tener por lo menos 6 caracteres</small>

                    <button 
                        type="submit" 
                        className={`btn btn-info btn-block mt-3 ${!isActive ? 'btn-disabled': null }`}
                        disabled={!isActive && 'disabled' }
                    >
                        Crear 
                    </button>

                </form>
            </div>
        </Fragment>
    )
}

export default connect(null, { createUser })(Create);
