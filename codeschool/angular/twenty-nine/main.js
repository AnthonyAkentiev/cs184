var app = angular.module("app", []);

app.factory("contacts",function(){
     return [
          {"first":"Anton", "second":"Akentiev", "third":"Something new"}
     ];
});

// lesson 51 - angular.copy
app.controller("AppCtrl",function(contacts){
     this.contacts = contacts;
     this.selectedContact = null;
     this.contactCopy = null;

     this.selectContact = function(contact){
          console.log('-->Selected contact...');
          console.log(contact);

          console.log('-->contactCopy: ');
          console.log(this.contactCopy);

          this.selectedContact = contact;
          this.contactCopy = angular.copy(contact);
     }

     this.saveContact = function(contact){
          this.selectedContact.first = this.contactCopy.first;
     }
});

