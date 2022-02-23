// C++ code
//
void setup()
{
  
  pinMode(6, OUTPUT);
  pinMode(A0, INPUT);
  Serial.begin(9600);
  
}

void loop()
{
  
  
  //sensor will have a value of 0-1023
  int sensor = analogRead(A0);
 
  Serial.println(sensor);
  
  int sensoradj = map(sensor, 0, 1023, 0, 255);
  
  //analog write wants a value of 0-255
  analogWrite(6, sensoradj); 


}
