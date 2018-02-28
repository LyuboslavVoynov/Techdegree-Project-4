
//creating constants
const $name = $('#name');//name
const $email = $('#mail');//email
const $jobRole = $('#title');//job roles
const $otherTitle = $('#other-title');//other job field
const $creditCard = $("#payment option[value='credit card']");//credit card
const $creditCardP = $("#credit-card");//credit card text field
const $payPalP = $('div p:first');//paypal paragraph
const $bitCoinP = $('div p:last');//bitcoin paragraph
const $payInfo = $('#cc-num,#zip,#cvv');//cc num, zip, cvv text fields
const $cCardNum = $('#cc-num');//cc number
const $zipNum = $('#zip'); //zip num
const $cvvNum = $('#cvv');// cvv number
const $activities = $('.activities input');//creating a variable for the activities from the checkboxes.
const $colors = $("#colors-js-puns");// color options
const $payVal = $("#payment");//payment options

//BASIC INFO
// gives focus to the first text field,when the page loads
$(function() {
  $name.focus();
});

//hiding the 'other job role' text field(I created it in the html file, in case of js being disabled the text field will still show up)
$otherTitle.hide()
//Text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.

$('#title').change(function() {
  if($jobRole.val() === 'other'){
    $otherTitle.show()
  }else {
    $otherTitle.hide(); //hiding other title field
  }
});

//T-SHIRT INFO
$colors.hide();//hiding the color options
//displaing the color options that match the design selected in the "Design" menu.
$('#design').change(function(){
  let $themeValue = $(this).val();
  // creating variables to hold the colors
  let $cornflowerblue = $("#color option[value='cornflowerblue']");
  let $darkslategrey = $("#color option[value='darkslategrey']");
  let $gold = $("#color option[value='gold']");
  let $tomato =  $("#color option[value='tomato']");
  let $steelblue = $("#color option[value='steelblue']");
  let $dimgrey = $("#color option[value='dimgrey']");



  if($themeValue === 'Select Theme'){
     //hiding all the colors when 'Select Theme' is selected
      $colors.hide();

    } else if($themeValue === 'js puns'){
      // showing the relevant colors for js puns , when js puns is selected, hiding the rest
        $colors.show();
        colorSelected($cornflowerblue); //cornflowerblue color is selected by default
        $cornflowerblue.show();
        $darkslategrey.show();
        $gold.show();

        $tomato.hide();
        $steelblue.hide();
        $dimgrey.hide();

    } else if ($themeValue === 'heart js') {
      // showing the relevant colors for heart js , when jheart js is selected, hiding the rest
         $colors.show();
         colorSelected($tomato); // tomato color is selected by default
         $cornflowerblue.hide();
         $darkslategrey.hide();
         $gold.hide();

         $tomato.show();
         $steelblue.show();
         $dimgrey.show();

    }

  });
  function colorSelected(color){
    color.prop("selected",true);
  }

//REGISTER FOR ACTIVITIES

//As the user selects activities, a running total displays below the list of checkboxes.
let total = 0;
$activities.change(function(){
  let $checkedBox = ($(this)[0].checked);//creating a variable to hold checked boxes.
  let $chekedBoxName = ($(this)[0].name);//creating a variable to hold checked boxes names.
  if ($checkedBox){
    if($chekedBoxName === "all"){
      total += 200;
    }else{
      total += 100;
    }
  }else if(!$checkedBox){
    if($chekedBoxName === "all"){
      total -= 200;
    }else{
      total -= 100;
    }
  }
  $('#total').remove();//removing any previous 'total cost' paragraphs
  let totalCost = $('<h3>');//creating a new h3 element
  totalCost.attr('id','total').text("Total:"+'$'+ total); //assigning an id and the total cost of selected checkboxes
  $('.activities').append(totalCost); //append the cost below the checkboxes

});

//making sure the user can not select overlapping activities.
$activities.change(function(){
  let $checkedBox = ($(this)[0].checked);//creating a variable to hold checked boxes.
  let $chekedBoxName = ($(this)[0].name);//creating a variable to hold checked boxes names.


//checking for overlapping activities and if there are any, making sure that the boxes for the ones overlapping are disbled.
  if ($chekedBoxName === 'js-libs' && $checkedBox) {
    disableCheckBox($activities[4]);
	} else if ($chekedBoxName === 'js-libs' && !$checkedBox) {
		enableCheckBox($activities[4]);

	} else if ($chekedBoxName=== 'node' && $checkedBox) {
		disableCheckBox($activities[2]);
	} else if ($chekedBoxName === 'node' && !$checkedBox) {
		enableCheckBox($activities[2]);

	} else if ($chekedBoxName === 'js-frameworks' && $checkedBox) {
		disableCheckBox($activities[3]);
	} else if ($chekedBoxName === 'js-frameworks' && !$checkedBox) {
		enableCheckBox($activities[3]);

	} else if ($chekedBoxName=== 'express' && $checkedBox) {
		disableCheckBox($activities[1]);
	} else if ($chekedBoxName === 'express' && !$checkedBox) {
		enableCheckBox($activities[1]);
	}

});

//disable check box function
function disableCheckBox($activities){
  $activities.disabled = true;
};
//enable check box function
function enableCheckBox($activities){
  $activities.disabled = false;
};


//PAYMENT INFO

//selecting credit card payment as default
$creditCard.prop("selected",true);
//hiding bitcoin and PayPal texts
$payPalP.hide();
$bitCoinP.hide();

