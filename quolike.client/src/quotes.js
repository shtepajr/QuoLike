// work with quotes data ('quotable' api and my quotes api)

export const origin = 'https://localhost:7282';

export async function fetchQuotable(page, limit) {
    try {
        const response = await fetch(`https://api.quotable.io/quotes?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch quotes: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error; // Re-throw the error for potential handling at a higher level
    }
}

export async function fetchFavorites() {
    try {
        const response = await fetch(`${origin}/api/quotes?isFavorite=true`);
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

export async function fetchArchived() {
    try {
        const response = await fetch(`${origin}/api/quotes?isArchived=true`);
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

export async function createQuote(quote) {
    try {
        const response = await fetch(`${origin}/api/quotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quote),
        });
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