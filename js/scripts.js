//two below functions control the fading to and from the black screen
function fadeIn(){
    $('#transition').fadeTo(1500,0);
}
function fadeOut(){
    $('#transition').fadeTo(1500,1);
}

//this on keypress detects input from wasd and moves character approprately
$(document).on("keypress", function (e) {
    console.log(e.which);
    switch(true){
        case e.which == 119:
            $('#character').css('top', `${(getPlayerY() - 5)}px`);
            break;
        case e.which == 97:
            $('#character').css('left', `${(getPlayerX() - 10)}px`);
            break;
        case e.which == 115:
            $('#character').css('top', `${(getPlayerY() + 5)}px`);
            break;
        case e.which == 100:
            $('#character').css('left', `${(getPlayerX() + 10)}px`);
            break;
        case e.which == 13:
            console.log('enter');
    }
    if(getPlayerY() >= window.innerHeight){
        fadeOut();
        onIntro = false;
        prepareAboutMe();
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
var onIntro = true;
function blink_text() {
    if(onIntro){
        $('#blinkingMessage').fadeIn(500);
        $('#blinkingMessage').fadeOut(500);
    }
}
setInterval(blink_text, 1000);

// this gets rid of the start menu items and prepares the about me page
function prepareAboutMe(){
    $('.intro').css('display','none');
    $('#character').css('top', '5%').css('left', '47%');
    fadeIn();
}