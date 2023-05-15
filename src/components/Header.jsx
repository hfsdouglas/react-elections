export default function Header({ children: title }) {
    return (
        <header>
            <div className="bg-blue-300 mx-auto p-4">
                <h1 className="text-center font-semibold text-xl">
                    { title }
                </h1>
            </div>
        </header>
    );
}