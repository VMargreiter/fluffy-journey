let key;

let actualKeySet = new Set();

actualKeySet.add('A');
actualKeySet.add('S');
actualKeySet.add('D');
actualKeySet.add('F');
actualKeySet.add('G');
actualKeySet.add('H');
actualKeySet.add('J');
actualKeySet.add('W');
actualKeySet.add('E');
actualKeySet.add('T');
actualKeySet.add('Z');
actualKeySet.add('U');


let audio;
let audioSource;
document.addEventListener("keydown", function(event){
    key = event.key;
    if(actualKeySet.has(event.key.toUpperCase())) {
        audioSource = event.key.toUpperCase();
        audio = new Audio("white_keys/" + audioSource + ".mp3");
        audio.play();
    }
    else {
        console.log("This key won't play any tune!")
    }
})

