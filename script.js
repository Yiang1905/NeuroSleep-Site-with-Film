// NeuroSleep Technology V8.2


document.addEventListener(
"DOMContentLoaded",
function(){


console.log(
"NeuroSleep Technology V8.2 Loaded"
);





// =========================
// Smooth Navigation
// =========================


const links =
document.querySelectorAll(
".navbar a"
);



links.forEach(
link=>{


link.addEventListener(
"click",
function(e){



const target =
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth",

block:"start"

});



}



}

);


});









// =========================
// Button Interaction
// =========================



const buttons =
document.querySelectorAll(
".btn"
);



buttons.forEach(
button=>{


button.addEventListener(
"click",
function(){



console.log(

"NeuroSleep Partnership Interest"

);



}


);



});









// =========================
// Header Scroll Effect
// =========================



const navbar =
document.querySelector(
".navbar"
);



window.addEventListener(
"scroll",
function(){



if(window.scrollY>50){



navbar.style.background =
"rgba(5,7,13,.9)";



}

else{


navbar.style.background =
"rgba(5,7,13,.65)";



}



}

);









// =========================
// Image Error Detection
// =========================



const images =
document.querySelectorAll(
"img"
);



images.forEach(
img=>{


img.addEventListener(
"error",
function(){



console.warn(

"NeuroSleep Image Loading Failed:",

this.src

);



}

);



});



});