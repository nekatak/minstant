var selected;

Template.emoticons.helpers({
	icons: function(){debugger;
		var arr=[];
		for (let i=1; i<21; i++){
			var img="em"+i+".PNG";
			arr.push(img);
		}
		return arr;
	},
})

Template.emoticons.events({
  "click .js-emoticon":function(e){
    console.log(e.target.alt);
    selected=e.target.alt;
    var cursorPosition = $('.js-input').prop("selectionStart");
    console.log(cursorPosition);
    document.getElementsByClassName("js-input")[0].value+=" {~"+selected+"~}"
    document.getElementsByClassName("js-input")[0].focus();
  },
});