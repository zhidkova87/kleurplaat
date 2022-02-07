"use strict";

//maakt een nieuwe blad aan
document.getElementById("submit").addEventListener("click", getSize);

//maakt blad leeg
document.getElementById("reset").addEventListener("click", resetAllColors);

//exporteert naar JSON
document.getElementById("naarJSON").onclick = function () {
    let table = document.getElementById("table");
    console.log(
        JSON.stringify(
            tableToJson(table)));
}

//importeert uit een JSON file
document.getElementById("vanJSON").onclick = function () {
    tableExists();
    leesJSON();
}

let colors = document.getElementById("colors");
colors.onclick = function (event) {
    let color = event.target.closest("div").id;
    if (color === "keuzeReset") {
        resetColor(table);
    } else {
        changeColor(color);
    }
}

//kleurt cell in andere kleur
function changeColor(color) {
    let table = document.getElementById("table");
    if (table) {
        table.onclick = function (event) {
            let td = event.target.closest("td");
            if (!td) return;
            if (!table.contains(td)) return;
            td.className = color;
            console.log(`Ik ben veld ${td.dataset.row}, ${td.dataset.column} en ik werd zopas ${color} gekleurd`);
        }
    }
}

//maakt een nieuwe tabel aan
    function createTable(rows, columns) {
        tableExists();
        let table = document.createElement('table');
        table.setAttribute("id", "table");
        for (let i = 1; i <= rows; i++) {
            const tr = table.insertRow();
            for (let j = 1; j <= columns; j++) {
                const td = tr.insertCell();
                td.innerHTML = "&nbsp";
                td.className = "wit";
                td.setAttribute("data-row", `${i}`);
                td.setAttribute("data-column", `${j}`);
            }
        }
        document.getElementById("sheet").append(table);
        resetColor(table)
}

//haalt aantal rijen en colommen
    function getSize() {
        let rows = document.getElementById("rows").value;
        let columns = document.getElementById("columns").value;
        let data = validateForm(rows, columns);
        if (data !== false)  {
            createTable(rows, columns);
            newInput();
        }
        newInput();
    }

//controleert of tabel al bestaat, so ja verwijdert bestande tabel
    function tableExists() {
        let table = document.getElementById('table');
        if (table) table.remove();
    }

//maakt input velden leeg
    function newInput() {
        document.getElementById("rows").value = "";
        document.getElementById("columns").value = "";
    }

//reset kleurKeuze en toon welke kleur heeft een cell
    function resetColor(table) {
        table.onclick = function (event) {
            let td = event.target.closest("td");
            if (!td) return;
            if (!table.contains(td)) return;
            console.log(`Ik ben veld ${td.dataset.row}, ${td.dataset.column} en ik ben ${td.className}`);
        }
    }

//maakt kleurplaat leeg
    function resetAllColors() {
        let tds = document.querySelectorAll("td");
        for (let td of tds) {
            td.className = "wit";
        }
    }
//controleert input van rijen en kolommen
    function validateForm(rows, columns) {
         if (Number(rows) > 25 || (Number(columns) > 50)) {
            alert("Tabel kan niet groter dan 25X50 zijn");
            return false;
        }
    }
//exporteert naar JSON
    function tableToJson(table) {
        let tableObject = [];
        for (let i = 0; i < table.children.length; i++) {
            let row = [];
                for (let j = 0; j < table.children[i].children.length; j++) {
                    row.push(table.children[i].children[j].innerHTML);
                }
                tableObject.push(row);
        }
        return (tableObject);
    }


//leest JSON file
async function leesJSON() {
    const response = await fetch("tabel.json")
    if (response.ok) {
        let data = await response.json();
        voegTabelToe(data);

    } else {
        document.getElementById("nietGevonden").hidden = false;
    }
}
//maakt tabel van een JSON file
function voegTabelToe(data) {
    let table = document.createElement('table');
    table.setAttribute("id", "table");
    console.log(data[0]);
    for (let elem of data[0]) {
        let tr = table.insertRow();
        tr.innerHTML = elem;
        table.append(tr);
    }
    document.getElementById("sheet").append(table);
}














