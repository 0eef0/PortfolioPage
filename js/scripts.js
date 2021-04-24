// this controls the orientation of the screen
setInterval(function(){
    if(window.innerHeight > window.innerWidth){
        $('#landscape').css('display','block');
    }else{
        $('#landscape').css('display','none');
    }
}, 100);

//two below functions control the fading to and from the black screen
function goAway(){
    $('#transition').fadeTo(1500,1);
}
function comeBack(){
    $('#transition').fadeTo(1500,0);
    touchControl();
}


//this on keypress detects input from wasd and moves character approprately
var walkCycle = 0;
$(document).on("keypress", function (e) {
    //console.log(e.which);

    if(walkCycle >= 20 && (e.which == 119 || e.which == 87 || e.which == 97 || e.which == 65 || e.which == 115 || e.which == 83 || e.which == 100 || e.which == 68)){
        $('#character').css('transform','rotate(20deg)');
        walkCycle = 0;
    }else if(walkCycle >= 10 && (e.which == 119 || e.which == 87 || e.which == 97 || e.which == 65 || e.which == 115 || e.which == 83 || e.which == 100 || e.which == 68)){
        $('#character').css('transform','rotate(-20deg)');
    }
    

    // the if statements inside the switch function keeps the character in bounds
    switch(true){
        case e.which == 119 || e.which == 87:
            $('#characterImg').attr('src','images/character_up.png');
            if(getPlayerY() > 0){
                $('#character').css('top', `${(getPlayerY() - 10)}px`);
            }
            $('#phoneNumber').css('display','none');
            if($('#transition').css('opacity') == '0.5'){
                $('#transition').fadeTo(100,0);
            }
            break;
        case e.which == 97 || e.which == 65:
            $('#characterImg').attr('src','images/character_left.png');
            if(getPlayerX() > 0){
                $('#character').css('left', `${(getPlayerX() - 15)}px`);
            }
            $('#phoneNumber').css('display','none');
            if($('#transition').css('opacity') == '0.5'){
                $('#transition').fadeTo(100,0);
            }
            break;
        case e.which == 115 || e.which == 83:
            $('#characterImg').attr('src','images/character_down.png');
            if(getPlayerY() <= (window.innerHeight - parseInt($('#character').css('height')))){
                $('#character').css('top', `${(getPlayerY() + 10)}px`);
            }
            $('#phoneNumber').css('display','none');
            if($('#transition').css('opacity') == '0.5'){
                $('#transition').fadeTo(100,0);
            }
            break;
        case e.which == 100 || e.which == 68:
            $('#characterImg').attr('src','images/character_right.png');
            if(getPlayerX() <= (window.innerWidth - parseInt($('#character').css('width')))){
                $('#character').css('left', `${(getPlayerX() + 15)}px`);
            }
            $('#phoneNumber').css('display','none');
            if($('#transition').css('opacity') == '0.5'){
                $('#transition').fadeTo(100,0);
            }
            break;
        case e.which == 13:
            isAtDoor();
            break;
        case e.which == 39 || e.which == 32:
            fire();
            $('#character').css('transform','rotate(0deg)');
            break;
    }
    walkCycle++;
});

function moveUp(){
    $('#phoneNumber').css('display','none');
    if($('#transition').css('opacity') == '0.5'){
        $('#transition').fadeTo(100,0);
    }
    up = setInterval(function(){
        $('#characterImg').attr('src','images/character_up.png');
        if(getPlayerY() > 0){
            $('#character').css('top', `${(getPlayerY() - 10)}px`);
        }
        if(walkCycle >= 20){
            $('#character').css('transform','rotate(20deg)');
            walkCycle = 0;
        }else if(walkCycle >= 10){
            $('#character').css('transform','rotate(-20deg)');
        }
        walkCycle++;
    }, 50);
}
function stopMoveUp(){
    clearInterval(up);
    $('#character').css('transform','rotate(0deg)');
}

function moveLeft(){
    $('#phoneNumber').css('display','none');
    if($('#transition').css('opacity') == '0.5'){
        $('#transition').fadeTo(100,0);
    }
    left = setInterval(function(){
        $('#characterImg').attr('src','images/character_left.png');
        if(getPlayerX() > 0){
            $('#character').css('left', `${(getPlayerX() - 15)}px`);
        }
        if(walkCycle >= 20){
            $('#character').css('transform','rotate(20deg)');
            walkCycle = 0;
        }else if(walkCycle >= 10){
            $('#character').css('transform','rotate(-20deg)');
        }
        walkCycle++;
    }, 50);
}
function stopMoveLeft(){
    clearInterval(left);
    $('#character').css('transform','rotate(0deg)');
}

