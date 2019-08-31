import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteUser, editUser } from '../../redux/actions/usersActions';
import { resetCurrentUser, logoutUser } from '../../redux/actions/authActions';

const Profile = ({ isAuth, user, deleteUser, editUser, resetCurrentUser, logoutUser }) => {

    const [updatedName, setUpdatedName] = useState(user.name || '');

    //* Delets the user
    const deleteHander = () => {
        /* eslint no-restricted-globals:0 */
        if (confirm("Esta seguro que desea eliminar el usuario?")) {
            deleteUser(user.id, history);
            logoutUser();
        }
    }

    //* Edit the user Name
    const editNameHandler = (x) => {
        if (x) {
            editUser(user.id, { name: updatedName });
            resetCurrentUser({...user, name: updatedName});
        } else {
            setUpdatedName(user.name);
        }
    }

    return (
        <Fragment>
            <h3 className="text-center my-3">Profile</h3>
            <div className="row">
                <form onSubmit={e => e.preventDefault()} className="col-12 col-md-6 mx-auto d-flex justify-content-center" noValidate>
                    <input 
                        onChange={e => setUpdatedName(e.target.value)}
                        type="text" 
                        value={updatedName} 
                        className="form-control" 
                    />

                    <div className="btn-group ml-2" role="group">
                        <button
                            onClick={() => editNameHandler(1)}
                            type="button"
                            className={`btn btn-info ${updatedName && updatedName.length > 0 ? null : 'disabled'}`}
                            disabled={updatedName && updatedName.length > 0 ? null : 'disabled'}
                        >
                            <i className="far fa-save" />
                        </button>
                        <button
                            onClick={() => editNameHandler(0)}
                            type="button"
                            className="btn btn-danger"
                        >
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </form>
            </div>
                <div className="my-3 w-50 mx-auto">
                    <button onClick={deleteHander} className="btn btn-danger btn-block">Eliminar Usuario</button>
                </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { deleteUser, editUser, resetCurrentUser, logoutUser })(Profile);
