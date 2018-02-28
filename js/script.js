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
    return playerActive($playerOne);
  }else {
    return playerActive($playerTwo);
  }
}
//random selection of starting player
currentPlayer();

//When the current player mouses over an empty square on the board, it's symbol the X or O appears on the square
$box.mouseover(function() {
  if($playerOne.attr('class') === 'players active'){
    $(this).css('background-image', 'url("img/o.svg")');
  }else{
    $(this).css('background-image', 'url("img/x.svg")');
  }
 });
//When current player mouses out of the box, the symbol disappears
$box.mouseleave(function() {
    $box.css('background-image', '');
});

//active player applying styles
function playerActive(player){
   player.attr('class','players active');
};
//not active player applying styles
function playerNotActive(player){
  player.removeClass('active');
}

//
$box.click(function(){
  if ($playerOne.attr('class') === 'players active'){
     $(this).addClass('box-filled-1 clicked');
     playerActive($playerTwo);
     playerNotActive($playerOne)
     $(this).unbind("click");

  } else {
     $(this).addClass('box-filled-2 clicked');
      playerActive($playerOne);
      playerNotActive($playerTwo);
      $(this).unbind("click");

  }
});
