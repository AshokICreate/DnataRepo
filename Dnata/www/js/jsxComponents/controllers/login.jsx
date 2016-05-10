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
        //this is for input navigations in form
        $('input').keydown( function(e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if(key == 13) {
              e.preventDefault();
              var inputs = $('.loginscreen').find(':input:visible');

              if(inputs.index(this) === inputs.length-1)
              {
                $(this).blur();
              }else {
                inputs.eq( inputs.index(this)+ 1 ).focus();
              }

          }
        });

    },
    componentWillUnmount: function () {
        Store.removeChangeListener (this._onChange);
        var node = this.getDOMNode();
        $(node).find('input').unbind('keydown');
    },
    _onChange: function () {
      if(!Store.isUserLoggedIn())
        this.setState({msg:"* Authentication failed. Please check your credentials"});
    },
    loginButtonClicked: function () {
      var username = $("#userinfo").val();
      var pwd = $("#pwdinfo").val();
      var Obj = {
         username: username,
         pwd: pwd,
      }
    actions.doLogin(Obj);
  },

  render: function () {
    return(
      <div className= "gclass">
        <div className="loginicon"></div>
        <div className="loginscreen">
          <div className="userdetails">
            <label className="loginlabel">dnata id</label><br/>
            <input id="userinfo" type="text" name="username" value="s130906"></input><br/>
          </div>
          <div className="pwdetails">
            <label className="loginlabel">Password</label><br/>
            <input id="pwdinfo" type="password" name="pwd"></input>
          </div>
          <div className="errorMsg">{this.state.msg}</div>
          <button className="loginbtn" onClick={this.loginButtonClicked}>LOGIN</button>
          <div className="footer">
            <div className="msfooter">Powered by <span id="msbold">MetricStream</span></div>
            <div className="vfooter">Version 1.01.02</div>
          </div>
        </div>
      </div>
    );
    }
  });
  return login;
});
