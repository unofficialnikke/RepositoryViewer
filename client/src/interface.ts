export interface IStarredRepos {
    name: string
    html_url: string
    description: string
    topics: []
    license: null
}

export interface IFetchData {
    login(): void,
    getToken(): void,
}