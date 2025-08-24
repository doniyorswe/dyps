type Repo = {
    id: number,
    node_id: string,
    full_name: string
    name: string,
    private: boolean,
    description: string | null,
    created_at: string,
    updated_at: string,
    pushed_at: string,
    clone_url: string,
    default_branch: string,
}

type Organization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
}