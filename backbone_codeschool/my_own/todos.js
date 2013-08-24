// Load the application once the DOM is ready, using `jQuery.ready`:
$(document).ready( function(){

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  var Todo = Backbone.Model.extend({
    urlRoot:"/todo",

    defaults:{
      id:0,
      title:"Sample TODO",
      done:false
    },

    // Ensure that each todo created has `title`.
    initialize: function() {
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  /*
  var todo1 = new Todo({id:1});
  todo1.fetch({
     success:function(resp){
          //var json_text = JSON.stringify(resp, null, 2);
          //alert("Success: " + json_text);
     },

     error:function(){alert("Failed");}
  });*/

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var TodoList = Backbone.Collection.extend({
    model: Todo,
    url:"/todos_list"
  });

  // Create our global collection of **Todos**.
  var todos = new TodoList();
  todos.on('add',function(item){
    console.log("Title " + item.get("title"));
  });

  // The DOM element for a todo item...
  var TodoView = Backbone.View.extend({
    tagName:  "li",

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.clear);
    },

    template: _.template('<span class="<% if(done) print("done")%>"><%= title %></span>'),

    // Re-render the titles of the todo item.
    render: function() {
      var txt = this.template(this.model.toJSON());
      this.$el.html(txt);
      return this;
    },

    clear: function() {
     this.$el.remove(); 
    }
  });

  // 
  var TodosListView = Backbone.View.extend({
    el:$("#todo-list"),

    initialize:function(){
       this.main = $('#main');
       this.main.show();

       this.listenTo(this.collection, 'add',   this.addOne);
       this.listenTo(this.collection, 'reset',   this.addAll);

       // start 
       this.collection.fetch({
          success:function(collection,resp,opts){
            collection.forEach(function(item){
               var item_text = JSON.stringify(item, null, 2);
               console.log("Adding item: " + item_text);
            });
          },

          error:function(collection,resp,opts){
            console.log("Can not get TODO items from server. Try again later");
          }
       });
    },

    render:function(){
    },

    addOne:function(item){
       var singleView = new TodoView({model:item});
       singleView.render();
      
       console.log('addOne called. Element= ' + singleView.el);
       this.$el.append(singleView.el);
    },
    
    addAll: function() {
      console.log("addAll method called...");
      this.collection.forEach(this.addOne, this);
    },
  });

  var todosView = new TodosListView({collection: todos});
});
