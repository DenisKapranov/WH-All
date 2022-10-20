const terex = document.getElementById("terex")
const cactus = document.getElementById("cactus")
var audioGO = new Audio();
var audioJump = new Audio();
audioGO.src = "audio/go.mp3"
audioJump.src = "audio/2.mp3"
document.addEventListener("keydown", function(event) {
    jump();
});

function jump() {
    if (terex.classList != "jump") {

        terex.classList.add("jump")
        audioJump.play();
    }

    setTimeout(function() {
        terex.classList.remove("jump")
    }, 700)
}
var score = 0;
let setAlive = setInterval(function() {
    let terexTop = parseInt(window.getComputedStyle(terex).getPropertyValue("top"))
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))
    if (cactusLeft < 50 && cactusLeft > 0 && terexTop >= 140) {
        // alert(score);
        audioGO.play();
        alert("Game over!");
    }
}, 20);

// var score =