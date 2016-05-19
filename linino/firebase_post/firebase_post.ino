#include <Bridge.h>
#include <Process.h>

int LED_PIN = 13;
int MINUTES = 5;

void setup() {
  delay (3500); 
  Bridge.begin(115200);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
 const unsigned long minutesDelay = MINUTES * 60 * 1000UL;
 static unsigned long lastSampleTime = 0 - minutesDelay;
 unsigned long now = millis();
 
 if (now - lastSampleTime >= minutesDelay)
 {
    lastSampleTime += minutesDelay;
    int sensor = random(0,10);
    digitalWrite(LED_PIN, HIGH);
    postData(sensor);
 }
   
}
void postData(int sensor_value) {
  String path = String("light_sensor");
  String data = String(sensor_value);
  Process process;
  process.begin("python");
  process.addParameter(path);
  process.addParameter(data);
  process.addParameter("/mnt/sda1/arduino/post-to-firebase.py");
  process.run(); 
  while (process.available() > 0) {
   char c = process.read();   
   digitalWrite(LED_PIN, LOW);
  }
  
}
