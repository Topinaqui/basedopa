import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import './Main.css'

import api from '../services/api'
import Header from '../components/Header'
import Filter from '../components/Filter'
import itsamatch from '../assets/itsamatch.png'

export default function Main({ match }) {

    const [users, setUsers] = useState([]); //para armazenar vários usuários
    const [matchUser, setMatchUser] = useState(null);

    //não usaer o async que não é uma boa pratica, por isso que cria uma nova função

    useEffect(() => {
        async function loadUsers() {
          const response = await api.get('/users', {
            headers: {
              username: match.params.id,
            }
          })
          console.log(response.data.user)
          setUsers(response.data.user);
        }

        loadUsers();
      }, [match.params.id]);

      useEffect(() => {
        const socket = io('http://localhost:3333', {
          query: { username: match.params.id }
        });

        socket.on('match', dev => {
            setMatchUser(dev);
        })
      }, [match.params.id]);

      async function handleLike(id) {
        await api.post(`/users/${id}/likes`, null, {
          headers: { username: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id));
      }

      async function handleDislike(id) {
        await api.post(`/users/${id}/dislikes`, null, {
          headers: { username: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id));
      }

    return(
        <div className="contanier">
            <Header />
            <div className="main">
                <Filter />
                { users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <img src={user.products[0].img} alt={user.products[0].title} />
                                <footer>
                                    <strong>{user.products[0].title}</strong>
                                    <p>{user.products[0].description}</p>
                                    <span>Mariores de: {user.products[0].age}</span>
                                    <span>ID username: {user._id}</span>
                                </footer>

                                <div className="buttons">
                                    <button type="button" onClick={() => handleDislike(user._id)}>
                                        <img src={dislike} alt ="Dislike"/>
                                    </button>
                                    <button type="button" onClick={() => handleLike(user._id)}>
                                        <img src={like} alt ="like"/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">Não tem mais produtos para escolher</div>
                )}

                { matchUser && (
                    <div className="match-container">
                    <img src={itsamatch} alt="It's a match" />

                    <img className="avatar" src={matchUser.avatar} alt=""/>
                    <strong>{matchUser.name}</strong>
                    <p>{matchUser.bio}</p>

                    <button type="button" onClick={() => setMatchUser(null)}>FECHAR</button>
                    </div>
                ) }
            </div>
        </div>
    )
}