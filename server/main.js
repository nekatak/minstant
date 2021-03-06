import { Meteor } from 'meteor/meteor';

 Meteor.startup(function () {
    if (!Meteor.users.findOne()){
      for (var i=1;i<9;i++){
        var email = "user"+i+"@test.com";
        var username = "user"+i;
        var avatar = "ava"+i+".png"
        console.log("creating a user with password 'test123' and username/ email: "+email);
        Meteor.users.insert({username:username,profile:{ avatar:avatar}, emails:[{address:email}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      }
    }
     Meteor.publish("signedUpUsers",function(){
      if (this.userId){
      return Meteor.users.find({},{fields:{services:0,emails:0}});
       }
    });
    Meteor.publish("currentChat",function(otherUserId){
      return Chats.find({$or:[
                {user1Id:this.userId, user2Id:otherUserId}, 
                {user2Id:this.userId, user1Id:otherUserId}
                ]});
    } ) ;
  });

  