
// Declaration of initial variables
var currentDay = $("#currentDay");
var scheduleArea = $(".schedule");
var timeRow = $(".time-row");
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
var toDoItems = [];

//allows text to be saved in local storage so can still see the content when page is refreshed
function saveIt(){
  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val(); 
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
     
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

//format the rows colors depending on time 
//(what time is it - party time - thats right say it loud (spotto high school musical))
function setUpRows(){
  timeRow.each(function(){
  var thisRow = $(this);
  var thisRowHr = parseInt(thisRow.attr("data-hour"));

  // style rows to show where we are in the day, what hour it is, what we've done, how much time is slipping through our fingers #ABBA
  if (thisRowHr == currentHour) {
    thisRow.addClass("present").removeClass("past future");
  }
  if (thisRowHr < currentHour) {
    thisRow.addClass("past").removeClass("present future");
  }
  if (thisRowHr > currentHour) {
    thisRow.addClass("future").removeClass("past present");
  }
});
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);
    
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }
}

//here we are calling all of our functions so they can do their thing and have a good time
$(document).ready(function(){
  setUpRows();

//display current date
currentDay.text(currentDate);

//render schedule from local storage
renderSchedule();
//when a todo item save button is clicked, it gets saved, shocking
scheduleArea.on("click", "button", saveIt);

});