

class pokemon {
    consructor(id, name, abilities, ) {
        this.url = "";
        this.id = id;
        this.name = name;
        this.abilities = ability;
    }

    addAbility(ability) {
        if (ability instanceof Ability) {
            this.abilities.push(ability);
        } else {
            throw new Error("Invalid ability. It must be an instance of the Ability class.");
        }
    }

    listAbilities() {
        return this.abilities.map(ability => `${ability.name}: ${ability.description}`);
    }



    


}