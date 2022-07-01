export default class Account {
    constructor(item) {
        this.id = item.id;
        this.name = item.name;
        this.title = item.title;
        this.race = item.race;
        this.profession = item.profession;
        this.level = item.level;
        this.birthday = item.birthday;
        this.banned = item.banned;
    }

    _getTemplate() {
        return document.querySelector(".account-template").content.cloneNode(true);
    }

    generateRow() {
        this.row = this._getTemplate();
        this.row.querySelector(".table__id").textContent = this.id;
        this.row.querySelector(".table__name").textContent = this.name;
        this.row.querySelector(".table__title").textContent = this.title;
        this.row.querySelector(".table__race").textContent = this.race;
        this.row.querySelector(".table__profession").textContent = this.profession;
        this.row.querySelector(".table__level").textContent = this.level;
        this.row.querySelector(".table__birthday").textContent = this.birthday;
        this.row.querySelector(".table__banned").textContent = this.banned;
        return this.row;
    }

}