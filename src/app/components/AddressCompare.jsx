'use client';
import {useState} from "react";

export const runtime = 'edge';

export default function AddressCompare() {
    const [location1, setLocation1] = useState('');
    const [location2, setLocation2] = useState('');
    const [equal, setEqual] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEqual(null);
        try {
            const response = await fetch(`/api/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location1,
                    location2,
                }),
            });

            const data = await response;
            const data_json = await data.json();
            console.log(data_json);
            !(data.status === 200) ? setEqual(null) : setEqual(data_json.equal);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-md p-4 bg-white rounded shadow-md w-max-500 w-4/5">
            <h2 className="text-lg font-bold mb-4">Compare Addresses</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col gap-2 m-1">
                    Address 1:
                    <input
                        type="text"
                        value={location1}
                        onChange={(event) => setLocation1(event.target.value)}
                        className="p-2 pl-2 text-sm text-gray-700 bg-orange-200 rounded-md border border-orange-300 align-left"
                    />
                </label>
                <label className="flex flex-col gap-2 m-1">
                    Address 2:
                    <input
                        type="text"
                        value={location2}
                        onChange={(event) => setLocation2(event.target.value)}
                        className="p-2 pl-2 text-sm text-gray-700 bg-orange-200 rounded-md border border-orange-300 align-left"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                    Compare
                </button>
            </form>
            {equal !== null ? (
                <div className="flex justify-center items-center mt-4">
                    <p className={`text-lg font-bold p-2 rounded ${equal ? 'bg-green-300 text-green-900' : 'bg-red-300 text-red-900'}`}>
                        {equal ? 'Equal' : 'Not Equal'}
                    </p>
                </div>


            ) : (
                <p className="text-lg font-bold mt-4">Waiting for response...</p>
            )}
        </div>
    );
}