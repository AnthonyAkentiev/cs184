$("button").on("click", function(){
     var message = $("<span>Call 1-555-jquery-air to book this tour</span>");
     $(".usa").append(message);
     $("button").remove();
});


$(document).ready(function(){
 $(".tour").on("click", function(){
      var message = $("<span>Call 1-555-jquery-air to book this tour</span>");
      $(this).closest(".tour").append(message);
      $(this).find("button").remove();
 });
});

<div id="tour">
<h2>Paris, France Tour</h2>
<p>$2,499 for 7 Nights</p>
<button>See photos from our last tour</button>
<ul class="photos">
<li>
<img src="/assets/photos/paris1.jpg">
<span>Arc de Triomphe</span>
</li>
<li>
<img src="/assets/photos/paris2.jpg">
<span>The Eiffel Tower</span>
</li>
<li>
<img src="/assets/photos/paris3.jpg">
<span>Notre Dame de Paris</span>
</li>
</ul>
</div>

$(document).ready(function() { 
     $("#tour").on("click", "button", function() { 
          $(".photos").slideToggle();
          });
     $(".photos").on("mouseenter", "li", function() {
          $(this).find("span").slideToggle();
          });
});


$(document).ready(function() { 
     $("#tour").on("click", "button", function() { 
          $(".photos").slideToggle();
     });
          
     function showPhotos(){
          $(this).find("span").slideToggle();  
     }
              
     $(".photos").on("mouseenter", "li", showPhotos); 
     $(".photos").on("mouseleave", "li", showPhotos);
});

///////
<div class="tour" data-daily-price='357'>
<h2>Paris, France Tour</h2>
<p>$<span id='total'>2,499</span> for <span id='nights-count'>7</span> Nights</p>
<p>
<label for="nights">Number of Nights</label>
</p>
<p>
<input type="number" id="nights" value="7" />
</p>
</div>

$(document).ready(function() {
     $("#nights").on("keyup", function() {
          $("#nights-count").text($(this).val());

          var price = $(this).closest(".tour").data("daily-price");
          var total = +$(this).val() * price;
          $("#total").text(total);
     });
});


//////////
<div id="all-tours">
<h1>Guided Tours</h1>
<ul>
<li class="tour usa">
<h2>New York, New York</h2>
<span class="details">$1,899 for 7 nights</span>
<span class="per-night"><span class="price">$275</span>/day</span>
<button class="book">Book Now</button>
<ul class="photos">
<li>
<img src="/assets/photos/paris3.jpg">
<span>Notre Dame de Paris</span>
</li>
</ul>
</li>
<li class="tour france" data-discount="99">
<h2>Paris, France</h2>
<span class="details">$1,499 for 5 nights</span>
<span class="per-night"><span class="price">$300</span>/day</span>
<button class="book">Book Now</button>
<ul class="photos">
<li>
<img src="/assets/photos/newyork1.jpg">
<span>Brooklyn Bridge</span>
</li>
</ul>
</li>
<li class="tour uk" data-discount="149">
<h2>London, UK</h2>
<span class="details">$2,199 for 5 nights</span>
<span class="per-night"><span class="price">$440</span>/day</span>
<button class="book">Book Now</button>
<ul class="photos">
<li>
<img src="/assets/photos/london.jpg">
<span>Tower of London</span>
</li>
</ul>
</li>
</ul>
</div>

$(document).ready(function() {
 $(".tour").on("mouseenter", function() {
  $(this).css("background-color", "#252b30"); 
  $(this).css("font-weight","bold");
 });
});

$(document).ready(function() {
 $(".tour").on("mouseenter", function() {
  $(this).css({"background-color":"#252b30","font-weight":"bold"});
 });
});

$(document).ready(function() {
$(".tour").on("mouseenter", function() {
     $(this).css({"background-color": "#252b30", "font-weight": "bold"});
     $(this).find(".photos").addClass("highlight");
     });

$(".tour").on("mouseleave",function(){
     $(this).find(".photos").removeClass("highlight");
     });
});

/////
$(document).ready(function() {
          $(".tour").on("mouseenter", function() {
               $(this).addClass("highlight");
               $(this).find(".per-night").animate({"opacity": "1","top":"-14px"});

               });
          $(".tour").on("mouseleave", function() {
               $(this).removeClass("highlight");
               });
          });

$(document).ready(function() {
          $(".tour").on("mouseenter", function() {
               $(this).addClass("highlight");
               $(this).find(".per-night").animate({"top": "-14px","opacity": "1"}, "fast");
               });

          $(".tour").on("mouseleave", function() {
               $(this).removeClass("highlight");
               $(this).find(".per-night").animate({"top": "0px","opacity": "0"}, "fast");
               });
          });

