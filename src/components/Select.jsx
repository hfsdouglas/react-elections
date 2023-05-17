export default function Select({ cities, onCitySelect }) {
    [...cities] = cities.sort((a, b) => a.name.localeCompare(b.name));
    
    function handleSelectClick(event) {
        if (onCitySelect) {
            const [selectedCity] = cities.filter((city) => event.currentTarget.value === city.name);
            onCitySelect(selectedCity);
        }
    }

    return (
        <select className="border rounded p-1 px-2" name="cities" id="cities" onChange={ handleSelectClick }>
            {
                cities.map(city => {
                    return <option value={ city.name } key={ city.id }>{ city.name }</option>;
                })
            }
        </select>
    );
}