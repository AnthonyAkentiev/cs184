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

// Step 14 - Optional Routers
var AppRouter = new (Backbone.Router.extend({
     routes: {
          "appointments/p:page(/pp:per_page)(/)": "page"
     },

     page: function(page, per_page){
          per_page = per_page || 10;
          this.appointments.fetch({data: {page: page, per_page: per_page}});
     }
}));

// Step 15 - params with encoding
//  example: appRouter.navigate('appointments/Hello%20World');
var AppRouter = new (Backbone.Router.extend({
     routes: {
          "appointments/p:page(/pp:per_page)(/)": "page"
     },

     page: function(page, per_page){
          page = decodeURIComponent(page);
          per_page = decodeURIComponent(per_page);

          this.appointments.fetch({data: {page: page, per_page: per_page}});
     }
}));

// Step 16 - regexp for ONLY NUMERIC values 
var AppRouter = new (Backbone.Router.extend({
     initalize:function(){
          this.route("/^appointments\/(\d+)$/","show");
     },

     show: function(id){
          var appointment = new Appointment({id: id});
          console.log(appointment);
     }
}));


// Step 17 - Catch all
var AppRouter = new (Backbone.Router.extend({
     routes: {
          "appointments/:id":  "show",
          "*path": "notFound"
     },

     notFound: function(){
          console.log("No route matches this.");
     },

     show: function(id){
          var appointment = new Appointment({id: id});
          console.log(appointment);
     }
}));

// Step 18 - just a sample 
var Appointment = Backbone.Model.extend({});

var Appointments = Backbone.Collection.extend({
     model: Appointment
});

var AppointmentsView = Backbone.View.extend({
     render: function() {
          var _this = this;
          this.collection.forEach(function(model) {
               return _this.$el.append("<h2>" + (model.get('title')) + "</h2><em>" + (model.get('name')) + "</em>");
               });
          return this;
     }
});

var appointments = new Appointments([
     {
          title: "Toothache",
          name: "Eric"
     }, {
          title: "Regular Checkup",
          name: "Gregg"
     }
]);

// Step 19 - get already existing element
var appointmentsView = new AppointmentsView({collection: appointments, el: $('#app')});
$('#app').html(appointmentsView.render());

// Step 20 - Extra options 
var AppointmentsView = Backbone.View.extend({
     initialize: function(options){
          this.doctor = options.doctor;
     }
});

// Step 21 - escaping
var AppointmentView = Backbone.View.extend({
     template: _.template("<span><%= model.escape('title') %></span>"),

     render: function(){
          this.$el.html(this.template({model:this.model}));
     }
});

// Step 22 - options 
var AppointmentView = Backbone.View.extend({
     template: _.template("<span><%= title %></span>"),

     initialize: function(){
          this.model.on('change:title', this.changedTitle, this);
     },

     render: function(){
          this.$el.html(this.template(this.model.attributes));
     },

     // see options here!
     changedTitle: function(model, value, options){
          this.$('span').html(value);
          if(options.highlight)
          {
               this.$el.effect('highlight', {}, 1000);
          }
     }
});

// Step 23 - "listen to"
// 
// Use the new listenTo View function to make the view listen to the model's 'change:title' event, 
// instead of having the model notify the view of the event. This way we can safely call remove() 
// on the view and feel confident all of our events are cleaned up.
var AppointmentView = Backbone.View.extend({
     template: _.template("<span><%= title %></span>"),

     initialize: function(){
          // instead of 
          // this.model.on('change:title', this.changedTitle, this);
          this.listenTo(this.model, 'change:title', this.changedTitle, this);
     },

     render: function(){
          this.$el.html(this.template(this.model.attributes));
     },

     changedTitle: function(model, value, options){
          this.$('span').html(value);

          if (options.highlight !== false){
               this.$el.effect('highlight', {}, 1000); 
          }
     }
});

// Level5. FORMS.
// Step 24 -  
var AppointmentForm = Backbone.View.extend({
     template: _.template('<form><input name="title" type="text" /><input name="name" type="text" /></form>')
});

// Step 25 - Render function 
var AppointmentForm = Backbone.View.extend({
     template: _.template('<form><input name="title" type="text" /><input name="name" type="text" /></form>'),

     render: function(){
          this.$el.html(this.template(this.model.attributes));
          return this;
     }
});

// Step 26 - Use parameters from model 
var AppointmentForm = Backbone.View.extend({
     template: _.template('<form><input name="title" type="text" value="<%= title %>" /><input name="name" type="text" value="<%= name %>" /></form>'),

     render: function(){
          this.$el.html(this.template(this.model.attributes));
          return this;
     }
});

// Step 27 - save 
var AppointmentForm = Backbone.View.extend({
     template: _.template('<form><input name="title" type="text" value="<%= title %>" /><input name="name" type="text" value="<%= name %>" /></form>'),
     render: function(){
          this.$el.html(this.template(this.model.attributes));
          return this;
     },

     events: {
          submit: "save"
     },

     save: function(e){
          e.preventDefault();
          var newTitle = this.$('input[name=title]').val();
          var newName = this.$('input[name=name]').val();
          this.model.save({title: newTitle, name: newName});
     }
});