function moveDown(){
    $('#phoneNumber').css('display','none');
    if($('#transition').css('opacity') == '0.5'){
        $('#transition').fadeTo(100,0);
    }
    down = setInterval(function(){
        $('#characterImg').attr('src','images/character_down.png');
        if(getPlayerY() <= (window.innerHeight - parseInt($('#character').css('height')))){
            $('#character').css('top', `${(getPlayerY() + 10)}px`);
        }
        if(walkCycle >= 20){
            $('#character').css('transform','rotate(20deg)');
            walkCycle = 0;
        }else if(walkCycle >= 10){
            $('#character').css('transform','rotate(-20deg)');
        }
        walkCycle++;
    }, 50);
}
function stopMoveDown(){
    clearInterval(down);
    $('#character').css('transform','rotate(0deg)');
}

function moveRight(){
    $('#phoneNumber').css('display','none');
    if($('#transition').css('opacity') == '0.5'){
        $('#transition').fadeTo(100,0);
    }
    right = setInterval(function(){
        $('#characterImg').attr('src','images/character_right.png');
        if(getPlayerX() <= (window.innerWidth - parseInt($('#character').css('width')))){
            $('#character').css('left', `${(getPlayerX() + 15)}px`);
        }
        if(walkCycle >= 20){
            $('#character').css('transform','rotate(20deg)');
            walkCycle = 0;
        }else if(walkCycle >= 10){
            $('#character').css('transform','rotate(-20deg)');
        }
        walkCycle++;
    }, 50);
}
function stopMoveRight(){
    clearInterval(right);
    $('#character').css('transform','rotate(0deg)');
}

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
        case collision($('#character'), $('#hubLoadZone1')):
            prepareAboutMe('0','47.5%','down');
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
        case collision($('#character'), $('#hubLoadZone2')):
            prepareAboutMe('75%','5%','right');
            break;
        case collision($('#character'), $('#hubLoadZone3')):
            prepareAboutMe('75%','90%','left');
            break;
        case collision($('#character'), $('#hubLoadZone4')):
            prepareAboutMe('80%','47.5%','up');
            break;
        case collision($('#character'), $('#github')):
            window.location.href="https://github.com/TheCapn-MEC";
            break;
        case collision($('#character'), $('#tallo')):
            window.location.href="https://app.tallo.com/profile/1243643?accessCode=d1-MB6HrukW0_GRWVXCDhX8-7wsF0lOMdYob1V11qIA";
            break;
        case collision($('#character'), $('#email')):
            window.location.href="mailto:ethanryanroldan@gmail.com";
            break;
        case collision($('#character'), $('#phone')):
            $('#phoneNumber').css('display','block');
            $('#transition').fadeTo(100,0.5);
            break;
        case collision($('#character'), $('#project1')):
            window.location.href="https://amakris12.github.io/Group-bootstrap/index.html";
            break;
        case collision($('#character'), $('#project2')):
            window.location.href="https://thecapn-mec.github.io/BrandedSite/";
            break;
        case collision($('#character'), $('#project3')):
            window.location.href="https://thecapn-mec.github.io/Galley_Website_Add-on_Project/";
            break;
        case collision($('#character'), $('#project4')):
            window.location.href="https://princetonjeffries.github.io/businessDesign/";
            break;
        case collision($('#character'), $('#project5')):
            window.location.href="https://thecapn-mec.github.io/bootstrapProfilePage/";
            break;
            /*
        case collision($('#character'), $('#trashSiteThumbnail')):
            window.location.href="https://thecapn-mec.github.io/BrandedSite/";
            break;
            */
    }
}

//fires projectile
var canFire = true;
function fire(){
    if(canFire){
        $('.progressBar').css('background-color','#ff0000').fadeTo(1,0);
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
        canFire = false;
        setTimeout(function(){
            $('#progress1').fadeTo(500,1);
        },500);
        setTimeout(function(){
            $('#progress2').fadeTo(500,1);
        },1000);
        setTimeout(function(){
            $('#progress3').fadeTo(500,1);
        },1500);
        setTimeout(function(){
            canFire = true;
            $('.progressBar').css('background-color', '#00ff00');
        },2000);
    }
}
function fireDown(){
    $('#projectile').css('display','block');
    $('#projectile').css('top',(getPlayerY() + parseInt($('#character').css('height'))));
    $('#projectile').css('left',(getPlayerX() + (parseInt($('#character').css('width')) / 2) - (parseInt($('#projectile').css('width')) / 2)));

    var projectileY = parseInt($('#projectile').css('top'));
    setInterval(function(){ 
        if(projectileY <= window.innerHeight){
            projectileY += 10;
            $('#projectile').css('top',projectileY);
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
        }
    }, 10);
}

