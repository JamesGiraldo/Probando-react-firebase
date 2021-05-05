import React, { useState } from 'react'
import { auth } from '../firebaseconfig';
import { useHistory } from "react-router-dom";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Registro = () => {

    const historial = useHistory()

    const [ email, setemail ] = useState('')
    const [ password, setpassword ] = useState('')

    const MySwal = withReactContent(Swal)

    const registrarUsuario = (e) => {
        e.preventDefault();       
        auth.createUserWithEmailAndPassword( email, password )
            .then( resp => {
                historial.push('/')
                setemail('')
                setpassword('')
                MySwal.fire({
                    didOpen: () => {
                        MySwal.clickConfirm()
                    }
                }).then(() => {
                    return MySwal.fire(<p>Registo éxitoso</p>)
                })
            })
            .catch( error => {
                if ( error.code === 'auth/invalid-email' || error.code ==='auth/weak-password'){                   
                    MySwal.fire({
                        didOpen: () => {
                            MySwal.clickConfirm()
                        }
                    }).then(() => {
                        return MySwal.fire(<p> { error.message } 🤔</p>)
                    })
                }
            }) 
    }

    return (
        <div className="row mt-3">
            <div className="col-md-4"></div>
            <div className="col-md-4">           
                <form onSubmit={ registrarUsuario }>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={ (e) => { setemail( e.target.value ) }} value={ email } type="email" id="email" className="form-control" requerid="true" placeholder="Correo electronio"/>                     
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwrod">Password</label>
                        <input onChange={ (e) => { setpassword( e.target.value ) }} value={ password } type="password" className="form-control" id="passwrod" requerid="true" placeholder="Contraseña"/>
                    </div>
                    <button type="submit" className="btn btn-block btn-dark">Registrar</button>
                </form>
            </div>
            <div className="col-md-4"></div>
        </div>
    )
}
export default Registro;