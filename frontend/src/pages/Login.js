import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import api from '../services/api';
import logo from '../assets/vaivolta.svg';

export default function Login({ history, match }){

    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // async function handleSubmit(e){
    //     e.preventDefault();

    //     // Preciso conseguir pegar somente o id do email colocado pra login

    //     const response = await api.get('/users', {
    //         email
    //     })

    //     const { _id } = response.data.user.find(email)

    //     console.log('response', email )

    //     history.push(`/users/${_id}`)
    // }

    async function handleSubmit(e, id) {
        e.preventDefault();
        await api.get(`/users/${id}`, null, {
            headers: {
              email: match.params.id,
            }
          })
          console.log(email.filter(user => user._id))
          setEmail(email.filter(user => user._id));
    }

    return (
        <div className="login-container">
            <header>
            <div>
                <Link to='/' className="logo">
                    <img src={logo} alt="vai volta" />
                </Link>
            </div>
        </header>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Digite E-mail"
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                />
                {/* <input
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={ e => setPassword(e.target.value) }
                /> */}
                 <div className="buttons">
                    <button className="login" type="submit">Entrar</button>
                    <Link to='/register'>
                        <button className="register" type="submit">Cadastrar</button>
                    </Link>
                 </div>
            </form>
        </div>
    )
}
