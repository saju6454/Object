
/************************
Exercise the motor using
the L293D chip
************************/

#define ENABLE 5
#define DIRA 3
#define DIRB 4
#define joystick A0

const int X_pin = A0; // analog pin connected to X output

int i;
int motor_control;


void setup() {
  //---set pin direction
  pinMode(ENABLE,OUTPUT);
  pinMode(DIRA,OUTPUT);
  pinMode(DIRB,OUTPUT);
//  pinMode(SW_pin, INPUT);
//  digitalWrite(SW_pin, HIGH);
  Serial.begin(9600);
}

void loop() {
Serial.println("One way, then reverse");
digitalWrite(ENABLE,HIGH); // enable on

motor_control = analogRead(joystick);
motor_control>>=1;

if(motor_control>255){
  analogWrite(ENABLE,motor_control);
    digitalWrite(DIRA,0);
    digitalWrite(DIRB,(motor_control - 256));
}

else
if(motor_control<255){
  analogWrite(ENABLE,joystick);
  digitalWrite(DIRA,0);
  digitalWrite(DIRB,(255-motor_control));
}
else{
 analogWrite(ENABLE,motor_control);
  digitalWrite(DIRA,0); //one way
  digitalWrite(DIRB,0);
}
}