// Step 28 - navigate to index on success 
var AppointmentForm = Backbone.View.extend({
     template: _.template('<form><input name="title" type="text" value="<%= title %>" /><input name="name" type="text" value="<%= name %>" /></form>'),

     render: function(){
          this.$el.html(this.template(this.model.attributes));
          return this;
     },

     events: {
          submit: "save"
     },

     save: function(e){
          e.preventDefault();
          var newTitle = this.$('input[name=title]').val();
          var newName = this.$('input[name=name]').val();

          this.model.save({title: newTitle, name: newName},{
               success: function(model,response,options)
                    Backbone.history.navigate('',{trigger:true});
               },
               error: function(model,xhr,options){
                    var err = JSON.parse(xhr.responseText);
                    alert(err);
               }
          });
     }
});

// Level6 - APP organization 
// Step 29 - 
var AppointmentApp = {
     Collections: {},
     Models: {},
     Views: {}
}

AppointmentApp.Models.Appointment = Backbone.Model.extend({});
AppointmentApp.Collections.Appointments = Backbone.Collection.extend({});
AppointmentApp.Views.Appointment = Backbone.View.extend({});
AppointmentApp.Views.Appointments = Backbone.View.extend({});
AppointmentApp.AppRouter = new (Backbone.Router.extend({}))();

// Step 30 -Turn the AppointmentApp object into a Backbone view instance. 
// That means that you'll have to immediately instantiate the Backbone.View class returned by Backbone.View.extend()
var AppointmentApp = new (Backbone.View.extend({
     Collections: {},
     Models: {},
     Views: {}
}))();

// Step 31 - 
var AppointmentApp = new (Backbone.View.extend({
     Collections: {},
     Models: {},
     Views: {},

     events: {
          'click a[data-backbone]': function(e){
               e.preventDefault();
               Backbone.history.navigate(e.target.pathname, { trigger: true });
          }
     }
}))({el: document.body});

// Step 32 - Load faster! 
var AppointmentApp = new (Backbone.View.extend({
     Collections: {},
     Models: {},
     Views: {},

     events: {
          'click a[data-backbone]': function(e){
               e.preventDefault();
               Backbone.history.navigate(e.target.pathname, { trigger: true });
          }
     },

     start: function(data){
          this.appointments = new AppointmentApp.Collections.Appointments(data.appointments);
          var appointmentsView = new AppointmentApp.Views.Appointments({collection: this.appointments});
          $('#app').html(appointmentsView.render().el);
     }
}))({el: document.body});

// Level7 
// Step 33 - mustache templates 
var AppointmentForm = Backbone.View.extend({
     template: Mustache.compile('<form>' + 
                    '<input name="title" type="text" value="{{title}}" />' + 
                    '<input name="name" type="text" value="{{name}}" /></form>'),

     render: function(){
          this.$el.html(this.template(this.model.attributes));
          return this;
     }
});

// Step 34 - for 
App.Views.Appointment = Backbone.View.extend({
     template: Mustache.compile('<h2>{{ title }}</h2>' + 
                    'Possible Dates: <ul>{{#possibleDates}}' +
                    '<li>{{.}}</li>' +
                    '{{/possibleDates}}</ul>'),

     render: function(){
     this.$el.html(this.template(this.model.attributes));
     return this;
     }
});

// Step 35 - custom read/write/
App.Models.Appointment = Backbone.Model.extend({
     sync: function(method, model, options){
          if(method==="read" || method==="create")
          {
               Backbone.sync(method, model, options);    
          }else
          {
               // can not save to server!
               console.log("Error"); 
          }
     }
});

// Step 36 - local storage 
App.Models.Appointment = Backbone.Model.extend({
     sync: function(method, model, options){
          options = options || {};

          switch(method){
               case 'delete':
                    var key = "Appointment-" + model.id;
                    localStorage.removeItem(key);
                    break;

               case 'update':
                    break;

               case 'create':
                    var key = "Appointment-" + model.id;
                    localStorage.setItem(key, JSON.stringify(model));
                    break;

               case 'read':
                    var key = "Appointment-" + model.id;
                    var result = localStorage.getItem(key);
                    if(result){
                    result = JSON.parse(result);
                    options.success && options.success(result);
                    }else if(options.error){
                         options.error("Couldn't find Appointment with id=" + model.id);
                    }
                    break;
          }
     }
});

// Step 37 - local storage 
App.Models.Appointment = Backbone.Model.extend({
     sync: function(method, model, options){
          options = options || {};

          switch(method){
               case "delete":
                    var key = "Appointment-" + model.id;
                    localStorage.removeItem(key);
                    break;

               case "update":
                    var key = "Appointment-" + model.id;
                    localStorage.setItem(key, JSON.stringify(model));
                    break;

               case "create":
                    var key = "Appointment-" + model.id;
                    localStorage.setItem(key, JSON.stringify(model));
                    break;

               case "read":
                    var key = "Appointment-" + model.id;
                    var result = localStorage.getItem(key);
                    if(result){
                         result = JSON.parse(result);
                         options.success && options.success(result);
                    }else if(options.error){
                         options.error("Couldn't find Appointment with id=" + model.id);
                    }
                    break;
          }
     }
});


