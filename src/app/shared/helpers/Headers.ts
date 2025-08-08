export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export const getJsonHeaders = () => ({
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
});
