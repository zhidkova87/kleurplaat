"use strict";

const selectGrootte = document.getElementById("grootte");
const knopNieuw = document.getElementById("nieuw");
const knopGum = document.getElementById("gum");
const ctx = document.querySelector("canvas").getContext("2d");
const canvas = ctx.canvas;
let tekenen = false;
const kleurplaat = new Kleurplaat(ctx, canvas, tekenen);    
const muis = {
    x : undefined,
    y : undefined,
};

/*
===========================================================
Je kan pas een kleurplaat starten indien je de grootte
ervan invult.
===========================================================
*/
selectGrootte.addEventListener("change", () => {
    if (selectGrootte.value === "default") {
        knopNieuw.disabled = true;
    } else {
        knopNieuw.disabled = false;
    }
});

knopNieuw.addEventListener("click", () => {
    kleurplaat.maakKleurplaat(kleurplaat.getGrootteKleurplaat());
});

/* 
===========================================================
eventlisteners die het tekenen in gang zetten
===========================================================
*/   
canvas.addEventListener("mousedown", (event) => {
    kleurplaat.zetPen(event);
});
canvas.addEventListener("mousemove", (event) => {
    kleurplaat.tekenen(event);
});
canvas.addEventListener("mouseup", () => {
    kleurplaat.stopTekenen();
});
canvas.addEventListener("mouseout", () => {
    kleurplaat.stopTekenen();
});