//displaing the relevant information acording to the payment method option
$payVal.change(function(){
  $selectedMethod = $(this).val();//creating a variable to hold the value of the selected payment method

  if($selectedMethod === 'select_method'){

    $creditCardP.hide();
    $payPalP.hide();
    $bitCoinP.hide();

  } else if($selectedMethod === 'credit card'){

      $creditCardP.show();
      $payPalP.hide();
      $bitCoinP.hide();

  } else if($selectedMethod === 'paypal'){

      $payPalP.show();
      $bitCoinP.hide()
      $creditCardP.hide();

  } else {

      $bitCoinP.show();
      $creditCardP.hide();
      $payPalP.hide();
  }

});


//submit event handler
$('button[type=submit]').click(function(){

    isValid(event);

});


//VALIDATION
//creating a function to check if all information is valid
function isValid(event){
  // form valid by default
   let invalid = false;
   //resetting page styles
   validatePage();
//cheks and prevents the page from submiting if any of the values entered is incorrect
//applys css error style for the incorrect input fields
   if (!isNameEntered($name)) {
       invalidStyle($name);
       invalid = true;
  }
  if (!isMailValid($email)) {
      invalidStyle($email);
      invalid = true;
  }
  if (!activitySelected()){
      invalidStyle($activities);
      invalid = true;
  }
  if ($payVal.val() === "select_method"){
      invalid = true;
  }
  if (($payVal.val() === "credit card") && !isCcNumValid()){
      invalidStyle($cCardNum);
      invalid = true;
  }
  if (($payVal.val() === "credit card") && !isZipValid()){;
      invalidStyle($zipNum);
      invalid = true;
  }
  if (($payVal.val() === "credit card") && !isCvvValid()){
      invalidStyle($cvvNum);
      invalid = true;
  }
  if ($jobRole.val()=== 'other' && $otherTitle.val() === ''){
     invalidStyle($otherTitle);
     invalid = true;
  }
  if (invalid){
      event.preventDefault();
      $(window).scrollTop($('.container'));
  }
};
// resetting page styles
function validatePage(){
  return $email.removeAttr('class');
         $name.removeAttr('class');
         $activities.removeAttr('class');
         $payInfo.removeAttr('class');
         $otherTitle.removeAttr('class');
}
//input invalid  css styles
function invalidStyle(arg){
  return arg.attr('class','inputError')
}
//input valid css styles
function validStyle(arg){
  return arg.attr('class', '');
}

//REAL TIME VALIDATION
// creates real time validation (applys red box around the incorrect input fields)
function invalidInput(){
  let invalid = false;
  $name.bind( "input", function() {

     if (!isNameEntered($name)) {
       invalidStyle($name);
       invalid = true;
     }else{
       validStyle($name);
       ivalid = false;
     }
   });
   $email.bind( "input", function() {

      if (!isMailValid($email)) {
       invalidStyle($email);
        invalid = true;
      }else{
        validStyle($email);
        invalid = false;
      }
    });

  $otherTitle.bind('input', function(){
      validStyle($otherTitle);
      invalid = false;
    })
  //makes all checkboxes red if none selected
  $activities.bind( "click", function() {

     if (!activitySelected($activities)) {
       invalidStyle($activities);
       invalid = true;
     }else{
       validStyle($activities);
       ivalid = false;
     }
   });
  $cCardNum.bind( "input", function() {

     if (!isCcNumValid($cCardNum)) {
       invalidStyle($cCardNum);
       invalid = true;
     }else{
       validStyle($cCardNum);
       ivalid = false;
     }
   });
  $zipNum.bind( "input", function() {

     if (!isZipValid($zipNum)) {
       invalidStyle($zipNum);
       invalid = true;
     }else{
       validStyle($zipNum);
       ivalid = false;
     }
   });
  $cvvNum.bind( "input", function() {

     if (!isCvvValid($cvvNum)) {
       invalidStyle($cvvNum);
       invalid = true;
     }else{
       validStyle($cvvNum);
       ivalid = false;
     }
   });
   if (invalid){
       event.preventDefault();
       $(window).scrollTop($('.container'));
  }
}
//calling real time validation function
invalidInput();
//FORM VALIDATION CHECK FUNCTIONS

//checks if name field is not empty
function isNameEntered($name) {
	return ($name.val() !== "") ? true : false;
}

//checks if the email is in the corect format
function isMailValid($email){
  let validMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validMail.test($email.val());//returns true if valid ,false otherwise
};

//checks if any activity has been selected
function activitySelected() {
	let activitiesNum = 0;
  for (let i=0;i<$activities.length;i++){
    if ($activities[i].checked){
      activitiesNum+=1;
    }
  }
	return (activitiesNum>0) ? true:false;//returns true if valid ,false otherwise
};
let validNum =/^[0-9]+$/;//creating a variable to hold valid numbers using regex
function isCcNumValid(){
  //chesks if credit card number is valid
  return ($cCardNum.val().match(validNum) && 13 <= $cCardNum.val().length && $cCardNum.val().length <= 16) ? true:false;

};

function isZipValid(){
  return ($zipNum.val().match(validNum) && $zipNum.val().length === 5) ? true:false;//checks if zip code is valid
}

function isCvvValid(){
  return ($cvvNum.val().match(validNum) && $cvvNum.val().length === 3) ? true:false;//chesks if cvvnumber is valid
}
