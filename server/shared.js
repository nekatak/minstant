Meteor.methods({
	insertChat: function(otherUserId){
		if (this.userId){
		Chats.insert({user1Id:this.userId, user2Id:otherUserId});
		}
	},
	updateChat: function(chatId,chat){
		if (this.userId){
		Chats.update(chatId,{$set: chat});
		}
	},
})