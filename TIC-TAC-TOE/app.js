//Global variables//
// Commented variables due to attempting the bot game.
// I decided to leave them to return to later.//
let playerOneScore = 0;
let playerTwoScore = 0;
let ties = 0;
let turn = 1;
const openModalButtons = document.querySelectorAll(`[data-modal-target]`)
const closeModalButtons = document.querySelectorAll(`[data-close-page]`)
const overlay = document.getElementById('overlay')
const buttonOne = document.getElementById('input-names')
// const box1 = $('#1')
// const box2 = $('#2')
// const box3 = $('#3')
// const box4 = $('#4')
// const box5 = $('#5')
// const box6 = $('#6')
// const box7 = $('#7')
// const box8 = $('#8')
// const box9 = $('#9')
// const boxArray = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9" ]

// function randomSelection(){
//     Math.floor(Math.random() *8)
//     return Math.floor(Math.random() *8);
// }

// function playBot(){
//     //...//
// }


//Check for winner//
function isThereAWinner(val){
    if ($('.row-1 .box.' + val).length ===3
    || $('.row-2 .box.' + val).length ===3
    || $('.row-3 .box.' + val).length ===3
    || $('.column-1.' + val).length ===3
    || $('.column-2.' + val).length ===3
    || $('.column-3.' + val).length===3 
    || ($('#1').hasClass(val)
         && $('#5').hasClass(val)
         && $('#9').hasClass(val))
    || ($('#3').hasClass(val)
        && $('#5').hasClass(val)
        && $('#7').hasClass(val)))
        {
 
 $('.box').empty()
 $('.X').removeClass('X')
 $('.O').removeClass('O')

return true
}};

//Check for tie//
function isThereATie(){
    if ($('.X').length + $('.O').length === 9){
        $('.box').empty();
        $('.X').removeClass('X');
        $('.O').removeClass('O')
        ties++
        $('#ties').text(ties)
        announceTie()
        turn = 1
    }
};

//Announce the winner or announce tie game//
function congratulateWinnerX(){
     $('.congrats').text("Player 1 Won!").fadeIn(700).fadeOut(2200);
        // $('.congrats').css('font-size', '51.5px')  
};

function congratulateWinnerO(){
     $('.congrats').text("Player 2 Won!").fadeIn(700).fadeOut(2200)
};

function announceTie(){
    $('.congrats').text("Tie Game!").fadeIn(700).fadeOut(2200);
        $('.congrats').css('margin-bottom', '25px');
};


// Pop-Up Form: Citing Sources: I watched an open-source youtube tutorial by WebDevSimplified
// in order to complete the pop-up.
// Title: 'Build A Popup With Javascript'
// Author: WebDevSimplified
// Link: https://www.youtube.com/watch?v=MBaw_6cPmAw
// Date: 04/20/2019
 

//Open pop-up form//
function openModal(modal){
    if (modal == null) return 
    modal.classList.add('active');
    overlay.classList.add('active')
};

//Close pop-up form//
function closeModal(modal){
    if (modal == null) return 
    modal.classList.remove('active');
    overlay.classList.remove('active')
};

//Allow button clicks for pop-up//
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal)
    })
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal)
    })
});

//Change names to input values//
function changePlayerNames(){
    const inputValue1 = document.getElementById('player-1-input').value
    const inputValue2 = document.getElementById('player-2-input').value
    $('.player1-name').text(inputValue1).append(':');
    $('.player2-name').text(inputValue2).append(':');
    closeModal(modal);
};

//Reset player scores//
function resetScores(){
    if(playerOneScore > 0){
    playerOneScore = 0;
    $('.player-1-score').text(playerOneScore);
    if(playerTwoScore > 0){
        playerTwoScore = 0;
        $('.player-2-score').text(playerTwoScore);
   }
}};

function resetTies(){
    if(ties > 0){
        ties = 0;
        $('#ties').text(ties)
    }
}


//CLICK FUNCTIONS//
//The ginormous box click function//
$('.box').click(function(){
    if (turn === 1 && !$(this).text()){
         $(this).text('X').css({'color':'white',
        'font-family':'Pacifico'});
         $(this).addClass('X');
        turn = 2;

       if(isThereAWinner('X')){
           playerOneScore++;
           $('#player-1-score').text(playerOneScore);
           turn = 1;
           congratulateWinnerX() 

       }else isThereATie()

    } else if(!$(this).text()){
        $(this).text('O').css({'color':'white',
        'font-family':'Pacifico'});
        $(this).addClass('O');
        turn = 1

        if(isThereAWinner('O')){
            playerTwoScore++;
            $('#player-2-score').text(playerTwoScore);
            turn = 1;
            congratulateWinnerO() 

        }else isThereATie()
    }
     $('#turn').text(turn);
    
});

//Submit input//
$('.submit-button').click(function(){
    const inputValue1 = document.getElementById('player-1-input').value
    const inputValue2 = document.getElementById('player-2-input').value
    if(inputValue1 === ""){
        alert("Please Enter Two Valid Names")
        return false;
    }else if(inputValue2 === ""){
        alert("Please Enter Two Valid Names")
        return false;
    }else  
        $('.box').empty()
        $('.X').removeClass('X')
        $('.O').removeClass('O')
        changePlayerNames(); 
        resetScores();
        resetTies();
        if(turn ===2){
        turn = 1
     }
     $('#turn').text(turn)
});

//Restart Game//
$('.restart').click(function(){
    $('.box').empty()
    $('.X').removeClass('X')
    $('.O').removeClass('O')
    if(turn === 2){
       turn = 1
    }
    $('#turn').text(turn)
    
});

//Reset player scores//
$('.reset-score').click(function(){
    resetScores();
    resetTies();
});

//Display 'You' & 'Bot' names. Bot Mode coming soon//
$('.bot-mode').click(function(){
    closeModal(modal);
    $('.player1-name').text('You').append(':');
    $('.player2-name').text('Bot').append(':');
    resetScores();
    resetTies();
});
