import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

  ///
  // helper functions 
  /// 
  Template.available_user_list.helpers({
    users:function(){
      return Meteor.users.find();
    }
  })

  Template.available_user.onCreated(function(){
    this.subscribe("signedUpUsers");
  } );

 Template.available_user.helpers({
    getUsername:function(userId){
      user = Meteor.users.findOne({_id:userId});
      return user.username;
    }, 
    isMyUser:function(userId){
      if (userId == Meteor.userId()){
        return true;
      }
      else {
        return false;
      }
    }
  });

 
  Template.chat_page.helpers({
    messages:function(){
      var chat = Chats.findOne({_id:UserSession.get("chatId")});
      if (chat){
      return chat.messages;
      }
    }, 
    other_user:function(){
      return ""
    }, 
    thisisuser:function(textBy){
    	if (Meteor.user().username==textBy){ //////////
    		return true;
    	}
    	else {
    		return false;
    	}
    },
 
  })
 Template.chat_page.events({
  // this event fires when the user sends a message on the chat page
  'submit .js-send-chat':function(event){
    // stop the form from triggering a page reload
    event.preventDefault();
    // see if we can find a chat object in the database
    if (event.target.chat.value == ""){ return; }
    // to which we'll add the message
    var chat = Chats.findOne({_id:UserSession.get("chatId")});
    if (chat){// ok - we have a chat to use
      var msgs = chat.messages; // pull the messages property
      if (!msgs){// no messages yet, create a new array
        msgs = [];
      }
      // is a good idea to insert data straight from the form
      // (i.e. the user) into the database?? certainly not. 
      // push adds the message to the end of the array
      msgs.push({text: event.target.chat.value, textBy:Meteor.user().username, ava:Meteor.user().profile.avatar});
      // reset the form
      event.target.chat.value = "";
      // put the messages array onto the chat object
      chat.messages = msgs;
      // update the chat object in the database.
      Meteor.call("updateChat",UserSession.get("chatId"),chat)
    }
  }
 })