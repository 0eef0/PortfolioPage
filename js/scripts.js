//two below functions control the fading to and from the black screen
function goAway(){
    $('#transition').fadeTo(1500,1);
}
function comeBack(){
    $('#transition').fadeTo(1500,0);
}


//this on keypress detects input from wasd and moves character approprately
$(document).on("keypress", function (e) {
    console.log(e.which);
    // the if statements inside the switch function keeps the character in bounds
    switch(true){
        case e.which == 119:
            $('#characterImg').attr('src','images/character_up.png');
            if(getPlayerY() > 0){
                $('#character').css('top', `${(getPlayerY() - 5)}px`);
            }
            break;
        case e.which == 97:
            $('#characterImg').attr('src','images/character_left.png');
            if(getPlayerX() > 0){
                $('#character').css('left', `${(getPlayerX() - 10)}px`);
            }
            break;
        case e.which == 115:
            $('#characterImg').attr('src','images/character_down.png');
            if(getPlayerY() <= (window.innerHeight - parseInt($('#character').css('height')))){
                $('#character').css('top', `${(getPlayerY() + 5)}px`);
            }
            break;
        case e.which == 100:
            $('#characterImg').attr('src','images/character_right.png');
            if(getPlayerX() <= (window.innerWidth - parseInt($('#character').css('width')))){
                $('#character').css('left', `${(getPlayerX() + 10)}px`);
            }
            break;
        case e.which == 13:
            isAtDoor();
            break;
        case e.which == 39 || e.which == 32:
            fire();
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

//this detects element overlap
function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
      
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

//collision($('#character'), $('.loadingZone'));

//this detects if character is at entrance and enters door if they are
function isAtDoor(){
    switch(true){
        case collision($('#character'), $('#hubLoadZone')):
            prepareAboutMe();
            break;
        case collision($('#character'), $('#ResumeLoadZone')):
            prepareResume();
            break;
        case collision($('#character'), $('#ProjectLoadZone')):
            prepareProject();
            break;
        case collision($('#character'), $('#EmploymentLoadZone')):
            prepareEmployment();
            break;
    }
}

//fires projectile
var canFire = true;
function fire(){
    if(canFire){
        switch(true){
            case $('#characterImg').attr('src') == 'images/character_down.png':
                fireDown();
                break;
            case $('#characterImg').attr('src') == 'images/character_up.png':
                fireUp();
                break;
            case $('#characterImg').attr('src') == 'images/character_right.png':
                fireRight();
                break;
            case $('#characterImg').attr('src') == 'images/character_left.png':
                fireLeft();
                break;
        }
    }
    canFire = false;
}
        /*
        if(collision($('#projectile'), $('#hubLoadZone'))){
            $('#hubLoadZone').fadeTo(1000,0);
            console.log('hit');
        }
        */
function fireDown(){
    $('#projectile').css('display','block');
    $('#projectile').css('top',(getPlayerY() + parseInt($('#character').css('height'))));
    $('#projectile').css('left',(getPlayerX() + (parseInt($('#character').css('width')) / 2) - (parseInt($('#projectile').css('width')) / 2)));

    var projectileY = parseInt($('#projectile').css('top'));
    setInterval(function(){ 
        if(projectileY <= window.innerHeight){
            projectileY += 10;
            $('#projectile').css('top',projectileY);
        }else{
            canFire = true;
        }
    }, 10);
}
function fireUp(){
    $('#projectile').css('display','block');
    $('#projectile').css('top',(getPlayerY()));
    $('#projectile').css('left',(getPlayerX() + (parseInt($('#character').css('width')) / 2) - (parseInt($('#projectile').css('width')) / 2)));

    var projectileY = parseInt($('#projectile').css('top'));
    setInterval(function(){ 
        if(projectileY >= (0 - (parseInt($('#projectile').css('height'))))){
            projectileY -= 10;
            $('#projectile').css('top',projectileY);
        }else{
            canFire = true;
        }
    }, 10);
}
function fireRight(){
    $('#projectile').css('display','block');
    $('#projectile').css('left',(getPlayerX() + parseInt($('#character').css('width'))));
    $('#projectile').css('top',(getPlayerY() + (parseInt($('#character').css('height')) / 2) - (parseInt($('#projectile').css('height')) / 2)));

    var projectileX = parseInt($('#projectile').css('left'));
    setInterval(function(){ 
        if(projectileX <= window.innerWidth){
            projectileX += 10;
            $('#projectile').css('left',projectileX);
        }else{
            canFire = true;
        }
    }, 10);
}
function fireLeft(){
    $('#projectile').css('display','block');
    $('#projectile').css('left',(getPlayerX()));
    $('#projectile').css('top',(getPlayerY() + (parseInt($('#character').css('height')) / 2) - (parseInt($('#projectile').css('height')) / 2)));

    var projectileX = parseInt($('#projectile').css('left'));
    setInterval(function(){ 
        if(projectileX >= 0 - (parseInt($('#projectile').css('width')))){
            projectileX -= 10;
            $('#projectile').css('left',projectileX);
        }else{
            canFire = true;
        }
    }, 10);
}

// this gets rid of the start menu items and prepares the about me page
function prepareAboutMe(){
    goAway();
    onIntro = false;
    $('#blinkingMessage').html('');
    $('#characterImg').attr('src','images/character_down.png');
    $('.intro').hide();
    $('.hub').css('display','block');
    $('#character').css('top', '5%').css('left', '47%');
    comeBack();
    $('body').css("backgroundColor", 'green');
}

// this gets rid of the hub menu items and prepares the resume page
function prepareResume(){
    goAway();
    onIntro = false;
    $('#blinkingMessage').html('');
    $('#characterImg').attr('src','images/character_down.png');
    $('.hub').hide();
    $('.resume').css('display','block');
    $('#character').css('top', '5%').css('left', '47%');
    comeBack();
    $('body').css("backgroundColor", 'red');
}

// this gets rid of the hub menu items and prepares the project page
function prepareProject(){
    goAway();
    onIntro = false;
    $('#blinkingMessage').html('');
    $('#characterImg').attr('src','images/character_down.png');
    $('.hub').hide();
    $('.resume').css('display','block');
    $('#character').css('top', '5%').css('left', '47%');
    comeBack();
    $('body').css("backgroundColor", 'blue');
}

// this gets rid of the hub menu items and prepares the employment page
function prepareEmployment(){
    goAway();
    onIntro = false;
    $('#blinkingMessage').html('');
    $('#characterImg').attr('src','images/character_down.png');
    $('.hub').hide();
    $('.resume').css('display','block');
    $('#character').css('top', '5%').css('left', '47%');
    comeBack();
    $('body').css("backgroundColor", 'grey');
}