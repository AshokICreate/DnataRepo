define(function (require) {
  var actions = require ("actions/loginActions");
  var appactions = require ("actions/appActions");
  var Store = require ("stores/loginStore");

  var login = React.createClass({

    componentDidMount: function () {
        Store.addChangeListener (this._onChange);
    },
    componentWillUnmount: function () {
        Store.removeChangeListener (this._onChange);
    },
    _onChange: function () {
      if(Store.isUserLoggedIn())
        appactions.createHome();
      else{
        //error
        console.log("Error in authentication");
      }
    },
    loginButtonClicked: function () {
      console.log("Clicked");
      var username = $("#userinfo").val();
      var pwd = $("#pwdinfo").val();
      var checked = $("#checked:checked");
      var Obj = {
         username: username,
         pwd: pwd,
         checked: checked,
      }
    actions.createLogin(Obj);
  },

  render: function () {
    return(
      <div className= "gclass">
        <div className="loginicon"> <center>dnata</center></div>
        <div className="loginscreen">
          <center className="center">
            <input id="checked" type="checkbox">I have a dnata account</input>
          </center>
          <br/>
          <div className="userdetails">
          <label for="username">dnata id</label><br/>
          <input id="userinfo" type="text" name="username"></input><br/>
          </div>
          <div className="pwdetails">
          <label for="pwd">Password</label><br/>
          <input id="pwdinfo" type="password" name="pwd"></input>
          </div>
          <button className="loginbtn" onClick={this.loginButtonClicked}>LOGIN</button>
        </div>
      </div>
    );
    }
  });
  return login;
});
