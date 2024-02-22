const fetcher = (requestInfo: Request) => fetch(requestInfo).then(resp => resp.json())

export default class Api {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    buildRequest(url: string, method: string, body?: any): Request {
        const request = new Request(this.baseUrl + url, {
            method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            mode: "cors",
        })

        return request
    }

    async get(url: string): Promise<any> {
        return fetcher(this.buildRequest(url, "GET"))
    }

    async post(url: string, body: any): Promise<any> {
        return fetcher(this.buildRequest(url, "POST", body))
    }

    async put(url: string, body: any): Promise<any> {
        return fetcher(this.buildRequest(url, "PUT", body))
    }

    async delete(url: string): Promise<any> {
        return fetcher(this.buildRequest(url, "DELETE"))
    }
}

