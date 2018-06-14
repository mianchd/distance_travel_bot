import requests

url = 'https://api.dialogflow.com/v1/query?'
client_access_token_dialogflow = 'Put Client Access token from Dialog Flow here'

my_headers = {
	'Authorization' : 'Bearer ' + client_access_token_dialogflow,
}

my_parameters = {
	'v' : '20170712',
    'sessionId' : '6510278',
    'query' : 'How far is Toronto from Ottawa',
    'lang' : 'en'
}

r = requests.get(url, headers=my_headers, params=my_parameters)

#print(r.text)
result = r.json()['result']

if result['metadata']['intentId'] == '15eca6d2-a7da-43c6-9923-592026bebf2e':
    print("Intent Name: " + result['metadata']['intentName'])
    
origin_place, destination_place = result['parameters']['geo-city']

api_key = '--put API Key for Maps distancematrix here --'
url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

my_params = {
	'origins' : origin_place,
	'destinations' : destination_place,
	'key' : api_key
}

r = requests.get(url, params=my_params)
#print(r.text)


response = r.json()

if response['status'] == 'OK':
    print('Got a valid resposne')

distance = response['rows'][0]['elements'][0]['distance']
duration = response['rows'][0]['elements'][0]['duration']

print("The Driving Time from {} to {} is: {}".format(origin_place, destination_place, duration['text']))
