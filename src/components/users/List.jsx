import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../commons/Spinner';
import { getUsers } from '../../redux/actions/usersActions';
import { Link } from 'react-router-dom';

const List = ({ users, getUsers, errors }) => {

    let content = <Spinner />

    useEffect(() => {
        getUsers();
    }, []);

    if (users.length > 0) {
        const styles = { fontWeight: 800, margin: '0' };
        content = (
            <ol style={{ padding: '0' }}>
                <div className="d-flex justify-content-between">
                    <h5 style={styles}>Nombre</h5>
                    <h5 style={styles}>Nuevo registro</h5>
                </div>
                <hr />

                {
                    users
                        .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
                        .map((user, i) => (
                            <li
                                style={{ background: i % 2 === 0 ? '#EAEAEA' : '#F9F9F9' }}
                                className="p-2 d-flex justify-content-between align-items-center list-item-name"
                                key={user.id}
                            >
                                <Link style={{textDecoration: 'none'}} to={`/user/${user.id}`}><h5>{i + 1} - {user.name}</h5></Link>
                                <Link className="btn btn-outline-primary" to="/insertar"><i className="fas fa-plus-circle" /></Link>
                            </li>
                        ))
                }
            </ol>
        )
    }


    return (
        <div>
            <h4 className="text-center my-3">Lista usuarios</h4>
            <div className="row">
                <div className="col-12 col-md-6 mx-auto">
                    {content}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users.list,
    errors: state.errors.errors
});

export default connect(mapStateToProps, { getUsers })(List);
