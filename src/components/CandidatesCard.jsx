export default function CandidatesCard({ candidate = 'Candidato', winner = 'false', votesPercentage = '', votes = ''}) {
    function getCharacterUrl() {
        return `./img/${candidate}.png`;
    }
    
    return (
        <div className="w-56 h-48 border space-y-4">
            <div className="flex justify-between p-4">
                <img className="rounded-full w-20" src={ getCharacterUrl() } alt="hero_candidate" />
                <div className="flex flex-col justify-center items-end">
                    <h1>{ votesPercentage }%</h1>
                    <p>{ votes } <span>votos</span></p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h1>{ candidate }</h1>
                <p>{ winner ? 'Eleito' : 'Não eleito' }</p>
            </div>
        </div>
    );
}