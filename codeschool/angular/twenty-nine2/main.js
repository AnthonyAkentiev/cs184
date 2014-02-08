var app = angular.module("app", []);

app.factory("contacts", function() {
     return [
     {"firstName": "Angelica", "lastName": "Britt", "phone": "513-0955"},
     {"firstName": "Amery", "lastName": "Compton", "phone": "1-417-395-4214"},
     {"firstName": "Wendy", "lastName": "Morrow", "phone": "294-8234"},
     {"firstName": "Mercedes", "lastName": "Merrill", "phone": "1-206-670-0109"},
     {"firstName": "Porter", "lastName": "Anderson", "phone": "817-4745"},
     {"firstName": "Leah", "lastName": "Melendez", "phone": "406-3746"},
     {"firstName": "Olga", "lastName": "Mcgowan", "phone": "1-567-304-7633"},
     ];
});

app.controller("AppCtrl", function(contacts) {
     this.contacts = contacts;
     this.selectedContact = null;
     this.contactCopy = null;

     this.selectContact = function(contact) {
          this.selectedContact = contact;
          this.contactCopy = angular.copy(contact);
     }

     this.saveContact = function() {
          this.selectedContact.firstName = this.contactCopy.firstName;
     }
});
