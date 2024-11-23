class Pokemon {
    constructor({
        id,
        name,
        abilities = [],
        cries = "",
        height = 0,
        location_area_encounters = [],
        evolves_to = null,
        moves = [],
        species = null,
        image = "",
        stats = [],
        types = [],
        weight = 0
    }) {
        this.id = id; // Integer
        this.name = name; // String
        this.abilities = abilities.map(
            (ability) => new Ability(ability.name, ability.url, ability.is_hidden, ability.slot)
        ); // Array of Ability
        this.cries = cries; // String
        this.height = height; // Integer
        this.locationAreaEncounters = location_area_encounters; // Array of strings
        this.evolvesTo = evolves_to ? new EvolvesTo(evolves_to.name, evolves_to.id) : null; // EvolvesTo or null
        this.moves = moves.map((move) => new Move(move.name, move.url)); // Array of Move
        this.species = species ? new Species(species.name, species.url) : null; // Species
        this.image = image; // String
        this.stats = stats.map(
            (stat) => new Stat(stat.stat.name, stat.stat.url, stat.base_stat, stat.effort)
        ); // Array of Stat
        this.types = types.map(
            (type) => new Type(type.type.name, type.type.url, type.slot)
        ); // Array of Type
        this.weight = weight; // Integer
    }

    // List all abilities
    listAbilities() {
        return this.abilities.map(
            (ability) =>
                `Name: ${ability.name}, Hidden: ${ability.isHidden}, Slot: ${ability.slot}`
        );
    }

    // List moves
    listMoves() {
        return this.moves.map((move) => move.name);
    }

    // List stats
    listStats() {
        return this.stats.map(
            (stat) => `${stat.name}: Base ${stat.baseStat}, Effort ${stat.effort}`
        );
    }

    // List types
    listTypes() {
        return this.types.map((type) => `Type: ${type.name}, Slot: ${type.slot}`);
    }

    // Describe the Pokémon
    describe() {
        return `
        Name: ${this.name}
        ID: ${this.id}
        Height: ${this.height}
        Weight: ${this.weight}
        Species: ${this.species?.name || "Unknown"}
        Abilities: ${this.listAbilities().join(", ")}
        Moves: ${this.listMoves().join(", ")}
        Types: ${this.listTypes().join(", ")}
        Stats: ${this.listStats().join(", ")}
        Evolves To: ${this.evolvesTo?.name || "None"}
        Image: ${this.image}
        `;
    }
}