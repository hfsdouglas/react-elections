export default function Select({ cities }) {
    [...cities] = cities.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <select className="border rounded p-1 px-2" name="cities" id="cities" placeholder="Selecione uma cidade">
            {
                cities.map(city => {
                    return <option value={ city.name } key={ city.id }>{ city.name }</option>;
                })
            }
        </select>
    );
}