// this checks if a projectile is over specific elements and runs a function if there is
setInterval(function(){
    switch(true){
        case collision($('#projectile'), $('#aboutMeCrate')):
            $('#projectile').css('display','none');
            $('#aboutMeCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#aboutMeCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#moreAboutMeCrate')):
            $('#projectile').css('display','none');
            $('#moreAboutMeCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#moreAboutMeCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#linksCrate')):
            $('#projectile').css('display','none');
            $('#linksCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#linksCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#skillsCrate')):
            $('#projectile').css('display','none');
            $('#skillsCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#skillsCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#projectOneCrate')):
            $('#projectile').css('display','none');
            $('#projectOneCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#projectOneCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#projectTwoCrate')):
            $('#projectile').css('display','none');
            $('#projectTwoCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#projectTwoCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#projectThreeCrate')):
            $('#projectile').css('display','none');
            $('#projectThreeCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#projectThreeCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#projectFourCrate')):
            $('#projectile').css('display','none');
            $('#projectFourCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#projectFourCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#projectFiveCrate')):
            $('#projectile').css('display','none');
            $('#projectFiveCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#projectFiveCrate').hide();
            }, 300);
            break;
        case collision($('#projectile'), $('#projectSixCrate')):
            $('#projectile').css('display','none');
            $('#projectSixCrate').attr('src','images/brokenCrate.png').css('opacity','0.5');
            setTimeout(function(){
                $('#projectSixCrate').hide();
            }, 300);
            break;
    }
}, 10);

// this gets rid of the start menu items and prepares the about me page
function prepareAboutMe(top,left,orient){
    goAway();
    setTimeout(function(){
        $('#characterImg').attr('src','images/character_'+ orient + '.png');
        $('.intro').hide();
        $('.resume').hide();
        $('.project').hide();
        $('.employ').hide();
        $('.hub').css('display','block');
        $('.load').css('display', 'flex');
        $('#character').css('top', top).css('left', left);
        $('.crate').attr('src','images/intactCrate.jpg').css('opacity','1');
        $('body').css("backgroundImage", 'url("images/grass.png")');
        comeBack();
    }, 1500);
}

// this gets rid of the hub menu items and prepares the resume page
function prepareResume(){
    goAway();
    setTimeout(function(){
        $('#characterImg').attr('src','images/character_left.png');
        $('.hub').hide();
        $('.resume').css('display','block');
        $('#character').css('top', '75%').css('left', '90%');
        $('body').css("backgroundColor", 'red');
        comeBack();
    }, 1500);
}

// this gets rid of the hub menu items and prepares the project page
function prepareProject(){
    goAway();
    setTimeout(function(){
        $('#characterImg').attr('src','images/character_down.png');
        $('.hub').hide();
        $('.project').css('display','block');
        $('#character').css('top', '5%').css('left', '47%');
        $('body').css("backgroundColor", 'blue');
        $('.crate').attr('src','images/intactCrate.jpg').css('opacity','1');
        comeBack();
    }, 1500);
}

// this gets rid of the hub menu items and prepares the employment page
function prepareEmployment(){
    goAway();
    setTimeout(function(){
        $('#characterImg').attr('src','images/character_right.png');
        $('.hub').hide();
        $('.employ').css('display','block');
        $('#character').css('top', '75%').css('left', '5%');
        $('body').css("backgroundImage", 'url("images/stone.png")');
        comeBack();
    }, 1500);
}

// puts mobile controls on screen
function touchControl(){
    if(window.innerWidth <= 1025){
        $('.control').show();
        $('#upButton').html('<h1>▲</h1>');
        $('#leftButton').html('<h1>◄</h1>');
        $('#rightButton').html('<h1>►</h1>');
        $('#downButton').html('<h1>▼</h1>');
        $('#spaceBar').html('Fire');
        $('#enterKey').html('Enter');
    }
}
//▲►◄▼
