// Hooks
import { useEffect, useState } from "react";

// Components
import Header from "../components/Header";
import Main from "../components/Main";
import Select from "../components/Select";
import Loading from "../components/Loading";

// Services
import apiGetAllCities from "../services/api-service";

export default function ElectionsPage() {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function getAllCities() {
            try {
                const backendCities = await apiGetAllCities();
                setCities(backendCities);
                setError('');
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        }

        getAllCities();
    }, []);

    let mainJsx = (
        <div className="flex justify-center my-4">
            <Loading></Loading>
        </div>
    )
    
    if (error) {
        alert(`Não possível processar a aplicação devido ao erro: ${error}. Tente mais tarde!`);
    }

    if (!loading && !error) {
        mainJsx = (
            <>
                <div className="flex flex-col items-center my-2 space-y-2">
                        <h3>Escolha o município:</h3>
                        <Select cities={ cities }></Select>
                </div>
            </>
        )
    }

    return (
        <>
            <Header>react-elections</Header>
            <Main>{ mainJsx }</Main>
        </>
    );
}