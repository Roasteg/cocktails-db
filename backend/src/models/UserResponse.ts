class UserResponse {
    username: string;
    token: string;
    id: string;
    constructor(username: string, token: string, id: string) {
        this.username = username;
        this.token = token;
        this.id = id;
    }
}

export default UserResponse;