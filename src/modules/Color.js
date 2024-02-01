import * as convert from "color-convert";

export class Color{
    #hsl;
    #hex;
    #element;

    constructor(hsl){
        this.#hsl = hsl;
        this.#hex = `#${convert.hsl.hex(hsl)}`;
        this.#element = this.#generateElement();
    }

    #generateElement(){
        //Création élément <div>
        const colorElement = document.createElement("div");
        colorElement.classList.add("color");
        colorElement.dataset.color = this.#hex;
        colorElement.style.backgroundColor = this.#hex;

        //Création élément <p>
        const textElement = document.createElement("p");
        textElement.textContent = this.#hex;
        textElement.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";

        colorElement.appendChild(textElement);

        return colorElement;
    }

    display(parentElement){
        parentElement.appendChild(this.#element);
    }
}