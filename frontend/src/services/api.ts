

//[companies]

export const companiesApi = {
    async getAll(): Promise<{companies: any[],total:number}> {
        const response = await fetch('http://localhost:3001/companies')
        return response.json()
    },
    async getById(id: string) {
        const response = await fetch(`http://localhost:3001/companies/${id}`)
        return response.json()
    },
    create: async (company: { name: string, industry: string, website: string }) => {
        const response = await fetch('http://localhost:3001/companies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(company)
        })
        return response.json()
    },
    update: async (id: string, company: { name: string, industry: string, website: string }) => {
        const response = await fetch(`http://localhost:3001/companies/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(company)
        })
        return response.json()
    },
    delete: async (id: string) => {
        const response = await fetch(`http://localhost:3000/companies/${id}`, {
            method: 'DELETE'
        })
        return response.json()
    }
}