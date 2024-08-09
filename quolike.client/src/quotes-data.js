// work with quotes data ('quotable' api and my quotes api)

export const origin = 'https://localhost:7282';

export async function fetchQuotableMerged(page, limit) {
    const user = localStorage.getItem('user');
    if (!user) {
        throw new Error('User not found');
    }
    const { accessToken } = JSON.parse(user);

    try {
        const response = await fetch(`${origin}/api/quotes/merged?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 401) {
            throw new Response("Not Found", { status: 401 });
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch quotes: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
}

export async function fetchFavoritesMerged(page, limit) {
    const user = localStorage.getItem('user');
    if (!user) {
        throw new Error('User not found');
    }
    const { accessToken } = JSON.parse(user);

    try {
        const response = await fetch(`${origin}/api/quotes/all?page=${page}&limit=${limit}&isFavorite=true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 401) {
            throw new Response("Not Found", { status: 401 });
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch quotes: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
}

export async function fetchArchivedMerged(page, limit) {
    const user = localStorage.getItem('user');
    if (!user) {
        throw new Error('User not found');
    }
    const { accessToken } = JSON.parse(user);

    try {
        const response = await fetch(`${origin}/api/quotes/all?page=${page}&limit=${limit}&isArchived=true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 401) {
            throw new Response("Not Found", { status: 401 });
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch quotes: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
}

export async function toggleEntry(quote) {
    const user = localStorage.getItem('user');
    if (!user) {
        throw new Error('User not found');
    }
    const { accessToken } = JSON.parse(user);

    try {
        const response = await fetch(`${origin}/api/quotes/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(quote),
        });
        if (response.status === 401) {
            throw new Response("Not Found", { status: 401 });
        }
        if (!response.ok) {
            throw new Error(`Failed to create quote: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating quote:', error);
        throw error;
    }
}

export async function fetchQuotableRandom() {
    const user = localStorage.getItem('user');
    if (!user) {
        throw new Error('User not found');
    }
    const { accessToken } = JSON.parse(user);

    try {
        const response = await fetch(`${origin}/api/quotes/random`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 401) {
            throw new Response("Not Found", { status: 401 });
        }
        if(!response.ok) {
            throw new Error(`Failed to fetch quote: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error;
    }
}