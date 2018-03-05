// The code in add.js handles what happens when the user clicks the "Add a book" button.

// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();
  var burgerName=$("#burger_name").val().trim();
  // Make a newBook object
  if(burgerName != "")
  {
    var newBurger = {
    burger_name: burgerName
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newBurger)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
      renderBurger(data);

    });

   $("#burger_name").val("");
    location.reload(); 
  }
   
     
});

function renderBurger(data) {
  // Empty each input box by replacing the value with an empty string
  
  if (data.length !== 0) {

    //console.log("inside render");
    for (var i = 0; i < data.length; i++) {
      if(data[i].devoured === false)
      {
        var div = $("<div>");
        div.addClass("well");
        div.attr("id", "burger-well-" + i);
        $("#well-section").append(div);

      // Now  we add our book data to the well we just placed on the page
        $("#burger-well-" + i).append("<p>" + data[i].id +"  " + data[i].burger_name + "<button class='update' data-id='" + data[i].id + "'>EAT UP</button></p>");
        }
        else
        {
            var div = $("<div>");
            div.addClass("well");
            div.attr("id", "burger-well-" + i);
            $("#well-section-done").append(div);

          // Now  we add our book data to the well we just placed on the page
            $("#burger-well-" + i).append("<p>" + data[i].id +"  " + data[i].burger_name + "</p>");
            
        }
      }    

  }
}
  $("#well-section").on("click",".update",function() {
  event.preventDefault();
      var id = $(this).attr("data-id");
      
      console.log(id);
      $.get("/api/update/"+id)
        // On success, run the following code
        .then(function(updateData) {
          // Log the data we found

          console.log("updated");
        });

      location.reload();
    });

// When user clicks add-btn
$("#delete-btn").on("click", function(event) {
  event.preventDefault();

  // Send an AJAX POST-request with jQuery
  $.post("/api/delete")
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log("deleted");
    });

  location.reload(); 
});

// Send an AJAX POST-request with jQuery
// Make a get request to our api route that will return every book
$.get("/api", function(data) {

  renderBurger(data);
});