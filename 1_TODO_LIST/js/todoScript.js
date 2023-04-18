"use strict"

const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.getElementById("add");
const clear = document.getElementById("clear");
const url = document.getElementById("url");
const load = document.getElementById("load");

const storage = new ArrayStorage("tasks");

//const tabelle =["salle de sport", "manger la banane", "tourner des tutos"];
const tabelle = storage.list;

//Une fonction qui ajoute des tache au dom avec un bouton de suppression
function taskToDOM(tabelle) {
    //si on a une chaine de caractere non vide
    if (typeof tabelle === "string" && tabelle) {
        const li = document.createElement("li");
        const remove = document.createElement("button");

        li.textContent = tabelle;
        remove.textContent = "LÖSCHEN";

        remove.addEventListener("click", () => {
            const value = remove.parentNode.firstChild.textContent;
            storage.einElementLoeschen(value);
            list.removeChild(remove.parentNode);
        });

        li.appendChild(remove);

        list.insertBefore(li, list.firstChild);

        return true;
    }

    return false;
}

//ajouter chaque tache a la liste a puce
/*
tabelle.forEach(elementDerTabelle   => {
    taskToDOM(elementDerTabelle)
});
*/

for (let i=0; i<tabelle.length; i++) {
    taskToDOM(tabelle[i]);
}



//ajouter une tache avec un clic sur le bouton add et avec la touche entree
function tasteEnterGedruckt(){
   if(storage.list.indexOf(input.value) === -1 && taskToDOM(input.value)){
       storage.einElementBearbeiten(input.value);
       input.value = "";
   }
    input.focus();
}

add.addEventListener("click", tasteEnterGedruckt);
input.addEventListener("keydown", e  => {
    if(e.key === "Enter"){
        tasteEnterGedruckt();
    }
});


clear.addEventListener("click", () => {
    storage.AllesLoeschen();
    list.innerHTML="";
})

//gerer limportation de taches
load.addEventListener("click", importData)
url.addEventListener("keydown", e  => {
    if(e.key === "Enter"){
        importData();
    }
});

function importData(){
    fetch(url.value)
        .then(antwort => {
            if(antwort.ok){
                return antwort.json();
            }
            throw new Error(antwort.statusText + " (" + antwort.status + ")");
        })
        .then(tabelle => {
            if(Array.isArray(tabelle)){
                tabelle.forEach(einElementDerTabelle => {
                    if(storage.list.indexOf(einElementDerTabelle) === -1 && taskToDOM(einElementDerTabelle)){
                        storage.einElementBearbeiten(einElementDerTabelle);
                    }
                });
                return ;
            }
            throw new TypeError("Die Antwort ist keine Tabelle von type JSON (type:" + typeof antwort);
        })
}
