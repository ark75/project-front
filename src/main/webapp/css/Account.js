import {
    resetForm,
    getAccounts,
    currentPageIndex,
    pagesNumber
} from "/css/my.js";

function deleteAcc(id) {

    let url = "/rest/players/" + id;
    $.ajax({
        url: url,
        type: "DELETE",
        success: function () {
            resetForm(currentPageIndex, pagesNumber);
            getAccounts();
        }
    });
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
        let deleteImage = document.createElement("img");
        deleteImage.src = "/img/delete.png";
        deleteImage.id = this.id + "delete";
        $(deleteImage).click(function () {

            deleteAcc(Number(deleteImage.id.charAt(0)));
            resetForm();
            currentPageIndex = document.querySelector(".button-active").textContent;
            getAccounts(currentPageIndex, pagesNumber);
        });
        this.row.querySelector(".table__delete").append(deleteImage);
        return this.row;
    }


}
