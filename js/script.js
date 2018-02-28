//still working on it

const $startScreen = $('#start');
const $boardScreen = $('#board');
const $winScreen = $('#finish');
const $playerOne = $('#player1');
const $playerTwo = $('#player2');
const $box = $('.box');





//Displaying the start screen and the board screen when the button is clicked
function startScreen(){
  $boardScreen.hide();
  $winScreen.hide();
  $('.button').click(function(){
     $startScreen.hide();
     $boardScreen.show();

  });
};
//calling the Start Screen function
startScreen();

function currentPlayer(){
  let random = Math.round(Math.random());
  if (random === 0){
     $playerOne.attr('class','players active');
  } else{
     $playerTwo.attr('class','players active');
  }
};
//auto generating which player is first
currentPlayer();


function mouseMove(){
  $box.mouseover(function() {
     if ($playerOne.attr('class') === 'players active'){
        $(this).css('background-image', 'url("img/o.svg")');
     } else {
        $(this).css('background-image', 'url("img/x.svg")');
     }
  });

  $box.mouseleave(function() {
      $box.css('background-image', '');
  });
};
//When the current player mouses over an empty square on the board, it's symbol the X or O appears on the square
mouseMove();


function mouseClick(){
  $box.click(function(){
    if ($playerOne.attr('class') === 'players active'){
       $(this).addClass('box-filled-1 clicked');
    } else {
       $(this).addClass('box-filled-2 clicked');
    }
  });
}
//When the player clicks on an empty square, apropriate css styles are applyed
mouseClick();
