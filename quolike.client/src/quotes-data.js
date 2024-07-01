// work with quotes data ('quotable' api and my quotes api)

export const origin = 'https://localhost:7282';

export async function fetchQuotableMerged(page, limit) {
    try {
        const response = await fetch(`${origin}/api/quotes/merged?page=${page}&limit=${limit}`);
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
    try {
        const response = await fetch(`${origin}/api/quotes/all?page=${page}&limit=${limit}&isFavorite=true`);
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
    try {
        const response = await fetch(`${origin}/api/quotes/all?page=${page}&limit=${limit}&isArchived=true`);
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

export async function toggleEntry(quote) {
    try {
        console.log(quote);
        const response = await fetch(`${origin}/api/quotes/create`, {
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