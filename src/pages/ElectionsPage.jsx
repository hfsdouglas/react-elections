// Hooks
import { useEffect, useState } from "react";

// Components
import Header from "../components/Header";
import Main from "../components/Main";
import Select from "../components/Select";
import Loading from "../components/Loading";
import ElectionsCard from "../components/ElectionsCard";
import CandidatesCard from "../components/CandidatesCard";

// Services
import { apiGetAllCities, apiGetAllCandidates, apiGetElections } from "../services/api-service";

export default function ElectionsPage() {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [elections, setElections] = useState([]);

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

        async function getAllCandidates() {
            try {
                const backendCandidates = await apiGetAllCandidates();
                setCandidates(backendCandidates);
                setError('');
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        }

        async function getElections() {
            try {
                const backendElections = await apiGetElections();
                setElections(backendElections);
                setError('');
                setLoading(false);
            } catch(error) {
                setError(error.message);
            }
        }
        
        getAllCities();
        getAllCandidates();
        getElections();
    }, []);

    let mainJsx = (
        <div className="flex justify-center my-4">
            <Loading></Loading>
        </div>
    )
    
    if (error) {
        alert(`Não possível processar a aplicação devido ao erro: ${error}. Tente mais tarde!`);
    }

    const election = filterElectionByCityId(selectedCity.id);
    let cityCandidates = [];

    // const maxVotesCandidate = cityCandidates.reduce((prev, current) => {
    //     return prev.votes > current.votes ? prev : current;
    // });

    if (!loading && !error) {
        mainJsx = (
            <>
                <div className="flex flex-col items-center mb-4 space-y-2">
                        <h3>Escolha o município:</h3>
                        <Select cities={ cities } onCitySelect={ handleCitiesSelectClick }></Select>
                </div>
                <ElectionsCard>
                    <div className="text-center space-y-4">
                        <h1 className="font-semibold">Eleição em { selectedCity.name }</h1>
                        <div className="flex space-x-4 justify-center">
                            <div><strong>Total de eleitores: </strong><span>{ selectedCity.votingPopulation }</span></div>
                            <div><strong>Abstenção: </strong><span>{ selectedCity.absence }</span></div>
                            <div><strong>Comparecimento: </strong><span>{ selectedCity.presence }</span></div>
                        </div>
                        <div>{election.length} candidatos</div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center m-4">
                        {
                            election.map(item => {
                                cityCandidates.push({ candidate: filterCandidateById(item.candidateId), votes: item.votes });
                                return <CandidatesCard candidate={filterCandidateById(item.candidateId)} winner={ '' } votes={item.votes} votesPercentage={getVotesPercentage(item.votes)} />
                            }) 
                        }
                    </div>
                </ElectionsCard>
            </>
        )
    }

    function filterElectionByCityId(id) {
        return elections.filter(election => election.cityId === id);
    }
    
    function filterCandidateById(id) {
        const [candidate] = candidates.filter(candidate => candidate.id === id);
        return candidate.name;
    }
    
    function getVotesPercentage(candidateVotes) {
        const percentage = (candidateVotes * 100) / selectedCity.presence;
        return percentage.toFixed(2);
    }

    // function getWinner(votes) {    
    //     if (maxVotesCandidate.votes === votes) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    function handleCitiesSelectClick(city) {
        setSelectedCity(city);
    }

    return (
        <>
            <Header>react-elections</Header>
            <Main>{ mainJsx }</Main>
        </>
    );
}