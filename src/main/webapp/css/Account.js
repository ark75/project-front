import {
    resetForm,
    getAccounts,
    currentPageIndex,
    pagesNumber
} from "/css/my.js";
function editAcc(id) {
    let editImage = document.getElementById(id + "edit");
    let deleteImage = document.getElementById(id + "delete");
    editImage.src = "/img/save.png";
    deleteImage.src = "";
    let editRow = editImage.parentNode.parentNode;

    let children = editRow.children;
    let td_name = children[1];
    let td_title = children[2];
    let td_race = children[3];
    let td_profession = children[4];
    let td_banned = children[7];

    td_name.innerHTML = "<input id= 'input_name_" + id + "'type ='text'value='" + td_name.innerHTML+ "'>";
    td_title.innerHTML = "<input id= 'input_title_" + id + "'type ='text'value='" + td_title.innerHTML+ "'>";

    td_race.innerHTML = getDropdownRAce(id);

    td_profession.innerHTML = "<input id= 'input_profession_" + id + "'type ='text'value='" + td_profession.innerHTML+ "'>";
    td_banned.innerHTML = "<input id= 'input_banned_" + id + "'type ='range'value='" + td_banned.innerHTML+ "'>";

}
function deleteAcc(id) {

    let url = "/rest/players/" + id;
    $.ajax({
        url: url,
        type: "DELETE",
        success: function () {
            resetForm();
            getAccounts(currentPageIndex, pagesNumber);
        }
    });
};

function getDropdownRAce(id) {
    let raceID = "race" +id;
        return "<label for = 'race'></label>"
            + "<select id" + raceID + "name = 'race'"
            + "<option value='HUMAN'>HUMAN</option>"
            + "<option value='DWARF'>DWARF</option>"
            + "<option value='ELF'>ELF</option>"
            + "<option value='GIANT'>GIANT</option>"
            + "<option value='ORC'>ORC</option>"
            + "<option value='TROLL'>TROLL</option>"
            + "<option value='HOBBIT'>HOBBIT</option>";
}

export default class Account {
    constructor(item) {
        this.id = item.id;
        this.name = item.name;
        this.title = item.title;
        this.race = item.race;
        this.profession = item.profession;
        this.level = item.level;
        this.birthday = new Date(item.birthday);
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
        let editImage = document.createElement("img");
        editImage.src = "/img/edit.png";
        editImage.id = this.id + "edit";
        this.row.querySelector(".table__edit").append(editImage);
        $(editImage).click(function () {
            editAcc(Number.parseInt(editImage.id));
        });

        let deleteImage = document.createElement("img");
        deleteImage.src = "/img/delete.png";
        deleteImage.id = this.id + "delete";
        $(deleteImage).click(function () {
            deleteAcc(Number.parseInt(deleteImage.id));
        });
        this.row.querySelector(".table__delete").append(deleteImage);
        return this.row;
    }


}
