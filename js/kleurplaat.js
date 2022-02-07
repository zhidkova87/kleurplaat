"use strict";

class Kleurplaat {
    #ctx;
    #canvas;
    #tekenen;
    constructor(ctx, canvas, tekenen) {
        this.#ctx = ctx;
        this.#canvas = canvas;
        this.#tekenen = tekenen;
    }

    getGrootteKleurplaat() {
        let returnValue;
        const grootte = document.getElementById("grootte").value;
        console.log(grootte);
        switch (grootte) {
            case "groot" :
                returnValue = 1;
                break;
            case "medium" :
                returnValue = 0.85;
                break;
            case "klein" :
                returnValue = 0.75;
                break;
        }
        return returnValue;
    }

    maakKleurplaat(grootte) {
        document.getElementById("canvas").hidden = false;

        this.#canvas.width = (window.innerWidth - 60) * grootte;
        this.#canvas.height = (window.innerHeight - 150) * grootte;
        this.#ctx.fillStyle = "white";
        this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        window.addEventListener("resize", () => {
            this.#canvas.width = (window.innerWidth - 60) * grootte;
            this.#canvas.height = (window.innerHeight - 150) * grootte;
            this.#ctx.fillStyle = "white";
            this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
         });
    }

    /*
    ===========================================================
    Wanneer je klikt op het canvas krijg je de coördinaten mee.
    ===========================================================
    */
    vindIndex(x, y) {
        const kleur = document.getElementById("kleuren").value;

        if (kleur !== "default") {
            console.log(`Ik ben veld x: ${x}, y: ${y} en ik werd zopas ${kleur} gekleurd`);
        } else {
            console.log(`Ik ben veld x: ${x}, y: ${y} en ik ben wit`);
        }
    }
  
    zetPen(event) {
        this.vindIndex(event.clientX - this.#ctx.canvas.offsetLeft, event.clientY - this.#ctx.canvas.offsetTop);
        this.#tekenen = true;
        this.#ctx.beginPath();
        this.#ctx.moveTo(event.clientX - this.#ctx.canvas.offsetLeft, event.clientY - this.#ctx.canvas.offsetTop);

        this.tekenen(event);
    }

    tekenen(event) {
        const dikte = document.getElementById("dikte").value;
        if (this.#tekenen ) {
            this.#ctx.lineTo(event.clientX - this.#ctx.canvas.offsetLeft, event.clientY - this.#ctx.canvas.offsetTop);
            this.#ctx.strokeStyle = this.kiesKleur();
            this.#ctx.lineWidth = dikte;
            this.#ctx.lineCap = "round";
            this.#ctx.stroke();
        }
    }

    stopTekenen() {
        if (this.#tekenen) {
            this.#ctx.stroke();
            this.#ctx.closePath();
            this.#tekenen = false;
        }
    }

    kiesKleur() {
        let returnValue;
        const kleur = document.getElementById("kleuren").value;

        switch (kleur) {
            case "rood" :
                returnValue = "red";
                break;
            case "groen" :
                returnValue = "green";
                break;
            case "blauw" :
                returnValue = "blue";
                break;
            default :
                returnValue = "white";
                break;
        }

        return returnValue;
    }
    
}



