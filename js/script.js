//Still working on it, trying to figure out the minimax algorithm, the game works for 2 players though
// I will add comments later on

const $startScreen = $('#start');
const $boardScreen = $('#board');
const $finalScreen = $('#finish');
const $playerOne = $('#player1');
const $playerTwo = $('#player2');
const $box = $('.box');
const $play2Buttn = $("a.button:contains('Play vs. Player 2')");
const $playCBttn = $("a.button:contains('Play vs. CPU')");
const $play2Screen = $("#enter_name_p2");
const $playCScreen = $("#enter_name_p1");
const $play1NameInput = $("p:first-child");
const $play2NameInput = $("p:last-child");
const $play21Name = $("#name_input_p21");
const $play2Name = $("#name_input_p2");
const $play1Name = $("#name_input_p1");
const $playTwoPlayerBttn = $("a.button:contains('Start')");
const $playOnePlayerBttn = $("a.button:contains('Play CPU')");
const $newGameBttn = $("a.button:contains('New game')");

!function (){
    $play2Buttn.click(function(){
       $startScreen.hide();
       $play2Screen.show();
     $playTwoPlayerBttn.click(function(){
       $play2Screen.hide();
       $boardScreen.show();

       $play1NameInput.text($play21Name.val());
       $play2NameInput.text($play2Name.val());
      let random = Math.round(Math.random());
      if (random === 0){
        return playerActive($playerOne,$play1NameInput);
      }else {
        return playerActive($playerTwo,$play2NameInput);
      }

    });
    start2Player();
  });

   $playCBttn.click(function(){
     $startScreen.hide();
     $playCScreen.show();
   $playOnePlayerBttn.click(function(){
     $playCScreen.hide();
     $boardScreen.show();

     $play1NameInput.text($play1Name.val());
     $play2NameInput.text("CPU");
     playerActive($playerOne,$play1NameInput);
   });
   start1Player();
 });
}();


//2 PLAYER GAME//

  function  start2Player(){
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
      $play1NameInput.removeClass('active');
      $play2NameInput.addClass('active');
    } else {
      $playerTwo.removeClass("active");
      $playerOne.addClass("active");
      $play2NameInput.removeClass('active');
      $play1NameInput.addClass('active');
    }
  };


  function checkIfWon() {
    // Create empty arrary of moves
    let winGame = [];
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


    function checkForWin(a,b,c){
      return (winGame[a] !== "none" && winGame[a] === winGame[b] && winGame[b] === winGame[c]);
    }
    // Check the array to find winning combinations. If pieces match one in 8 possible combinations, set the winner to matching name
      if (checkForWin(0,1,2)) {
        winner = winGame[0];
        finalScreen();
      } else if (checkForWin(3,4,5)) {
        winner = winGame[3];
        finalScreen();
      } else if (checkForWin(6,7,8)) {
        winner = winGame[6];
        finalScreen();
      } else if (checkForWin(0,3,6)) {
        winner = winGame[0];
        finalScreen();
      } else if (checkForWin(1,4,7)) {
        winner = winGame[1];
        finalScreen();
      } else if (checkForWin(2,5,8)) {
        winner = winGame[2];
        finalScreen();
      } else if (checkForWin(0,4,8)) {
        winner = winGame[0];
        finalScreen();
      } else if (checkForWin(2,4,6)) {
        winner = winGame[2];
        finalScreen();
      } else if (!winGame.includes("none")){
        winner = "Tie";
        finalScreen();
      }

  };
   function finalScreen () {
    if (winner === "o") {
       finitoScreen('screen-win-one',$("#name_input_p21").val()+' Wins!');
    } else if (winner === "x") {
       finitoScreen('screen-win-two',$("#name_input_p2").val()+' Wins!');
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
  function playerActive(player,name){
     player.addClass('players active');
     name.addClass('active');
  };
  //not active player applying styles
  function playerNotActive(player){
    player.removeClass('active');
  };
//1 PLAYER GAME(VS CPU)
function  start1Player(){
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
        $(this).addClass('selected');
        $(this).css('background-image', 'url("img/o.svg")');
        $(this).off();
        checkIfWon();
        switchPlayerTurn();
        CPUplay();
    }
  });
};
 function CPUplay() {
    let moves = [];
    $box.each(function(index){
      if($(this).hasClass('selected')){
      } else {
        moves.push($(this));
    }
  });
  if (moves.length === 0){
  }else{
    let random = Math.floor(Math.random() * moves.length);
    moves[random].addClass('box-filled-2');
    moves[random].addClass('selected');
    moves[random].css('background-image', 'url("img/x.svg")');
    moves[random].off();
    checkIfWon();
    switchPlayerTurn();

  }
}





//RELOAD
  $newGameBttn.click(function() {
      location.reload();
  });
