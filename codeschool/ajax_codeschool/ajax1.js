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

// Step 19 - events
$(document).ready(function(){
// Get Weather
     $('button').on('click.weather', function() {
          var results = $(this).closest('li').find('.results');
          results.append('<p>Weather: 74&deg;</p>');
          $(this).off('click.weather');
     });
               
     // Show Photos
     $('button').on('click.photos', function() {
          var tour = $(this).closest('li');
          var results = tour.find('.results');
          results.append('<p><img src="/assets/photos/'+tour.data('loc')+'.jpg" /></p>');
          $(this).off('click.photos');
     });
});

// Step 20 - trigger custom events

// Step 21 - plugins
$.fn.photofy = function(){
     console.log(this);
}

$(document).ready(function() { 
     $('.tour').photofy();
});

// Step 22 - each
$.fn.photofy = function() {
     this.each(function(){
          console.log(this);
     });
}

$(document).ready(function() {
     $('.tour').photofy();
});

// Step 23 - 


// Step 23 - 

// Step 23 - 
$.fn.photofy = function() {
     this.each(function() { 
          var el = $(this);    
          var show = function(e) {
               e.preventDefault();
               el.addClass('is-showing-photofy');
          }
                           
          el.on('click.photofy', '.see-photos', show);
     });
}

$(document).ready(function() {
     $('.tour').photofy();  
});

// Step 24 - extend
$.fn.photofy = function(options) {
     this.each(function() {    
          var show = function(e) {
               e.preventDefault();
               settings.tour
               .addClass('is-showing-photofy')
               .find('.photos')
               .find('li:gt('+(settings.count-1)+')').hide();
          }

          var settings = $.extend(
               {count:3, 
               tour:$(this)
               },
               options
          );

          settings.tour.on('click.photofy', '.see-photos', show);
     });
}

$(document).ready(function() {
     $('.tour').photofy({ count: 1});
});

// Step 25 - trigger
$.fn.photofy = function(options) {
     this.each(function() {
          var show = function(e) {
               e.preventDefault();
               settings.tour
               .addClass('is-showing-photofy')
               .find('.photos')
               .find('li:gt('+(settings.count-1)+')')
                    .hide();
          }
          var settings = $.extend({
               count: 3,
               tour: $(this)
          }, options);

          settings.tour.on('click.photofy', '.see-photos', show);
          settings.tour.on('show.photofy', show);
     });
}

$(document).ready(function() {
     $('.tour').photofy({ count: 1});

     $('.show-photos').on('click', function(e) {
          e.preventDefault();
          $('.tour').trigger("show.photofy");
     });
});

// Step 26 - fade
$.fn.photofy = function(options) {
     this.each(function() {
          var show = function(e) {
               e.preventDefault();
               settings.tour
               .addClass('is-showing-photofy')
               .find('.photos')
               .find('li:gt('+(settings.count-1)+')')
                    .hide();
          }

          var settings = $.extend({
               count: 3,
               tour: $(this)
          }, options);

          var remove = function(e) {
               e.preventDefault();
               settings.tour.fadeOut().off('.photofy'); 
          };

          settings.tour.on('click.photofy', '.see-photos', show);
          settings.tour.on('show.photofy', show);    
          settings.tour.on('click.photofy','.hide-tour',remove);
     });
}

$(document).ready(function() {
     $('.tour').photofy({ count: 1});

     $('.show-photos').on('click', function(e) {
          e.preventDefault();
          $('.tour').trigger('show.photofy');
     });
});


// Step 27 - promises
var Vacation = {
     getPrice: function(location){
          var promise = $.ajax('/vacation/prices', {
               data: {q: location}
          });

          return promise;
     }
}

// Step 28 - done
$(document).ready(function() {
     $('button').on('click', function(){
          var location = $('.location').text();

          var vac = Vacation.getPrice(location);
          vac.done(function(result){
               $('.price').text(result.price);
          });
     });
});

// Step 29 - error handler + resolve/reject
var Vacation = {
     getPrice: function(location){
          var promise = $.Deferred();
          $.ajax({
               url: '/vacation/prices',
               data: {q: location},
               success: function(result){
                    promise.resolve(result.price);
               },
               error: function(result){
                    promise.reject("Bad");
               }
          });
          return promise;
     }
}

$(document).ready(function() {
     $('button').on(click, function(){
          var location = $('.location').text();
          Vacation.getPrice(location).done(function(result){
               $('.price').text(result.price);
          });
     });
});

// Step 30 
$(document).ready(function() {
     $('button').on('click', function(){
          var location = $(this).parent().data('location');
          var resultDiv = $(this).parent().find('.results').empty();

          $.when(
               Vacation.getPrice(location),
               Photo.getPhoto(location)
               ).then(function(priceResult, photoResult) {
                    $('<p>$'+priceResult+'</p>').appendTo(resultDiv);
                    $('<img />').attr('src', photoResult).appendTo(resultDiv);
               });
     });
});
