/**
Lets bounce, how would we code this to move the square in a random trajectory and "bound" off the edges
**/

var serial; //variable to hold an instance of the serial port library
var portName = '/dev/tty.usbmodem112401'; //fill in with YOUR port


var x_input = 0;
var y_input = 0; 
var grow_input= 0;

var x = 0;
var y = 0;
var window_width = 1050;
var window_height = 1050;
var control_size=0;
var control_size2=20;
var difference=0
var speed = 4; //use this to control how fast or slow it moves

var trajectory = 0; //this will range between 0, 2PI


function setup() {
  createCanvas(1023, 1023);
  
  //set an initial first trajectory
  trajectory = random(0, TWO_PI);
  
  
  serial = new p5.SerialPort(); //a new instance of serial port library

  //set up events for serial communication
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  //open our serial port
  serial.open(portName);
  
}

// function randomSize(){
//   var i=0;
//   while(i==0){
    
//   }
//    return control_size;
// }

function draw() {
  
control_size=round(random(0,10));
  
background('red');
  
difference= abs(x_input-x)+abs(y_input-y)+abs(grow_input-control_size2);
  
     if(difference<=300)
    {
  background('green')
    }
  
   if(control_size>5)
    {
     control_size2++;
     }
  else if (control_size<2)
    {
    control_size2--;
    }
  console.log(control_size);
    console.log(control_size2);
  
  
fill('white');
rect(x, y, control_size2, control_size2);
  
     if(x <= 0 || x > window_width-control_size2 || y <= 0 || y > window_height-control_size2)
    {
      trajectory = random(0, TWO_PI); 
    } 
 
x += speed * cos(trajectory);
y += speed * sin(trajectory);
  
    //option 1 - move a rectangle with a joystick
  // background('dodgerblue');
  
fill('black');
rect(x_input, y_input, grow_input, grow_input);

}

function serverConnected(){
	console.log('connected to the server');
}

function portOpen(){
  console.log('the serial port opened!');
}

//THIS IS WHERE WE RECEIVE DATA!!!!!!
//make sure you're reading data based on how you're sending from arduino
function serialEvent(){
	//receive serial data here
  
  var data = serial.readLine();
  if(data === "") return;
  
  //https://www.geeksforgeeks.org/split-string-java-examples/
  var split = data.split(',');
  console.log(split[0], split[1], split[2]);
  
  x_input = split[0];
  y_input = split[1];
  grow_input=split[2];
  // square_dim = (x_input + y_input);
  
  
}

function serialError(err){
  console.log('something went wrong with the port. ' + err);
}

function portClose(){
  console.log('the port was closed');
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}