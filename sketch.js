//Global variables for images
var bg, sunR, sunL, s_pan, fan_anim,fan_img,display, g_house_img;

//Global variables for Sprites
var g_house, pan1,pan2,fan,fan2;

//Creating a ray group
var rayGroup;

//Creating temprature and voltage variables
var temp = 10
var panel1_voltage =0;
var panel2_voltage = 0;
var power_gen = 0;

var absorbed1= 0;
var absorbed2= 0;



function preload()
{
  sunR = loadImage("sunrays.png");
  sunL = loadImage("sunrays1.png");
  bg = loadImage("bgimage.png")
  s_pan = loadImage("s_panel.png");
  fan_anim = loadAnimation("fan01.png","fan02.png","fan03.png","fan04.png","fan05.png");
  fan_img = loadImage("fan01.png");
  display = loadImage("disp.png");

  g_house_img = loadImage("greenhouse.png")
}

function setup() 
{
  createCanvas(800, 500);
  
  raysGroup = createGroup();
  panelGroup = createGroup();

  g_house = createSprite(380,300,100,100);
  g_house.addImage(g_house_img);
  g_house.scale = 1;
  //g_house.debug = true;
  g_house.setCollider("circle",-10,0,185)

  pan1 = createSprite(80,height-50,80,80);
  pan1.addImage(s_pan);
  pan1.scale = 0.75;

  pan2 = createSprite(width-130,height-50,80,80);
  pan2.addImage(s_pan);
  pan2.scale = 0.75;


  fan = createSprite(280,300,20,20);
  fan.addImage(fan_img);
  fan.scale = 0.3;
  fan.addAnimation('run',fan_anim);

  fan2 = createSprite(450,300,20,20);
  fan2.addImage(fan_img);
  fan2.scale = 0.3;
  fan2.addAnimation('run',fan_anim);
  textSize(15);
  
}

function draw() 
{
  background(220);
  image(bg,0,0,width,height);
  image(display,600,10,200,60)
  power_gen = panel1_voltage + panel2_voltage;

  push();
  noStroke();
  fill(255,255,0)
  text("Voltage : ",620,37)
  text(power_gen,680,37)

  text("Temprature : ",620,56)
  text(temp,710,56);
  pop();
  //TA
  makeRay();

  //calculate wattege
  
    panel1_voltage = round(absorbed1* 0.15);
  
    panel2_voltage = round(absorbed2* 0.15);
  

  if(power_gen>=8 && temp>=30)
  {
    fan.changeAnimation('run');
    temp-=1;
    panel2_voltage-=1
  }

  if(power_gen>=4 && temp>=30 )
  {
    fan2.changeAnimation('run');
    temp-= 0.5;
    panel1_voltage-=1
  }

  drawSprites();
    
}

function makeRay()
{
  
  if (frameCount % 60 === 0) 
   {
    var x = Math.round(random(10,350));
    rayL = createSprite(x,50,10,10);
    var xr = Math.round(random(350,750));
    rayR = createSprite(xr,50,10,10);
    rayL.addImage(sunL);
    rayR.addImage(sunR);
    rayL.scale = 0.08;
    rayR.scale = 0.08;
    vx = random(-1,1);
    raysGroup.add(rayL);
    raysGroup.add(rayR);
    raysGroup.setVelocityYEach(2)
    raysGroup.setVelocityXEach(vx)
    raysGroup.setLifetimeEach(134)
   }
  raysGroup.overlap(pan1,charge1);
  raysGroup.overlap(pan2,charge2);
  raysGroup.overlap(g_house,temp_rise)
}

function charge1(sprA)
{
   sprA.remove()
   absorbed1+=1;
}
function charge2(sprA)
{
   sprA.remove()
   absorbed2+=1;
}
function temp_rise(sprb)
{
  sprb.remove();
  temp+=1;
}

