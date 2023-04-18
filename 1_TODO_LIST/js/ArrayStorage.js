"use strict"

class ArrayStorage{
    constructor(nameDerAufgabe) {
        this.nameDerAufgabe = nameDerAufgabe;
        this.list = this.einElementSehenOderHinfuegen();
    }

    //une methode pour recuperer un tableau ou par defaut le creer sil nexiste pas encore
    einElementSehenOderHinfuegen(){
        if(!localStorage.getItem(this.name)){
            localStorage.setItem(this.name, "[]");
        }
        return JSON.parse(localStorage.getItem(this.name));
    }

    //une methode pour ajouter une valeur dans le tableau
    einElementBearbeiten(value){
        this.list.push(value);
        localStorage.setItem(this.name, JSON.stringify(this.list));
    }

    einElementLoeschen(value){
        const index = this.list.indexOf(value);
        this.list.splice(index, 1);
        localStorage.setItem(this.name, JSON.stringify(this.list));
    }

    AllesLoeschen(){
        localStorage.removeItem(this.name);
    }
}