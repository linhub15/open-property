$(document).ready(function () {
  $("#submitButton").click(function() {
    console.log($("#searchQuery").val());
    var addressArray = $("#searchQuery").val().split(" ");
    var apiUrl = assembleApiUrl(addressArray);
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
  if (typeof(tmpSuite) == "number" && typeof(tmpHouse) == "number") {
    returnValue = true;
  }
  else {
    returnValue = false;
  }
  return returnValue;
}

function assembleApiUrl(addressArray) {
  var suite = getSuite(addressArray);
  console.log("suite: " + suite + "\n");
  var houseNumber = getHouseNumber(addressArray);
  console.log("house_number: " + houseNumber + "\n");
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