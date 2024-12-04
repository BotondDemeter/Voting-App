export class User {
    constructor(_id, first_name, last_name, id_number, cnp, nationality, type) {
        this._id = _id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.id_number = id_number;
        this.cnp = cnp;
        this.nationality = nationality;
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