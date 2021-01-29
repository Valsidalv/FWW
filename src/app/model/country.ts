export class Country {
    id: string;
    fullName: string;
    balance: string;
    isActive: boolean;
    registered: string;
    state: string;
    country: string;

    constructor(id, fullName, balance, isActive, registered, state, country) {
        this.id = id;
        this.fullName = fullName;
        this.balance = balance;
        this.isActive = isActive;
        this.registered = registered;
        this.state = state;
        this.country = country;
    }
}