class TitulaireService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAllTitulaires(): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async loginTitulaire(login: string, password: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/users/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
}

export default TitulaireService;