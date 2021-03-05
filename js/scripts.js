//two below functions control the fading to and from the black screen
function fadeIn(){
    $('#transition').fadeTo(1500,0);
}
function fadeOut(){
    $('#transition').fadeTo(1500,1);
}

//this on keypress detects input from wasd and moves character approprately
$(document).on("keypress", function (e) {
    switch(true){
        case e.which == 119:
            $('#character').css('top', `${(getPlayerY() - 5)}px`);
            break;
        case e.which == 97:
            $('#character').css('left', `${(getPlayerX() - 5)}px`);
            break;
        case e.which == 115:
            $('#character').css('top', `${(getPlayerY() + 5)}px`);
            break;
        case e.which == 100:
            $('#character').css('left', `${(getPlayerX() + 5)}px`);
            break;
    }
});

//these functions get the character's current y and x values respectively
function getPlayerY(){
    var character = getComputedStyle(document.querySelector('#character'));
    return parseInt(character.top, 10);
}
function getPlayerX(){
    var character = getComputedStyle(document.querySelector('#character'));
    return parseInt(character.left, 10);
}

//this code makes the "down here" text blink
function blink_text() {
    $('#blinkingMessage').fadeOut(500);
    $('#blinkingMessage').fadeIn(500);
}
setInterval(blink_text, 1000);
