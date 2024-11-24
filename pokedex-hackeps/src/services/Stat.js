

class Stat {
    constructor(name, url, baseStat, effort) {
        this.name = name; // Nombre del stat (como 'speed', 'attack', etc.)
        this.url = url; // URL relacionada al stat
        this.baseStat = baseStat; // El valor base del stat
        this.effort = effort; // El esfuerzo asociado al stat
    }
}

export default Stat;