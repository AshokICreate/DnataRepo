define(function (require) {
  var actions = require ("actions/loginActions");
  var Store = require ("stores/loginStore");

  var login = React.createClass({

    getInitialState:function()
    {
      return {msg:""}
    },
    componentDidMount: function () {
        Store.addChangeListener (this._onChange);
    },
    componentWillUnmount: function () {
        Store.removeChangeListener (this._onChange);
    },
    _onChange: function () {
      if(!Store.isUserLoggedIn())
        this.setState({msg:"* Authentication failed. Please check your credentials"});
    },
    loginButtonClicked: function () {
      var username = $("#userinfo").val();
      var pwd = $("#pwdinfo").val();
      var checked = $("#checked:checked");
      var Obj = {
         username: username,
         pwd: pwd,
         checked: checked,
      }
    actions.doLogin(Obj);
  },

  render: function () {
    return(
      <div className= "gclass">
        <div className="loginicon"></div>
        <div className="loginscreen">
          <center className="center">
            <input id="checked" type="checkbox">I have a dnata account</input>
          </center>
          <div className="userdetails">
            <label>dnata id</label><br/>
            <input id="userinfo" type="text" name="username" value="s130906"></input><br/>
          </div>
          <div className="pwdetails">
            <label>Password</label><br/>
            <input id="pwdinfo" type="password" name="pwd"></input>
          </div>
          <div className="errorMsg">{this.state.msg}</div>
          <button className="loginbtn" onClick={this.loginButtonClicked}>LOGIN</button>
        </div>
      </div>
    );
    }
  });
  return login;
});
