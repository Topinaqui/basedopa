import './Filter.css'

export default function Filter() {
    return(
        <div className="filter-container">
            <h3>Filtrar por</h3>
            <fieldset className="filtro">
                <h4 className="even">Faixa etária</h4>
                <label htmlFor="" className="3meses">
                    <input
                        className="multi-search-checkbox"
                        type="checkbox"
                        name="3meses"
                        value="3meses"
                        />
                    3 Meses
                </label>
                <label htmlFor="" className="6meses">
                    <input
                        className="multi-search-checkbox"
                        type="checkbox"
                        name="6meses"
                        value="6meses"
                        />
                    6 Meses
                </label>
                <label htmlFor="" className="9meses">
                    <input
                        className="multi-search-checkbox"
                        type="checkbox"
                        name="9meses"
                        value="9meses"
                        />
                    9 Meses
                </label>
                <h4 className="even">Desenvolvimento</h4>
                <label htmlFor="" className="textura">
                    <input
                        className="multi-search-checkbox"
                        type="checkbox"
                        name="textura"
                        value="textura"
                        />
                    Textura
                </label>
                <label htmlFor="" className="montar">
                    <input
                        className="multi-search-checkbox"
                        type="checkbox"
                        name="montar"
                        value="montar"
                        />
                    montar
                </label>
            </fieldset>
        </div>
    )
}