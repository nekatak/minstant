  var avatar;

  Template.register.events({
    'submit #register-form' : function(e, t) {debugger;
      e.preventDefault();
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value;
        var username=t.find('#account-username').value;
        // Trim and validate the input
        if (avatar==undefined){ 
          avatar="ava1.png";
        }
        if (password.length<6){
          alert("password too small!"); 
          return;
        }

      Accounts.createUser({email: email, profile:{username: username, avatar:avatar}, password : password}, function(err){
          if (err) {
            console.log('Try another username and email');
            // Inform the user that account creation failed
          } else {console.log('successfully made account!')
            // Success. Account has been created and the user
            // has logged in successfully. 
          }

        });

      return false;
    }
  });

  Template.iconSelect.helpers({
  icons: ["ava1.png","ava2.png","ava3.png","ava4.png","ava5.png","ava6.png","ava7.png","ava8.png"],
});


Template.iconSelect.events({
  "click .js-avatar":function(e){debugger;
    console.log(e.target.src);
    avatar=e.target.src.replace("http://localhost:3000/","");
  },
});