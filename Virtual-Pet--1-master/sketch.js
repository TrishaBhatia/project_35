var dog,Happydog,database,foodS,foodStock,dog1,dog2;
var feed, addFood,bg;
var fedTime, lastFed;
var foodObj;
var form;

function preload()
{
	 dog1=loadImage("images/Dog.png");
   dog2=loadImage("images/happydog.png");
   bg = loadImage("images/bg.png");
}

function setup() {
	createCanvas(900,900);
  database=firebase.database();
  dog = createSprite(450, 600, 20, 80);
  dog.addImage(dog1);
  dog.scale = 0.6;
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  foodObj = new food();

  feed = createButton("Feed the Dog");
  feed.position(750, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850, 95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
background(bg);

foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

fill(255, 255, 254);
  textSize(25);
  stroke(10);
  strokeWeight(5);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM", 390, 30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM", 390, 30);
  }else{
    text("Last Fed : "+lastFed, 390, 30);
  }
  drawSprites();

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



function feedDog()
{
  dog.addImage(dog2);
  
  foodObj.updateFoodStock(foodObj.getFoodStock());
  database.ref('/').update({
    Food: foodObj.getFoodStock()-1,
    FeedTime: hour()
  })
  
  

}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

