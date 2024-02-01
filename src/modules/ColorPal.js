import * as convert from "color-convert";

export const generatePalette = (hex) =>{
    //création d'un tableau vide
    const colors = [];

    //Converti le hex donné en tab hsl, il ne prend que les 2 premières valeures
    const [h, s] = convert.hex.hsl(hex);

    //Itère entre 0 et 100 par intervalle de 10
    for(let i = 0; i <= 100; i +=10){
        //chaque itération, on pousse un nouveau tableau dans color
        // la teinte et saturation sont fixe, la luminosité évolue
        colors.push([h, s, i])
    }

    return colors;
}

export const isHexColor = (hex) => /^#[0-9A-F]{6}$/i.test(hex);

export const hexToCSSHSL = (hex) => {
	// tranforme le hex d'entrée en HSL.
  const hsl = convert.hex.hsl(hex);
	// Retourne une chaîne de caractère au format css.
  return `${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%`;
};