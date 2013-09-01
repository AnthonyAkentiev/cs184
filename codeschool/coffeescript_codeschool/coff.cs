// Step 1 - conver JS to CoffeeScript
# $('#newCoffee a').click(function() {
#   var name = prompt('Name of coffee:');
#   alert("New coffee added: " + name);
# });

$('#newCoffee a').click ->
  name = prompt('Name of coffee:') 
    alert("New coffee added: #{name}")


// Step 2
# $('#newCoffee a').click(function() {
#   var coffee, name;
#   name = prompt('Name of coffee:');
#   coffee = $("<li>" + name + "</li>");
#   $('ul.drink').append(coffee);
# });

$('#newCoffee a').click ->
  name = prompt('Name of coffee:')
    coffee = $("<li>#{name}</li>")
      $('ul.drink').append coffee

// Step 3 - this
# $('.drink li a').click(function(e) {
#   e.preventDefault();
#   alert($(this).text());
# });

$('.drink li a').click (e) ->
  e.preventDefault()
    alert($(@).text())

// Step 4
# $('.drink li').mouseenter(function() {
#   $(this).find('span').show();
# });
# $('.drink li').mouseleave(function() {
#   $(this).find('span').hide();
# });

$('.drink li').mouseenter ->
  $(@).find('span').show()
    
    $('.drink li').mouseleave ->
      $(@).find('span').hide()

// Step 5 - two functions
# $('.drink li').hover(function() {
#   $(this).find('span').show();
# }, function() {
#   $(this).find('span').hide();
# });

$('drink li').hover( 
     ->
      $(@).find('span').show()
     ->
       $(@).find('span').hide()
)

// Step 6 - switch
message = switch newLevel
  when 1 then 'Out of bed yet?'
  when 2 then 'Good morning'
  else 'You should stop while you can'

// Step 7 -
# if (typeof newLevel !== "undefined" && newLevel !== null){
#   checkLevel(newLevel);
# } else {
#   resetLevel();
# }

if newLevel?
  checkLevel(newLevel)
else 
  resetLevel()

// Step 8
coffee = 
 name:'Russian'
 level:2
 isRussian:->true

// is compiled into
var coffee;
coffee = {
  name: 'Russian',
  level: 2,
  isRussian: function() {
    return true;
  }
};

// Step 9 - for
for p in people 
  console.log(p.name) if p.age > 18

// Step 10 - list comprehensions
console.log(person.name) for person in people when person.age > 18

// Step 11 
addCoffee(coffee) for coffee in coffeeList when not coffee.isRussian?()

// Step 12
# jQuery(function($){
#   $('.drink a').click(function(){
#     var newStyle = {
#       'color': '#F00',
#       'font-weight': 'bold'
#     };
#     $(this).css(newStyle)
#   });
# });

jQuery ($) -> 
  $('.drink a').click ->
     newStyle = {
       'color': '#F00'
       'font-weight': 'bold'
     }
     $(@).css(newStyle)

// Step 13 - 
coffeeList = 
  init: ->
    $('.drink a').click (e) ->
      e.preventDefault()
      alert $(@).text()

coffeeList.init()

// Step 14 - ajax
$.ajax
  url: '/coffeeList'
  method: 'GET',
  success: (results) ->
    $('ul.drink').append("<li>#{coffee.name}</li>") for coffee in results when coffee.level > 3
  error: (results) ->
    alert "failure #{results}"

// Step 15 
class Coffee
  constructor: (name,level) -> 
    @name = name
    @level = level

    name: 'Russian'
    level: 2
    isRussian: -> @name is 'Russian'

// Step 16
class Coffee extends Drink
     constructor: (@name, @level=0) ->
     serve: ->
        return false if @sleeve is not on
        super()

// Step 17 - 
class DrinkLink
  watchClick: ->
    $('a').click ->
      $(@).css('color', '#F00')

// Step 18 - 
class DrinkLink
  constructor: (@linkClicked=false) ->
    watchClick: ->
      $('.drink a').click (event) =>
        $(event.target).css('color', '#F00')
        @linkClicked = true

// compiled into
var DrinkLink;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
DrinkLink = (function() {

  function DrinkLink(linkClicked) {
    this.linkClicked = linkClicked != null ? linkClicked : false;
  }
  
  DrinkLink.prototype.watchClick = function() {
    return $('.drink a').click(__bind(function(event) {
      $(event.target).css('color', '#F00');
      return this.linkClicked = true;
    }, this));
  };

  return DrinkLink;
})();
