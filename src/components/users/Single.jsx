import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../commons/Spinner';
import { getUser } from '../../redux/actions/usersActions';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../utils';
import moment from 'moment';

const List = ({ user, getUser, errors, match }) => {

    useEffect(() => {
        getUser(match.params.id);
    },[])

    let content = <Spinner />

    if(!isEmpty(user)) {
        const { name, weight_history } = user;

        const emptyHistoryAlert = (
            <div>
                <div class="alert alert-warning text-center" role="alert">
                    { name } no tiene historial de su peso
                </div>
            </div>
        );

        const historyList = (
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Peso</th>
                    <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                {weight_history.map((history, i) => (
                    <tr key={history._id}>
                        <th scope="row">{i + 1}</th>
                        <td>{history.weight} Lb {`(${(history.weight / 2.205).toFixed(2)} Kg)`}</td>
                        <td title={moment(history.date, "YYYYMMDD").fromNow()}>{moment(history.date).format("Do MMM YYYY")}</td>
                    </tr>
                ))}
                </tbody>
            </table>

    )

        content = (
            <Fragment>
                <h4 className="text-center mt-3">{ name }</h4>
                <hr/>
                {
                    weight_history.length > 0 ? historyList : emptyHistoryAlert
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

export default connect(mapStateToProps, { getUser })(List);