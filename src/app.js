import { generatePalette } from "./modules/ColorPal";
import { isHexColor } from "./modules/ColorPal";
import { hexToCSSHSL  } from "./modules/ColorPal";
import { Color } from "./modules/Color";
import * as convert from "color-convert";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const form = document.querySelector("form");

form.addEventListener("submit", function(e){
    e.preventDefault();

    //Prendre la valeur de l'élément value
    const inputValue =  e.target.firstElementChild.value;

    //const inputValue = document,querySelector("form").value;
    //console.log(form.value);

    if(isHexColor){
        const palette = generatePalette(inputValue);
        console.log(inputValue, palette);
        displayColors(inputValue, palette);
    }else{
        throw new Error(`Sorry mate, ${form.value} is not a valid hexadecimal color.`);
        notyf.error(err.message);
    }


});

const colorContainer = document.querySelector("main");

const handleClick = async (e) =>{
    const color = e.target.closest(".color").dataset.color;
    await navigator.clipboard.writeText(color);

    notyf.success(`copied ${color} to clipboard`);
}

colorContainer.addEventListener("click", handleClick);

const displayColors = (input, palette) =>{
    palette.map((c) => new Color(c).display(colorContainer));

    const header = document.querySelector("header");
    header.classList.add("minimized");
    colorContainer.innerHTML = "";

    const gradientColors = [0, Math.round(palette.length / 2), palette.length - 1].map(
        (index) => `#${convert.hsl.hex(palette[index])}`
      );

    document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(",")}`;
    document.body.style.backgroundSize = `400% 400%`;

    document.documentElement.style.setProperty("--shadow-color", hexToCSSHSL(input));
}

const notyf = new Notyf();
