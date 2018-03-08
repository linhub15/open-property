$(document).ready(function () {

  $("#submitButton").click(function() {
    FindPropertyValue();
  });

  $("body").keyup(function(event) {
    if (event.which == 13) {
      FindPropertyValue();
    }
  });
})


// FUNCTION DECLARATIONS
function FindPropertyValue() {
    ForceUpperCase($("#street"));
    var apiUrl = assembleApiUrl();
    dataApiCall(encodeURI(apiUrl));
}

function ForceUpperCase(inputControl) {
  inputControl.val(inputControl.val().toUpperCase());
} 
function assembleApiUrl() {
  var suite = $("#suite");
  var houseNumber = $("#houseNumber");
  var street = $("#street");
  var address = new Address(suite.val(), houseNumber.val(), street.val().toUpperCase());
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
    },
    success: function(data) {
      //alert("Retrieved " + data.length + " records from the dataset!");
      console.log(data);
      displayPropertyValue(data);
    }
  });
}

function displayPropertyValue(data) {
  console.log(JSON.stringify(data));
  var totalAssessment = data[0].total_asmt;
  //console.log(data[0].total_asmt);
  //$("#search-result").text(JSON.stringify(data));
  $("#search-result").text("Your preoperty is assessed to be: $" + totalAssessment);
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
  };
}

