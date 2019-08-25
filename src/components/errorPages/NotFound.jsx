import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center my-5 py-5">
            <div className="my-5 py-5 h-75">
                <h1 className="display-2 text-center">Error 404</h1>

                <h3 className="text-center">No se encontro la página</h3>
                <h4 className="text-center">Por favor verifique la URL e intentelo de nuevo</h4>

                <hr />
                <div className="text-center">
                    <Link className="btn btn-outline-secondary" to="/">Ir al inicio</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;