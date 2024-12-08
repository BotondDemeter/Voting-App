export class User {
    constructor(_id, first_name, last_name, id_number, cnp, nationality, type, county, city) {
        this._id = _id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.id_number = id_number;
        this.cnp = cnp;
        this.nationality = nationality;
        this.type = type;
        this.county = county;
        this.city = city;
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

export class Candidate {
    constructor(_id, name, description = '', party = null, votes = 0) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.party = party;
        this.votes = votes;
    }
}

export class Voting {
    constructor(
        _id,
        name,
        description = '',
        isActive = true,
        region,
        countyName,
        cityName,
        candidates = [],
        totalVotes = 0,
        startDate,
        endDate,
        createdAt = new Date(),
        voters = []
    ) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.isActive = isActive;
        this.region = region;
        this.countyName = countyName;
        this.cityName = cityName;
        this.candidates = candidates.map(candidate => new Candidate(...Object.values(candidate)));
        this.totalVotes = totalVotes;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt = createdAt;
        this.voters = voters;
    }
}

export class County {
    constructor(_id, name) {
        this._id = _id;
        this.name = name;
    }
}

export class City {
    constructor(_id, name, countyName) {
        this._id = _id;
        this.name = name;
        this.countyName = countyName;
    }
}