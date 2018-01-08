$(document).ready(function () {
  $("#submitButton").click(function() {
    // Take the text box and store input
    var addressArray = $("#searchQuery").value.split(" ");
    var suite = getSuite(addressArray);
    var houseNumber = getHouseNumber(addressArray);
    var apiUrl = assembleApiUrl(suite,houseNumber);
    dataApiCall(apiUrl);
  })
})

function getSuite(addressArray){
  if (suiteExists(addressArray))
  {
    return addressArray[0];
  }
}

function getHouseNumber(addressArray){
  if (suiteExists(addressArray))
  {
    return addressArray[1];
  }
  else 
  {
    return addressArray[0];
  }
}

function suiteExists(addressArray){
  var tmpSuite = parseInt(addressArray[0]);
  var tmpHouse = parseInt(addressArray[1]);
  var returnValue;
  if (typeof(tmpSuite) == "number" && typeof(tmpHouse) == "number") {}
    returnValue = true;
  }
  else {
    returnValue = false;
  }
  return returnValue;
}


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