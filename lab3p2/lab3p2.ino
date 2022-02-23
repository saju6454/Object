// C++ code
//
void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(A0, INPUT);
  Serial.begin(9600);
}

void loop()
{
  
  int pot_in = analogRead(A0);
  int pot_to_tone = map(pot_in, 0, 1023, 9000, 17000);
  Serial.println(pot_to_tone);
  
  tone(9, pot_to_tone);
}
