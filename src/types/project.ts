type Project = {
    id: number
    domain: string
    subdomain: string
    owner_id: number
    created_at: string
    deployments: number
    default_branch: string
    repo: string
    name: string
    deployments_list: Deployment[]
}

type Deployment = {
    id: number
    status: string
    project_id: number
    user_id: number
    created_at: string
}
