#!/usr/bin/python
import sys
from firebase import firebase

firebase = firebase.FirebaseApplication('https://replace-this-with-your-app-path.firebaseio.com/', None)

node_path = sys.argv[1]
sensor_data = sys.argv[2]
firebase_node = '/linino/sensor/' + node_path

response = firebase.post(firebase_node, sensor_data)

print  response