// Step 1 - parse function
// JSON: "appointment": { "title": "Ms. Kitty Hairball Treatment", "cankelled": false, "identifier": 1 }
var Appointment = Backbone.Model.extend({
     parse: function(response){
          return response.appointment;
     }
});


// Step 2 - remove bad parameter
var Appointment = Backbone.Model.extend({
     parse: function(response){
          response.appointment.cancelled = response.appointment.cankelled;
          delete response.appointment.cankelled;

          return response.appointment;
     }
});

// Step 3 - custom parsing for attributes
// JSON:
// "appointment": { "title": "Ms. Kitty Hairball Treatment", "cankelled": false, "identifier": 1 }
var Appointment = Backbone.Model.extend({
     idAttribute: "identifier",

     parse: function(response){
          var appointment = response.appointment;
          appointment.cancelled = appointment.cankelled;

          delete appointment.cankelled;
          return appointment;
     }
});

// Step 4 - Calling overriden "parse" function 
var appointment = new Appointment(data, {parse:"true"});

// Step 5 - override toJSON  (send back to server)
var Appointment = Backbone.Model.extend({
     toJSON: function(){
          var attributes = _.clone(this.attributes);

          attributes.cankelled = attributes.cancelled;
          delete attributes.cancelled;

          return { appointment: attributes };
     }
});

// Step 6 - modify view
var AppointmentView = Backbone.View.extend({
     template: _.template('<span>' +
               '<%= title %></span>' +
               '<a href="#">x</a>'),

     render: function(){
          // instead of
          // this.$el.html(this.template(this.model.toJSON()));
          this.$el.html(this.template(this.model.attributes));
     }
});

// Step 7 - Collections + override 
// JSON:
//{
//     "per_page": 10, "page": 1, "total": 50,
//     "appointments": [
//          { "title": "Ms. Kitty Hairball Treatment", "cankelled": false, "identifier": 1 }
//     ]
//}
var Appointments = Backbone.Collection.extend({
     parse: function(response){
          this.perPage = response.per_page;
          this.total = response.total;
          this.page = response.page;

          return response.appointments;
     }
});

// Step 8 - custom parameter
var appointments = new Appointments();
appointments.fetch({data:{since:"2013-01-01"}});

// Step 9 - template 
var AppointmentListView = Backbone.View.extend({
     template: _.template('<a href="#/appointments/p<%= page %>/pp<%= per_page %>">View Next</a>'),

     initialize: function(){
          this.collection.on('reset', this.render, this);
     },

     render: function(){
          this.$el.empty();
          this.collection.forEach(this.addOne, this);
     },

     addOne: function(model){
          var appointmentView = new AppointmentView({model: model});
          appointmentView.render();
          this.$el.append(appointmentView.el);
     }
});

// Step 10 - Template 
var AppointmentListView = Backbone.View.extend({
     template: _.template('<a href="#/appointments/p<%= page %>/pp<%= per_page %>">View Next</a>'),

     initialize: function(){
          this.collection.on('reset', this.render, this);
     },

     render: function(){
          this.$el.empty();
          this.collection.forEach(this.addOne, this);
     },

     addOne: function(model){
          var appointmentView = new AppointmentView({model: model});
          appointmentView.render();
          this.$el.append(this.template({page:this.collection.page + 1, per_page:this.collection.per_page}));
     }
});

// Step 11 - router
var AppRouter = new (Backbone.Router.extend({
     routes: { 
          "": "index",
          "appointments/p:page/pp:per_page":"page"
     },

     initialize: function(options){
          this.appointmentList = new AppointmentList();
     },

     index: function(){
          var appointmentsView = new AppointmentListView({collection: this.appointmentList});
          appointmentsView.render();
          $('#app').html(appointmentsView.el);
          this.appointmentList.fetch();
     },
     
     page: function(page,per_page) {
          this.appointmentList.fetch({data:{page:page, per_page:per_page}});
     }
}));

// Step 12 - compare
var Appointments = Backbone.Collection.extend({
     comparator: 'date'
});

// Step 13 - 
var Appointments = Backbone.Collection.extend({
     comparator: function(model1, model2){
          return model1.get('date') < model2.get('date');
     }
});

// Step 14 - Routers

