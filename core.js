$(document).ready(function () {
  $("#submitButton").click(function() {
    console.log($("#searchQuery").val());
    var addressArray = getAddressArray();
    var apiUrl = assembleApiUrl(addressArray[0], addressArray[1], addressArray[2]);
    dataApiCall(apiUrl);
  })
})

function getAddressArray()
{
  var suite = $("#suite").val();
  var houseNumber = $("#houseNumber").val();
  var street = $("#street").val();
  var addressArray = [suite, houseNumber, street];
  return addressArray;
}

function assembleApiUrl(suite, houseNumber, street) {
  var dataSetUrl = "https://data.edmonton.ca/resource/3pdp-qp95.json";
  var apiUrl;
  if (suite.length > 0)
  {
    apiUrl = dataSetUrl + "?suite=" + suite + "&house_number=" + houseNumber;
  }
  else
  {
    apiUrl = dataSetUrl + "?house_number=" + houseNumber;
  }
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
    alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
  });
}

function displayPropertyValue(data) {
  console.log(data);
}