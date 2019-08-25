import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

const Navbar = ({ isAuth, user, logoutUser }) => {

    let content;

    if (isAuth) {

        content = (
            <Fragment>
                <li className="nav-item active">
                    <NavLink className="nav-link" exact={true} to="/">Lista <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="#">Action</Link>
                        <Link className="dropdown-item" to="#">Another action</Link>
                        <div className="dropdown-divider"></div>
                        <Link onClick={logoutUser} className="dropdown-item" to="login">Cerrar Sesión</Link>
                    </div>
                </li>
            </Fragment>

        )

    } else {
        content = (
            <li className="nav-item">
                <NavLink className="nav-link" exact={true} to="/login">Iniciar Sesion</NavLink>
            </li>
        )
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/"><i className="fas fa-weight"></i>&nbsp;WT</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav ml-auto">
                            {content}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { logoutUser })(Navbar)
