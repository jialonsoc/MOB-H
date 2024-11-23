export class Trip {
    constructor({
        id = Date.now().toString(),
        name,
        description,
        startDate,
        endDate,
        createdBy,
        participants = [],
        expenses = [],
        messages = [],
        code = generateTripCode(),
        status = 'active'
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdBy = createdBy;
        this.participants = participants;
        this.expenses = expenses;
        this.messages = messages;
        this.code = code;
        this.status = status;
    }
}

function generateTripCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}