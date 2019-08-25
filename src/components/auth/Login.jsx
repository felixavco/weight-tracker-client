import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';

const Login = ({ login, errors, isAuth, history }) => {

    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (isAuth) {
            history.push('/');
        } else {
            document.title = "Inicio de sesión";
        }
    }, [isAuth])

    //* change the state of user_name and password, if inputs are not empty change isValid to true
    const onChangeHandler = (e) => {
        const { name, value } = e.target
        name === 'user_name' ? setUserName(value.trim()) : setPassword(value.trim());
        user_name.length > 3 && password.length > 3 ? setIsValid(true) : setIsValid(false);
    }

    let button = (
        <button
            onClick={() => login({ user_name, password })}
            className="btn btn-info btn-disabled"
            type="submit"
            disabled
        >
            Ingresar
        </button>
    );

    if (isValid) {
        button = (
            <button
                onClick={() => login({ user_name, password })}
                className="btn btn-info"
                type="submit"
            >
                Ingresar
            </button>
        )
    }

    return (
        <div id="login">
            <div className="row">
                <div className="col-12 col-md-5 col-lg-4 mx-auto my-5">
                    <h3 className="text-center my-4">Iniciar sesión</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {
                            errors &&
                            errors.length > 0 &&
                            <div className="alert alert-danger" role="alert">{errors}</div>
                        }
                        <div className="form-group">
                            <label htmlFor="user">Usuario</label>
                            <input
                                onChange={(e) => onChangeHandler(e)}
                                type="text"
                                name="user_name"
                                className="form-control"
                                id="user"
                                aria-describedby="user"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                onChange={(e) => onChangeHandler(e)}
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                aria-describedby="password"
                            />
                        </div>
                        <hr />
                        <div className="d-flex justify-content-center">
                            {button}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    errors: state.errors.errors
});

export default connect(mapStateToProps, { login })(Login);
