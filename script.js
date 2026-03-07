let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let Uppercase = document.getElementById("Uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");

// showing input slider value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', ()=>{
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener('click', ()=> {
    passBox.value = generatePassword();
})

let lowerchars = 'azertyuiopqsdfghjklmwxcvbn';
let upperChars = 'AZERTYUIOPQSDFGHJKLMWXCVBN';
let allNumbers = '0123456789';
let allSymbols = '&#%@!$'

// Function to generate Password
function generatePassword(){
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerchars : "";
    allChars += lowercase.checked ? Uppercaseerchars : "";
    allChars += lowercase.checked ? allNumbers : "";
    allChars += lowercase.checked ? allSymbols : "";

    let i = 1;
    while(i<=inputSlider.value){
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    return genPassword;
}