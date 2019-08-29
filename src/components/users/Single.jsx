import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../commons/Spinner';
import { getUser, insertWeight } from '../../redux/actions/usersActions';
import { isEmpty } from '../../utils';
import moment from 'moment';

const List = ({ user, getUser, errors, match, insertWeight }) => {

    const [weight, setWeight] = useState(0);
    const [id] = useState(match.params.id)

    useEffect(() => {
        getUser(id);
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        insertWeight({ weight, id });
        setWeight(0);
        document.querySelector('#weight').value = 0;
    }

    let content = <Spinner />

    if (!isEmpty(user)) {
        const { name, weight_history } = user;

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
                            <td><button className="btn btn-outline-danger"><i className="fas fa-times"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        )

        content = (
            <Fragment>
                <h4 className="text-center mt-3">{name}</h4>
                {weightForm}
                <hr />
                {
                    weight_history.length > 0 ?
                        historyList :
                        emptyHistoryAlert
                }
            </Fragment>
        )
    }

    return (
        <div className="row">
            <div className="col-12 col-md-8 mx-auto">
                {content}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.users.single,
    errors: state.errors.errors
});

export default connect(mapStateToProps, { getUser, insertWeight })(List);