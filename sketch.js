var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFedTime;
//create feed and lastFed variable here
 var feed, lastFed;
 var time=12;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog = createButton("feed the food ");
  feedTheDog.position(950,95);
  feedTheDog.mousePressed(feedDog);




}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
 
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val*0);

  }else{

    foodObj.updateFoodStock(food_stock_val -1);
  }
 
  //write code to display text lastFed time here

  if(lastFedTime<=12){
text("last fed time is" + lastFedTime+"am",350,30);

  }
  else if(lastFedTime===0){
text("last fed time is:12a.m",350,30);

  }else{

text("last fed time is"+ lastFedTime-time+"p.m.",350,30);

  }
  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  



}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


async function getCurentTime(){
    
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  lastFedTime = datetime.slice(11,13);
  
  //if(hour>=0600 && hour<=1900){
     // bg = "sprites/bg1.png";
//  }
  //else{
    //  bg = "sprites/bg2.jpg";
  //}

 // backgroundImg = loadImage(bg);
  //console.log(backgroundImg);
}