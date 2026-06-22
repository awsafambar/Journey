import { useCallback, useEffect, useState } from 'react'
import api from './axiosConfig'; 

type User = {
    id: number;
    name: string;
    email: string;
    [key: string]: unknown;
};

export const Axios = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUserName, setNewUserName] = useState('');
    const [postResult, setPostResult] = useState<string | null>(null);

    const fetchData = useCallback(async (): Promise<User[]> => {
        try {
            const result = await api.get<User[]>("https://jsonplaceholder.typicode.com/users")
            console.log({ result })
            return result.data;
        } catch (error) {
            console.error(error)
            return [];
        }
    }, [])
    const addUser = useCallback(async () => {
        try {
            const response = await api.post(
                'https://jsonplaceholder.typicode.com/users',
                {
                    name: newUserName,
                    email: `${newUserName.toLowerCase()}@example.com`,
                    phone: '123-456-7890'
                }
            );

            console.log('POST Response:', response.data);
            setPostResult('✅ User created! ID: ' + response.data.id);
            setNewUserName('');

            // Add to UI (simulated)
            setUsers(prev => [...prev, response.data]);

        } catch (error) {
            console.log('POST Error:', error);
            setPostResult('❌ Error creating user');
        }
    }, [newUserName]);

    useEffect(() => {
        fetchData().then(result => {
            setUsers(result)
            setLoading(false)
        })
    }, [fetchData])



    return (
        <div style={{ padding: '20px' }}>
            <h1>This is all about axios and axios Interceptors</h1>
            <h1>Step 1: Basic GET Request</h1>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.email}</li>
                    ))}
                </ul>
            )}
            <hr />
            <h2>Step 2: POST Request</h2>
            <div>
                <input
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Enter name"
                />
                <button onClick={addUser} style={{ border: "1px solid white", backgroundColor:"grey"  }}>Add User</button>
                {postResult && <p>{postResult}</p>}
            </div>

            <hr />
            <h2>Step 3: check logs for interceptors</h2>
        </div>
    )
}
