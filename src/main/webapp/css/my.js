
import Account from "../css/Account.js";

const pageSize = document.querySelector('.page-size');
const buttons = document.querySelector('.buttons')
const baseurl = "rest/players";
const playersCount = "rest/players/count";
export let pagesNumber = 3;
export let currentPageIndex = 0;
let countAccounts = 0;
var countPages = 0;
const buttonTemplate = document.querySelector('.button-template');


$("select").change(function () {
    pagesNumber = Number(this.value);
    currentPageIndex = 0;
    resetForm();
    getAccounts(currentPageIndex, pagesNumber);
});

export function getAccounts(currentPageIndex, pagesNumber) {
     let url = baseurl + "/?pageNumber=" + currentPageIndex.toString() + "&pageSize=" + pagesNumber.toString();
    $.get(url, function (data) {
        data.forEach(item => {
            let row = new Account(item).generateRow();
            document.querySelector(".rows").append(row);
        });
        getButtons();

    });
}


function getButtons() {
    let numberOfButtons = (getPlayers() / pagesNumber);
    for (let i = 0; i < numberOfButtons; i++) {
        let newButton = document.createElement("button");
        newButton.textContent = (i + 1).toString();
        newButton.id = i.toString();
        newButton.className = "button-row";
        newButton.classList.remove("button_active");

        if (Number(currentPageIndex) === i) {
            newButton.classList.add("button_active");
        }
        $(newButton).click(function () {
            currentPageIndex = newButton.id;
            countAccounts = getPlayers();
            resetForm();
            getAccounts(currentPageIndex, pagesNumber);
        });
        buttons.append(newButton);
    }
}

export function resetForm() {
    let rowData = document.querySelectorAll('.data-row');
    rowData.forEach(item => item.remove());
    let buttonData = document.querySelectorAll('.button-row')
    buttonData.forEach(item => item.remove());
}

function getPlayers() {
    $.get(playersCount, function (data) {
        countAccounts = data;
    });
    return countAccounts;
}

resetForm();
getAccounts(currentPageIndex, pagesNumber);
getPlayers();

