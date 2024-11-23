

// src/models/Type.js
class Type {
    constructor({ slot, type }) {
        this.slot = slot;
        this.name = type.name;
        this.url = type.url;
    }
}

export default Type;