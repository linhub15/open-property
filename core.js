$(document).ready(function () {
  $("#submitButton").click(function() {
    // Take the text box and store input
    var suite = "";
    var houseNumber ="";
    var apiUrl = assembleApiUrl(suite,houseNumber);
    dataApiCall(apiUrl);
  })
})

function assembleApiUrl(suite, houseNumber) {
  var dataSetUrl = "https://data.edmonton.ca/resource/3pdp-qp95.json";
  var apiUrl = dataSetUrl + "?suite=" + suite + "&house_number=" + houseNumber;
  return apiUrl;
}

function dataApiCall(apiUrl) {
  $.ajax({
    url: apiUrl,
    type: "GET",
    data: {
      "$limit" : 100,
      "$$app_token" : "jePwrVZqpjgGtNlplWa52l07Q"
    }
  }).done(function(data) {
    // alert("Retrieved " + data.length + " records from the dataset!");
    // console.log(data);
    displayPropertyValue();
  });
}

function displayPropertyValue() {

}