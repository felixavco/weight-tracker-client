import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../commons/Spinner';
import { getUser, insertWeight, removeWeight, deleteUser, editUser } from '../../redux/actions/usersActions';
import { isEmpty } from '../../utils';
import moment from 'moment';

const List = ({ user, getUser, logged_user_id, match, history, insertWeight, removeWeight, deleteUser, editUser }) => {

    /**
     * State and events and handlers
     */
    const [weight, setWeight] = useState(0);
    const [updatedName, setUpdatedName] = useState(user.name || '');
    const [isActive, setIsActive] = useState(false);
    const [editMode, setEditMode] = useState(true);
    const [id] = useState(match.params.id);

    useEffect(() => {
        getUser(id);
    }, []);

    useEffect(() => {
        setEditMode(false);
        setUpdatedName(user.name);
    }, [user]);

    const submitHandler = (e) => {
        e.preventDefault();
        insertWeight({ weight, id });
        setWeight(0);
        document.querySelector('#weight').value = 0;
    }

    //* Removes a entry from the list
    const removeHandler = (reg_id) => {
        /* eslint no-restricted-globals:0 */
        if (confirm("Esta seguro que desea eliminar el registro?")) {
            removeWeight({ id, reg_id });
        }
        return false;
    }

    //* Delets the user
    const deleteHander = () => {
        /* eslint no-restricted-globals:0 */
        if (confirm("Esta seguro que desea eliminar el usuario?")) {
            deleteUser(id, history)
        }
        setIsActive(false);
    }

    //* Edit the user Name
    const editNameHandler = (x) => {
        if (x) {
            editUser(id, { name: updatedName });
        } else {
            setEditMode(false);
            setIsActive(false);
            setUpdatedName(user.name);
        }
    }

    //* Enables Edit mode and closed the settings pannel
    const editHandler = () => {
        setEditMode(true);
        setIsActive(false);
    }

    /**
     * Content and triggers
     */

    let content = <Spinner />

    if (!isEmpty(user)) {
        const { name, weight_history } = user;

        const settings = (
            <div className="d-flex justify-content-around my-2">
                <button onClick={editHandler} className="btn btn-info btn-sm">Editar usuario</button>
                <button onClick={deleteHander} className="btn btn-danger btn-sm">Eliminar usuario</button>
            </div>
        )

        const weightForm = (
            <form onSubmit={e => submitHandler(e)} className="d-flex justify-content-center" noValidate>
                <input
                    step="0.01"
                    className="w-75 form-control"
                    type="number"
                    id="weight"
                    placeholder="Ingrese el peso en libras"
                    onChange={e => setWeight(parseFloat(e.target.value || 0).toFixed(2))}
                />
                <input
                    className={`ml-1 btn btn-primary ${weight < 25 ? "btn-disabled" : null}`}
                    type="submit"
                    value="Insertar"
                    disabled={weight < 25 ? 'disabled' : null}
                />
            </form>
        )

        const emptyHistoryAlert = (
            <div>
                <div className="alert alert-warning text-center" role="alert">
                    {name} no tiene historial de su peso
                </div>
            </div>
        );

        const historyList = (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Borrar</th>

                    </tr>
                </thead>
                <tbody>
                    {weight_history.map((history, i) => (
                        <tr key={history._id}>
                            <th scope="row">{i + 1}</th>
                            <td>{history.weight} Lb {`(${(history.weight / 2.205).toFixed(2)} Kg)`}</td>
                            <td>{moment(history.date).format("Do MMM YYYY")}</td>
                            <td>
                                <button
                                    onClick={() => removeHandler(history._id)}
                                    className="btn btn-outline-danger"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        )

        const optionsContainer = (
            <span onClick={() => setIsActive(!isActive)}>
                {
                    isActive ?
                        <small><i className="fas fa-times" /></small> :
                        <i className="fas fa-caret-down" />
                }
            </span>
        )

        const editNameForm = (
            <form className="d-flex justify-content-center my-2" noValidate>
                <input
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    type="text"
                    className="form-control w-75"
                />
                <div className="btn-group ml-2" role="group">
                    <button
                        onClick={() => editNameHandler(1)}
                        type="button"
                        className={`btn btn-info ${ updatedName && updatedName.length > 0 ? null : 'disabled'}`}
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
        )

        const headingName = (
            <h4 className="text-center mt-3">
                {name}
                &nbsp;
                {/* disables settings if user id matches the logged user id */}
                {logged_user_id !== user.id ? optionsContainer : null}
            </h4>
        )

        content = (
            <Fragment>
                {editMode ? editNameForm : headingName}
                {isActive ? settings : null}
                {weightForm}
                <hr />
                {weight_history.length > 0 ? historyList : emptyHistoryAlert}
            </Fragment>
        )
    }

    return (
        <div className="row" >
            <div className="col-12 col-md-8 mx-auto">
                {content}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    logged_user_id: state.auth.user.id,
    user: state.users.single,
    errors: state.errors.errors
});

export default connect(mapStateToProps, { getUser, insertWeight, removeWeight, deleteUser, editUser })(List);