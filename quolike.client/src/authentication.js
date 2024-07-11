export const origin = 'https://localhost:7282';

export async function login({ email, password }) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const user = { email, password };

    try {
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

export async function register({ email, password }) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const user = { email, password };
    try {
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

export async function forgotPassword(email) {
    if (!email) {
        throw new Error('Email is required');
    }
    try {
        const response = await fetch(`${origin}/forgotPasswordCustom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
        });
        if (!response.ok) {
            throw new Error(`Failed to reset password: ${response.status} ${response.statusText}`);
        }
        return;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}

export async function resetPassword({ resetCode, email, newPassword }) {
    if (!resetCode || !email || !newPassword) {
        throw new Error('Reset code, email, and new password are required');
    }
    const user = { resetCode, email, newPassword };
    console.log(user);
    try {
        const response = await fetch(`${origin}/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`Failed to reset password: ${response.status} ${response.statusText}`);
        }
        console.log('successfully reset password');
        return await response.json();
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}

//export async function logout() {
//    try {
//        const response = await fetch(`${origin}/logout`, {
//            method: 'POST',
//        });
//        if (!response.ok) {
//            throw new Error(`Failed to logout: ${response.status} ${response.statusText}`);
//        }
//        return;
//    } catch (error) {
//        console.error('Error logging out:', error);
//        throw error;
//    }
//}