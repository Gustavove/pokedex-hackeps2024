

// src/models/Ability.js
class Ability {
    constructor({ ability, is_hidden, slot }) {
        this.name = ability.name;
        this.url = ability.url;
        this.is_hidden = is_hidden;
        this.slot = slot;
    }
}

export default Ability;