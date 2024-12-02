export class User {
    constructor(_id, name, userName, cnp, address, type) {
        this._id = _id;
        this.name = name;
        this.userName = userName;
        this.cnp = cnp;
        this.address = address;
        this.type = type;
    }
}


export class AuthSuccess {
    constructor(user) {
        this.user = user;
    }
}

export class AuthError {
    constructor(message) {
        this.message = message;
    }
}

export class AuthResponse {
    constructor(success, error) {
        this.success = success;
        this.error = error;
    }
}