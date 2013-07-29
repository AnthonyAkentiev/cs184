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



