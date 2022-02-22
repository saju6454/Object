void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(A0, INPUT);
  pinMode(6, OUTPUT);
  pinMode(A1, INPUT);
  Serial.begin(9600);
}


void loop()
{
  
  int pot_in = analogRead(A1);
  int pot_to_tone = map(pot_in, 0, 1023, 9000, 17000);
  Serial.println(pot_to_tone);
    tone(9, pot_to_tone);

      int sensor = analogRead(A0);

  
  int sensoradj = map(sensor, 0, 1023, 0, 255);
  
  //analog write wants a value of 0-255
  analogWrite(6, sensoradj); 
}
