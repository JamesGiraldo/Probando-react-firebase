import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { auth } from '../firebaseconfig';


const Menu = () => {

    const historial = useHistory()
    const [usuario, setusuario] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setusuario(user.email)
            }
        })
    }, [])

    const CerrarSesion = () => {
        auth.signOut()
        setusuario(null)
        historial.push('/')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Inicio</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            !usuario ? 
                            (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/registrar" className="nav-link">Registrar</Link>
                                    </li>                                   
                                </ul>                                
                            ) : ( 
                                <>
                                    <li className="nav-item">
                                        <Link to="admin" className="nav-link">Amin</Link>
                                     </li>
                                </> 
                            )
                        }
                    </ul> 
                    {
                        usuario ?
                            (
                                <div className="form-inline my-2 my-lg-0">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item dropdown">
                                            <div className="dropdown">
                                            <button className="btn nav-link dropdown-toggle" type="button" data-toggle="dropdown" >  
                                                { usuario }
                                            </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    {
                                                        usuario ?
                                                            (
                                                                <button onClick={CerrarSesion} className="dropdown-item">Cerrar sesión</button>
                                                            ) :
                                                            (
                                                                <span></span>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            ) : ( <> </> )
                    }
                </div>
            </nav>
        </>
    )
}
export default Menu;