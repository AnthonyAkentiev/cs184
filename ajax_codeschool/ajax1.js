$(document).ready(function() {
     $("#tour").on("click", "button", function() {
          $.ajax("/photos.html",{ success:function(response){

          }});
     });
});

/// step 2
$(document).ready(function() { 
     $("#tour").on("click", "button", function() { 
          $.ajax('/photos.html',{ success:function(response){
               $(".photos").html(response);
               $(".photos").fadeIn();
          }});
     });
});


/// step 3
$(document).ready(function() {
     $("#tour").on("click", "button", function() {
          $.get('/photos.html', function(response) {
              $('.photos').html(response).fadeIn();
          });
     });
});


/// step 4 (data
$(document).ready(function() {
     var el = $("#tour")

     el.on("click", "button", function() {
          $.ajax('/photos.html', {
               data: {location: el.data('location')},
               success: function(response) {
                    $('.photos').html(response).fadeIn();
               }
          });
     });
});

/// Error handling
$(document).ready(function() {
     var el = $("#tour");
     el.on("click", "button", function() {
          $.ajax('/photos.html', {
               data: {location: el.data('location')},
               success: function(response) {
                    $('.photos').html(response).fadeIn();
               },
               error:function(request,error,errorMessage){
                    $('.photos').html("<li>shit!</li>");
               },
               timeout:3000
          });
     });
});


/// step 6: Compelete
$(document).ready(function() {
     $("#tour").on("click", "button", function() {
          $.ajax('/photos.html', {
               success: function(response) {
                    $('.photos').html(response).fadeIn();
               },
               error: function() {
                    $('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
               },
               timeout: 3000,
               beforeSend:function(){
                    $('.confirmation').addClass('is-fetching');
               },
               complete:function(){
                    $('.confirmation').removeClass('is-fetching');
               }
          });
     });
});


/// step7:
$(document).ready(function() {
     function showPhotos() {
          $(this).find('span').slideToggle();
     }
     
     $('.photos').on('mouseenter', 'li', showPhotos)
          .on('mouseleave', 'li', showPhotos);

     var el = $("#tour");
     el.on("click", "button", function() {
          $.ajax('/photos.html', {
               data: {location: el.data('location')},
               success: function(response) {
                    $('.photos').html(response).fadeIn();
               },
               error: function() {
                    $('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
               },
               timeout: 3000,
               beforeSend: function() {
                    $('#tour').addClass('is-fetching');
               },
               complete: function() {
                    $('#tour').removeClass('is-fetching');
               }
          });
     });
});

/// Step8:
var tour = {
     init:function(){
          $("#tour").on("click", "button", function() { 
               $.ajax('/photos.html', {
                    data: {location: $("#tour").data('location')},
                    success: function(response) {
                         $('.photos').html(response).fadeIn();
                    },
                    error: function() {
                         $('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
                    },
                    timeout: 3000,
                    beforeSend: function() {
                         $('#tour').addClass('is-fetching');
                    },
                    complete: function() {
                         $('#tour').removeClass('is-fetching');
                    }
               });
          });
     }
};

$(document).ready(function() {
     tour.init();
});

/// Step9: Functions:
function Tour(price) {
     this.price = price;

     console.log("A new Tour was created");
   
     this.cost = function(nights){
          console.log(nights * this.price);  
     }
}

$(document).ready(function() { 
     var tour = new Tour(100);
     tour.cost(4);
});

/// Step10:
// reference.js:
var tour = {
     init: function() {
           $('#tour').on('click', 'button', this.fetchPhotos);
      },
     fetchPhotos: function() { 
             $.ajax('/photos.html', {
               success: function(response) {
                    $('.photos').html(response);
               },

               error: function() {
                    alert('There was a problem fetching the latest photos. Please try again.')
               },

               timeout: 3000,

               beforeSend: function() {
                    $('#tour').addClass('is-fetching');
               },

               complete: function() {
                    $('#tour').removeClass('is-fetching');
               }
          });
     }
}

$(document).ready(function() { 
     tour.init();
});

// main.js: 
function Tour(el) {
     console.log(el);
}
$(document).ready(function() { 
     var paris = new Tour($('#paris'));
});

//////// Step11
function Tour(el) {
     this.el = el;

     this.fetchPhotos = function(){
     }

     var tour = this;

     el.on('click','button',function(){
          tour.fetchPhotos();
     });
}

$(document).ready(function() { 
     var paris = new Tour($('#paris'));
});

/// Step12: Forms
$(document).ready(function() {
     $('form').on('submit',function(event){
          event.preventDefault();
     });
});


/// Step13
<div class="tour" data-daily-price="357">
<h2>Paris, France Tour</h2>
<p>$<span id="total">2,499</span> for <span id="nights-count">7</span> Nights</p>
<form action="/book" method="POST">
<p>
<label for="nights">Number of Nights</label>
</p>
<p>
<input type="number" name="nights" id="nights" value="7">
</p>
<input type="submit" value="book">
</form>
</div>

$(document).ready(function() {
     $('form').on('submit', function(event) {
          event.preventDefault();
     
          $.ajax('/book',{
               type:'POST',
               data:$('form').serialize(),
               success:function(res){
                    $('.tour').html(res);
               }
          });
     });
});

/// Step14 - JSON
$(document).ready(function() {
     $('form').on('submit', function(event) {
          event.preventDefault();

          $.ajax('/book', {
               type: 'POST',
               dataType:'json',
               data: $('form').serialize(),
               success: function(response) {
                    var msg = $("<p></p>");
                    msg.append("Description: " + response.description + ".");
                    msg.append("Price: " + response.price + ".");
                    msg.append("Nights: " + response.nights + ".");
                    msg.append("Confirmation number: " + response.confirmation + ".");

                    $('.tour').html(msg);
               }
          });
     });
});

/// Level4 ! Utilities
/// Step15 
$('button').on('click', function() {
     $.ajax('/cities/deals', {
           success: function(result) {
                $.each(result, function(index, dealItem) {
                    // Your code goes here
                    var el = $(".deal-" + index);
                    el.find("h3").html(dealItem.name);
                    el.find("p").html(dealItem.price);
               });
          }
    });
});

// Step 16 - simplify
$('button').on('click', function() {
     $.getJSON('/cities/deals', function(result) {
          $.each(result, function(index, dealItem) {
               var dealElement = $('.deal-' + index);
               dealElement.find('.name').html(dealItem.name);
               dealElement.find('.price').html(dealItem.price);
          });
     });
});

// Step 17 - map
$('.update-available-flights').on('click', function() {
     $.getJSON('/flights/late', function(result) {
           var flightElements = $.map(result, function(flightItem, index){
                 var flightEl = $('<li>'+flightItem.flightNumber+'-'+flightItem.time+'</li>');
                       return flightEl;
            });
           $('.flight-times').html(flightElements)
   });
});

// Step 18 - detach
$('.update-available-flights').on('click', function() {
     $.getJSON('/flights/late', function(result) {

          var flightElements = $.map(result, function(flightItem, index){
               var flightEl = $('<li>'+flightItem.flightNumber+'-'+flightItem.time+'</li>');
               return flightEl;
          });

          $('.flight-times').detach().html(flightElements).appendTo(".flights");
     });
});

