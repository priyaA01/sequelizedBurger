
function renderBurger(data) {
  
  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {
      if (data[i].devoured) {                
        $("#well-section-done").append("<br><input type='text' value='" + data[i].burger_name + "' disabled>");

      } else {
        $("#well-section").append("<input type='text' value='" + data[i].burger_name + "' disabled> <button class='update' data-id='" + data[i].id + "'>EAT UP</button></p>");

      }
    }

  }
}

// When user clicks add-btn
$("#add-btn").on("click", function (event) {
  event.preventDefault();
  var burgerName = $("#burger_name").val().trim();
  // Make a newBurger object
  if (burgerName != "") {
    var newBurger = {
      burger_name: burgerName
    };

    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newBurger)
      // On success, run the following code
      .then(function (data) {
        // Log the data we found
        renderBurger(data);
        location.reload();


      });
  // Empty each input box by replacing the value with an empty string
    $("#burger_name").val("");
  }


});

$("#well-section").on("click", ".update", function () {
  event.preventDefault();
  var id = $(this).attr("data-id");

  $.get("/api/update/" + id)
    // On success, run the following code
    .then(function (updateData) {
      // Log the data we found

      location.reload();

    });

});

// When user clicks delete-btn
$(".create-form").on("click", "#delete-btn", function (event) {
 event.preventDefault();

  // Send an AJAX POST-request with jQuery
  $.post("/api/delete")
    // On success, run the following code
    .then(function (data) {
      // Log the data we found
      location.reload();
    });


});

// Send an AJAX POST-request with jQuery
// Make a get request to our api route that will return every burger
$.get("/api", function (data) {
  renderBurger(data);
});