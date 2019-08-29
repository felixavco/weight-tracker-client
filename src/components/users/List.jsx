import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../commons/Spinner';
import { getUsers } from '../../redux/actions/usersActions';
import { Link } from 'react-router-dom';
import moment from 'moment';


const List = ({ users, getUsers, errors }) => {

    let content = <Spinner />

    useEffect(() => {
        getUsers();
        document.title = "Usuarios";
    }, []);

    if (users.length > 0) {
        const styles = { fontWeight: 800, margin: '0' };
        content = (
            <ol style={{ padding: '0' }}>
                <div className="d-flex justify-content-between">
                    <h5 style={styles}>Nombre</h5>
                    <h5 style={styles}>Ultimo registro</h5>
                </div>
                <hr />

                {
                    users
                        .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
                        .map((user, i) => (
                            <Link style={{ textDecoration: 'none', color: '#333' }} to={`/user/${user.id}`} key={user.id}>
                                <li
                                    style={{ background: i % 2 === 0 ? '#EAEAEA' : '#F9F9F9' }}
                                    className="p-2 d-flex justify-content-between align-items-center list-item-name"
                                >
                                    <h5>{i + 1} - {user.name.split(' ')[0]}</h5>
                                    {
                                        user.lastest_weight ?
                                            <span
                                                title={moment(user.lastest_weight.date, "YYYYMMDD").fromNow()}
                                            >
                                                {user.lastest_weight.weight}<small>Lbs</small>
                                                &nbsp;
                                                ({(user.lastest_weight.weight / 2.205).toFixed(2)}<small>Kgs</small>)
                                            </span> :
                                            <small>Aun no hay registros</small>
                                    }
                                </li>
                            </Link>
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
