//set letters
let letters="abcdefghijklmnopqrstuvwxyz";
let lettersArray=Array.from(letters);
//get letters container
let lettersContainer=document.querySelector(".letters");
//add letters to container
lettersArray.forEach((letter)=>{
    let span=document.createElement("span");
    let theLetter=document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className="letter-box";
    lettersContainer.appendChild(span);
})
//create words object
let words={
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Shatter Island", "Inception", "Interstellar", "Divergent", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
let allKeys=Object.keys(words);
//get random prop number
let randomPropNum=Math.floor(Math.random()*allKeys.length);
let randomPropName=allKeys[randomPropNum];
let randomPropValue=words[randomPropName];
let randomValueNum=Math.floor(Math.random()*randomPropValue.length);
let theWord=randomPropValue[randomValueNum];
// add the Word category to page
let categoryName=document.querySelector(".category span");
categoryName.appendChild(document.createTextNode(randomPropName));
//get array from letters
let letterArray=Array.from(theWord);
// create span according to number of lettters
let lettersGuess=document.querySelector(".letters-guess");
//add lettters to page
letterArray.forEach(letter=>{
    let letterSpan=document.createElement("span");
    if(letter===" "){
        letterSpan.className="has-space";
    }
    lettersGuess.appendChild(letterSpan);
})
// span Guesses
let spanGuesses=document.querySelectorAll(".letters-guess span");
//the draw
let theDraw=document.querySelector(".hangman-draw");
//wrong attemps
let wrongAttemps=0;
//success attemps
let success=0;
//onclick
lettersContainer.addEventListener("click",(e)=>{
    //set the status
    let status=false;
    if(e.target.className==="letter-box"){
        e.target.classList.add("clicked");
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        theChosenWord=Array.from(theWord.toLowerCase());
        theChosenWord.forEach((letter,wordIndex)=>{
            if(theClickedLetter===letter){
                success++;
                status=true;
               spanGuesses.forEach((span,spanIndex)=>{
                if(wordIndex==spanIndex){
                    if(wordIndex===0){
                        span.innerHTML=theClickedLetter.toUpperCase();
                    }else{
                        span.innerHTML=theClickedLetter;
                    }
                }
               })
            }
        })
        checkSuccess();
        if(status===false){
            wrongAttemps++;
            theDraw.classList.add(`wrong-${wrongAttemps}`);
        }
        if(wrongAttemps==8){
            gameOver();
            lettersContainer.classList.add("finished");
        }
    }
})
let restart=document.createElement("span");
restart.className="restart";
restart.appendChild(document.createTextNode("Restart"));
function gameOver(){
    let div=document.createElement("div");
    div.className="pop";
    let span=document.createElement("span");
    span.appendChild(document.createTextNode(`The Word is ${theWord}`));
    div.appendChild(span);
    div.appendChild(restart);
    document.body.appendChild(div);
    document.getElementById("fail").play();
}
restart.onclick=()=>{
    window.location.reload();
}
function checkSuccess(){
    if(success==spanGuesses.length){
        lettersContainer.classList.add("finished");
        let div=document.createElement("div");
        div.className="success";
        let span=document.createElement("span");
        span.appendChild(document.createTextNode(`Yayy!!`));
        div.appendChild(span);
        div.appendChild(restart);
        document.body.appendChild(div);
        document.getElementById("success").play();
    }
}