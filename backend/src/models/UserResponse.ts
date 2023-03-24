import Message from "./Response";

interface IUserResponse {
    username: string,
    token: string,
    id: string
}

class UserResponse extends Message {
    user: IUserResponse;
    constructor(message: string, status: number, user: IUserResponse) {
        super(message, status);
        this.user = user;
    }
}

export default UserResponse;