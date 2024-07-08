export const origin = 'https://localhost:7282';

export async function login(user) {
    try {
        console.log(user);
        const response = await fetch(`${origin}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`Failed to login: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export async function register(user) {
    try {
        console.log(JSON.stringify(user));
        const response = await fetch(`${origin}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw await response.json(); // to get specific errors
        }
        return;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}