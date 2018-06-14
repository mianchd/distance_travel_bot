
const client_access_token_dialogflow = 'Put it here'
const maps_api_key = 'put it here'

function clearValue(elem_id){
    document.getElementById(elem_id).value='';
}

function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

function get_distanceMatrix(origin_place, destination_place){
    let maps_base_uri = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

my_params = {
    'origins' : origin_place,
    'destinations' : destination_place,
    'key' : maps_api_key
}

uri_maps = maps_base_uri + encodeQueryData(my_params)
console.log(uri_maps)

let my_maps_request = new Request(uri_maps, {
    method: 'GET',
    mode: 'cors'
});

fetch(my_maps_request).then(function(response){
    if (!response.ok) {
    throw Error(response.statusText);
  }
  // Read the response as json.
    return response.json();
}).then(function(resposneAsJSON){
    console.log(resposneAsJSON);
    let distance = resposneAsJSON['rows'][0]['elements'][0]['distance']['text']
    let duration = resposneAsJSON['rows'][0]['elements'][0]['duration']['text']
    console.log("Got " + duration)
    document.getElementById('output_stuff').value = "That would be " + duration

});

}

function send_dialogFlow(){
    
    var my_parameters_data = {
    'v' : '20170712',
    'lang' : 'en',
    'sessionId' : '1020556',
    'query' : document.getElementById('userInput').value,    
    }
var my_parameters = encodeQueryData(my_parameters_data);
const uri_dialogflow = 'https://api.dialogflow.com/v1/query?' + my_parameters

// Creating Headers object
let my_headers = new Headers()
my_headers.append(
    'Authorization', 'Bearer ' + client_access_token_dialogflow
    );
// Creating Request object with URI and then headers, method included as options.
let my_request = new Request(uri_dialogflow, {
    method: 'GET',
    headers: my_headers,
    mode: 'cors'
});

console.log(my_request.url)

fetch(my_request).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
    if (data['result']['metadata']['intentId'] == '15eca6d2-a7da-43c6-9923-592026bebf2e'){


    let origin_place = data['result']['parameters']['geo-city'][0]
    let destination_place = data['result']['parameters']['geo-city'][1]
    console.log("Origin: "+origin_place+"\nDestination: "+destination_place);
    get_distanceMatrix(origin_place, destination_place);
    }
    else {
        let responded_text = data['result']['fulfillment']['messages'][0]['speech']
        document.getElementById('output_stuff').value = responded_text

    }

});

} // end of the main function

function tempstuff(){
    document.getElementById('output_stuff').innerHTML = document.getElementById('userInput').value;
}


/*
JQuery Fetching
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
$("#btn_send").click(function(){
alert("Value: " + $("#userInput").val());
});
});
</script>
*/


/*
// Text box styling code
function Resizer( element ) {
    var inputBox = element;
    var cssRules = window.getComputedStyle(inputBox);
    var maxFontSize = parseInt(cssRules.getPropertyValue("font-size"));
var minFontSize = 11; // 11 is pretty damn small!
var currentFontSize = maxFontSize;
var maxScrollWidth = parseInt(cssRules.getPropertyValue("width"))
var fontFamily = cssRules.getPropertyValue("font-family");
var currentText = inputBox.value;
// Canvas used to check text widths.
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var initialize = function() {
    inputBox.oninput = onUpdate;
}
var onUpdate = function(event) {
    var width;
// Some text has been deleted!
if (inputBox.value.length < currentText.length) {
    width = checkTextWidth(inputBox.value, currentFontSize + 1);
    while (width < maxScrollWidth && currentFontSize < maxFontSize) {
        currentFontSize += 1;
        inputBox.style.fontSize = currentFontSize + 'px';
        width = checkTextWidth(inputBox.value, currentFontSize + 1);
    }
    currentText = inputBox.value;
    return;
}
var width = checkTextWidth(inputBox.value, currentFontSize);
// Shrink
while (currentFontSize > minFontSize && width > maxScrollWidth) {
    currentFontSize -= 1;
    inputBox.style.fontSize = currentFontSize + 'px';
    width = checkTextWidth(inputBox.value, currentFontSize);
}
currentText = inputBox.value;
}
var checkTextWidth = function(text, size) {
    context.font = size + "px " + fontFamily;
    if (context.fillText) {
        return context.measureText(text).width;
    } else if (context.mozDrawText) {
        return context.mozMeasureText(text);
    }
}
// Initialize the auto adapt functionality.
initialize();
}
Resizer( document.getElementById( 'resizer' ) );
*/
