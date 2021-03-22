import axios from 'axios'
import { useEffect, useState } from 'react'

import Header from '../components/Header'
import './Register.css'


export default function Register(){

    const [selectedUf, setSelectedUf] = useState('0'); //zero pq é o value do opção selecione
    const [selectedCity, setSelectedCity] = useState('0');
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        })
    }, []);

    useEffect(() => {
        if(selectedUf === '0') {
            return;
        }

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        })

    }, [selectedUf]);

    function handleSelectedUf(event) {
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectedCity(event) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleSubmit(){

    }

    return (
        <div className="register-container">
            <Header />
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>
                        <h1>Dados</h1>
                    </legend>
                    <div className="field">
                        <label htmlFor="name-response">Nome do Responsável</label>
                        <input
                            type="text"
                            name="name-response"
                            id="name-response"
                            onChange="handleInputChange"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange="handleInputChange"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name-child">Nome da Criança</label>
                            <input
                                type="text"
                                name="name-child"
                                id="name-child"
                                onChange="handleInputChange"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="date">Data de nascimento</label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                onChange="handleInputChange"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h1>Localização</h1>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectedUf}
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectedCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <div className="field">
                    <label htmlFor="neighbord">Bairro:</label>
                    <input
                        type="neighbord"
                        name="neighbord"
                        id="neighbord"
                        onChange="handleInputChange"
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}