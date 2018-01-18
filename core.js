$(document).ready(function () {
  $("#submitButton").click(function() {
    var address = getAddress($("#suite"),$("#houseNumber"),$("#street"));
    var apiUrl = assembleApiUrl(address);
    dataApiCall(encodeURI(apiUrl));
  })
})

function getAddress(suiteTextbox, houseNumberTextbox, streetTextbox)
{
  return new Address(suiteTextbox.val(), houseNumberTextbox.val(), streetTextbox.val());
}

function assembleApiUrl(address) {
  var dataSetUrl = "https://data.edmonton.ca/resource/3pdp-qp95.json";
  return dataSetUrl + address.apiUrl();
}

function dataApiCall(apiUrl) {
  console.log(apiUrl);
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
    displayPropertyValue(data);
  });
}

function displayPropertyValue(data) {
  console.log(JSON.stringify(data));
  $("#search-result").text(JSON.stringify(data));
}


function Address(suite, houseNumber, street) {
  this.suite = suite;
  this.houseNumber = houseNumber;
  this.street = street;
  this.hasSuite = function () {
    if (this.suite.length > 0) { return true; }
    else { return false; }
  };
  this.apiUrl = function () {
    if (this.hasSuite()) {
      return "?suite=" + this.suite +
              "&house_number=" + this.houseNumber +
              "&street_name=" + this.street;
    }
    else {
      return "?house_number=" + this.houseNumber + 
              "&street_name=" + this.street;
    }
  }
}