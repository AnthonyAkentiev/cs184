// Step 1 
var Appointment = Backbone.Model.extend({});
var appointment = new Appointment({"title":"some title"});

var AppointmentView = Backbone.View.extend({
     render:function(){
          var html = "<li>" + this.model.get('title') + "</li>";
          $(this.el).html(html);
     }
});

var appView = new AppointmentView({model:appointment});

// later...
appointment.set('title', 'My knee hurts');

// Step 2
appointmentView.render();
$('#app').html(appointmentView.el);


// Step 3 - defaults
var Appointment = Backbone.Model.extend({
     defaults:{
          title:"Checkup",
          date: new Date()
     }
});

// Step 4 - function as defaults
var Appointment = Backbone.Model.extend({
defaults: function() {
     return {
          title: 'Checkup',
          date: new Date(); 
          }
     }
});

// Step 5 - fetching data from server
var Appointment = Backbone.Model.extend({urlRoot:'/appointments'});

var app = new Appointment({id:1});
app.fetch();

// Step 6 - save
var appointment = new Appointment({id: 1});
appointment.set({cancelled:true});
appointment.save();

// Step 7 - events
var appointment = new Appointment({id: 1});
appointment.on('change',function(){
     alert('Changed');
});

// Step 8 - listen for attr.change
appointment.on('change:cancelled', function(){
     alert("Hey Dr. Goodparts, your appointment has cancelled!");
});

// Step 9 - convert to JSON
var appointment = new Appointment({id: 1});
console.log(appointment.toJSON());

// Step 10 - level 3 - change the default tag
var AppointmentView = Backbone.View.extend({tagName:'li', className:'appointment'});

// Step 11 - template
var AppointmentView = Backbone.View.extend({
     template: _.template('<span><%= title %></span>'),

     render: function(){
          var attributes = this.model.toJSON();
          this.$el.html(this.template(attributes));
     }
});

// Step 12 - events
var AppointmentView = Backbone.View.extend({
     template: _.template('<span><%= title %></span>'),

     events: { "click span": "alertTitle" },

     alertTitle: function(){
          alert(this.model.get('title')); 
     },
              
     render: function(){
          this.$el.html(this.template(this.model.toJSON()));
     }
});

// Step 13 -
var AppointmentView = Backbone.View.extend({
     template: _.template('<span><%= title %></span><a href="#">x</a>'),

     events: {"click a": "cancel" },
   
     cancel: function(){
         this.model.set({cancelled:true});
     },
             
     render: function(){
          this.$el.html(this.template(this.model.toJSON()));
     }
});

// Step 14 - auto render if model changes...
ppointmentView = Backbone.View.extend({
     template: _.template('<span class="<% if(cancelled) print("cancelled") %>">' +
                    '<%= title %></span>' +
                    '<a href="#">x</a>'),

     events:  { "click a": "cancel" },

     initialize: function(){
          this.model.on('change', this.render, this );  
          this.model.on('destroy', this.remove, this );  
     },

     cancel: function(){
          this.model.cancel();
     },

     render: function(){
          this.$el.html(this.template(this.model.toJSON()));
     },

     remove: function(){
          this.$el.remove(); 
     }
});

// Step 15 - level 5 - model collections
var AppointmentList = Backbone.Collection.extend({model:TodoItem, url:"/appointments"});
var appointments = new AppointmentList();

appointments.on('reset', function(){
     alert("fetched " + this.length);
});

appointments.fetch();

// Step 16 - envents
var appointments = new AppointmentList();

appointments.on('add',function(item){
     console.log("Title " + item.get("title"));
});

// Step 17 - collection views
// model 
var Appointment = Backbone.Model.extend({});
var AppointmentList = Backbone.Collection.extend({
     model: Appointment
});

// view
var AppointmentView = Backbone.View.extend({
     template: _.template('<span class="<%= if(cancelled) print("cancelled") %>">' +
               '<%= title %></span>' +
               '<a href="#">x</a>'),


     render: function(){
          this.$el.html(this.template(this.model.toJSON()));
          return this;
     }
});

// collection view
var AppointmentListView = Backbone.View.extend({
     render: function(){
          this.collection.forEach(this.addOne,this);
     },
     
     addOne: function(m){
          var appView = new AppointmentView({model:m});
          appView.render();
          this.$el.append(appView.el);
     }
});

// Step 18 - render
var appointmentsView = new AppointmentListView({collection: appointmentList});
appointmentsView.render();
$("#app").append(appointmentsView.el);

// Step 19 - events for collection views
var AppointmentListView = Backbone.View.extend({
     initialize: function(){
          this.collection.on('add', this.addOne, this);
          this.collection.on('reset', this.render, this);
     },

     render: function(){
          this.collection.forEach(this.addOne, this);
     },

     addOne: function(model){
          var appointmentView = new AppointmentView({model: model});
          appointmentView.render();
          this.$el.append(appointmentView.el);
     }
});

// Step 20 - level 7 - routers
var AppRouter = Backbone.Router.extend({
     routes: { 
          "appointments/:param": "show" 
     },

     show: function(id){
          console.log("heyo we're in show with id %d", id); 
     }
});

Backbone.history.start({pushState: true});

// Step 21 - fetch and render
var AppRouter = Backbone.Router.extend({
     routes: { "appointments/:id": "show" },

     show: function(id){
          var appointment = new Appointment({id: id});
          appointment.fetch();

          var appointmentView = new AppointmentView({model:appointment});
          appointmentView.render();

          $("#app").html(appointmentView.el);
     }
});

// Step 22 - default route
var AppRouter = Backbone.Router.extend({
     routes: { "":"index", "appointments/:id": "show" },

     initialize: function(options){
          this.appointmentList = options.appointmentList;
     },

     index: function(){
          var appointmentsView = new AppointmentListView({collection: this.appointmentList});
          appointmentsView.render();
          $('#app').html(appointmentsView.el);
          this.appointmentList.fetch();
     },

     show: function(id){
          var appointment = new Appointment({id: id});
          var appointmentView = new AppointmentView({model: appointment});
          appointmentView.render(); 
          $('#app').html(appointmentView.el);
          appointment.fetch();
     }
});

// Step 23 - last changes
var AppRouter = new( Backbone.Router.extend({
     routes: { "appointments/:id": "show", "": "index" },

     initialize: function(options){
          this.appointmentList = new AppointmentList();
     },

     index: function(){
          var appointmentsView = new AppointmentListView({collection: this.appointmentList});
          appointmentsView.render();
          $('#app').html(appointmentsView.el);
          this.appointmentList.fetch();
     },

     show: function(id){
          var appointment = new Appointment({id: id});
          var appointmentView = new AppointmentView({model: appointment});
          appointmentView.render();
          $('#app').html(appointmentView.el);
          appointment.fetch();
     },

     start: function(){
            Backbone.history.start({pushState:true});
     }
}));

$(function(){AppRouter.start();})

