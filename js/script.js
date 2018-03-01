
const $startScreen = $('#start');
const $boardScreen = $('#board');
const $finalScreen = $('#finish');
const $playerOne = $('#player1');
const $playerTwo = $('#player2');
const $box = $('.box');
const $startButton = $("a.button:contains('Start game')");
const $newGameButn = $("a.button:contains('New game')");


//Displaying the start screen and the board screen when the button is clicked
!function (){
  $boardScreen.hide();
  $finalScreen.hide();
  $startButton.click(function(){
     $startScreen.hide();
     $boardScreen.show();

  let random = Math.round(Math.random());
  if (random === 0){
    return playerActive($playerOne);
  }else {
    return playerActive($playerTwo);
  }
  });
playGame();
}();
function playGame()  {
  $box.each(function(){
    $(this).mouseenter(function(){ // Add the background image on hover
      if ( $playerOne.hasClass("active")) {
        $(this).css('background-image', 'url("img/o.svg")');
      } else {
        $(this).css('background-image', 'url("img/x.svg")');
      }
    });
    $(this).mouseleave(function(){ // On mouseleave, remove the background image
      $box.css('background-image', '');
    });
  });
  $box.click(function(){ // On click, check to see if user already placed piece down. If not, then add class box-filled, add background image, unbind the mouseleave function, fire nextTurn function to switch active class to next player. Check for win condition.
    if ($playerOne.hasClass("active")) {
        $(this).addClass('box-filled-1');
        $(this).css('background-image', 'url("img/o.svg")');
        $(this).off();
        checkIfWon();
        switchPlayerTurn()

    } else if ($playerTwo.hasClass("active")) {
        $(this).addClass('box-filled-2');
        $(this).css('background-image', 'url("img/x.svg")');
        $(this).off();
        checkIfWon();
        switchPlayerTurn();

    }
  });
};

function switchPlayerTurn() {
  if ( $playerOne.hasClass('active') ) {
    $playerOne.removeClass("active");
    $playerTwo.addClass("active");
  } else {
    $playerTwo.removeClass("active");
    $playerOne.addClass("active");
  }
};


function checkIfWon() {
  // Create empty arrary of moves
  var winGame = [];
  //Loop over boxes and add currently placed piece
  $box.each(function(){
    if ($(this).hasClass('box-filled-1')) {
      winGame.push('o');
    } else if ($(this).hasClass('box-filled-2')) {
      winGame.push('x');
    } else {
      winGame.push("none");
    }
  });


  function checkW(a,b,c){
    return (winGame[a] !== "none" && winGame[a] === winGame[b] && winGame[b] === winGame[c]);
  }
  // Check the array to find winning combinations. If pieces match one in 8 possible combinations, set the winner to matching name
    if (checkW(0,1,2)) {
      winner = winGame[0];
      finalScreen();
    } else if (checkW(3,4,5)) {
      winner = winGame[3];
      finalScreen();
    } else if (checkW(6,7,8)) {
      winner = winGame[6];
      finalScreen();
    } else if (checkW(0,3,6)) {
      winner = winGame[0];
      finalScreen();
    } else if (checkW(1,4,7)) {
      winner = winGame[1];
      finalScreen();
    } else if (checkW(2,5,8)) {
      winner = winGame[2];
      finalScreen();
    } else if (checkW(0,4,8)) {
      winner = winGame[0];
      finalScreen();
    } else if (checkW(2,4,6)) {
      winner = winGame[2];
      finalScreen();
    } else if (!winGame.includes("none")){
      winner = "Tie";
      finalScreen();
    }

};
 function finalScreen () {
  if (winner === "o") {
     finitoScreen('screen-win-one','Winner!');
  } else if (winner === "x") {
     finitoScreen('screen-win-two','Winner!');
  } else {
     finitoScreen('screen-win-tie','Tie!');
  }
};


function finitoScreen(winClass,text){
  $finalScreen.addClass(winClass);
  $('.message').text(text)
  $finalScreen.show();
  $boardScreen.hide();

}

//active player applying styles
function playerActive(player){
   player.addClass('players active');
};
//not active player applying styles
function playerNotActive(player){
  player.removeClass('active');
};

$newGameButn.click(function() {
    location.reload();
});
