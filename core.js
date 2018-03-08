var API_DATA = {
      "$limit" : 100,
      "$$app_token" : "jePwrVZqpjgGtNlplWa52l07Q"
    };
var DATA_SET_URL = "https://data.edmonton.ca/resource/3pdp-qp95.json";
$(document).ready(function () {

  $("#submitButton").click(function() {
    findPropertyValue();
  })

  $("body").keyup(function(event) {
    if (event.which == 13) {
      findPropertyValue();
    }
  })

  $("#addressBtn").click(function() {
    getStreetByAddress($("#houseNumber"));
  })
})


// FUNCTION DECLARATIONS
function findPropertyValue() {
  var suite = $("#suite");
  var houseNumber = $("#houseNumber");
  var street = $("#street");
  forceUpperCase(street);
  var apiUrl = assembleApiUrl(suite, houseNumber, street);
  apiGetPropertyValue(encodeURI(apiUrl));
}

function forceUpperCase(street) {
  street.val(street.val().toUpperCase());
}

function assembleApiUrl(suite, houseNumber, street) {
  var address = new FullAddress(suite.val(), houseNumber.val(), street.val().toUpperCase());
  return DATA_SET_URL + address.apiUrl();
}

function apiGetPropertyValue(apiUrl) {
  console.log(apiUrl);
  $.ajax({
    url: apiUrl,
    type: "GET",
    data: API_DATA,
    success: function(data) {
      console.log(data);
      displayPropertyValue(data);
    }
  });
}

function displayPropertyValue(data) {
  var totalAssessment = data[0].total_asmt;
  $("#propertyValue").text("$" + totalAssessment);
}

function displayFailMessage() {

}

function FullAddress(suite, houseNumber, street) {
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
  };
}


function getStreetByAddress(houseNumber) {
  var url = buildApiUrl(houseNumber);
  apiGetStreetList(url);
}
function buildApiUrl(houseNumber) {
  var url = DATA_SET_URL + "?house_number=" + houseNumber.val();
  return url;
}
function apiGetStreetList(apiUrl) {
  console.log(apiUrl);
  $.ajax({
    url: apiUrl,
    type: "GET",
    data: API_DATA,
    success: function(data) {
      console.log(data);
    }
  });
}