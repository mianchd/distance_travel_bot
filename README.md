
## Chatbot

**Basic Chatbot for learning Purposes**

### Description
1. Chatbot frontend written in HTML, CSS and Vanilla JavaScript
2. Program utilises Dialog_Flow API for Natural Language Understanding (NLU).
3. DialogFlow (formerly API.AI) helps to extract intents and entities from user's query.
4. DialogFlow uses Machine Learning to train on phrases - so even if user makes spelling mistakes or states something in a differnt way, it is still matched correctly to intents, actions and parameters are extracted.
5. Having received requred data, API call is made to Google maps to extract 'travel time' information and given to user.

Here are some Demos

* Demo 1 - How are you doing? (Small Talk)
![alt text](https://github.com/mianchd/distance_travel_bot/blob/master/images/demo1.JPG "First Demo")


* Demo 2 - How far is Ottawa from Toronto
![alt text](https://github.com/mianchd/distance_travel_bot/blob/master/images/demo2.jpg "Second Demo")


* Demo 3 - What is the distance to Montreal to Quebec City
![alt text](https://github.com/mianchd/distance_travel_bot/blob/master/images/demo3.jpg "Third Demo")


To run you must put the following in the JavaScript File
1. Dialog Flow Client Access Token
2. Google Maps DistanceMatrix API Key