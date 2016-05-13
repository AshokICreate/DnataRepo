define (function (require) {

	var server={requestURL:"", reqType:"",reqdata:"",callBackSuccess:""};
	//var URL= "http://msi-l1905/metricstream";
	//var URL= "https://dnatasafetyhub-uat.ek.aero/metricstream";
	var URL= "http://172.27.138.47/metricstream";
	var versionM2 = "m2/2.3";
	var BaseURL;
	var authorization;

	function servercall_success(msg)
	{
		try{

			server.callBackSuccess(msg);

		}catch(e){

		}
	};

	function servercall_error(msg)
	{
			var data;
			if(404 === msg.status)
			{
				server.callBackSuccess(data,msg.responseText);
			}else {
				server.callBackSuccess(data,"network_failed");
			}

	};

	var serverCall = {
		getURL:function()
		{
				return URL;
		},
		connectServer:function (reqType,reqURL,reqdata,successFunction)
		{
			try
			{
				server.reqType = reqType;
				server.reqdata = reqdata;
				server.callBackSuccess = successFunction;
				server.requestURL = reqURL;

				if(reqURL=="handshake")
				{
						BaseURL = URL+"/"+versionM2+"/"+server.reqdata.username+"/";
						authorization = server.reqdata.pwd;
						//server.reqdata.username = "pfadmin"
						//getInitialTokenForClient();
						//return;
				}

				makeServerCall(reqType,BaseURL+reqURL,reqdata,servercall_success,servercall_error,"application/json");
			}
			catch (e)
			{
				if (e instanceof TypeError)
				{
					alert("Type Error encountered. The description is " + e.message);
				}
				else if (e instanceof SyntaxError)
				{
					alert("Syntax Error encountered. The description is " + e.message);
				}
				else
				{
					alert("Error encountered. The description is " + e.message);
				}
			}
		}

	};

	return serverCall;

	function makeServerCall(reqType,serviceUrl,reqdata,successFunction,errorFunction,contentType)
	{


			$.ajax({
				beforeSend			:  function (xhr){
															xhr.setRequestHeader('authorization', authorization);
															xhr.setRequestHeader('access-control-allow-origin','*');
													},
				cache						: false,
				complete				: function (xhr) {},
				type            : reqType, //GET or POST or PUT or DELETE verb
				url             : serviceUrl, // Location of the service
				data            : reqdata, //Data sent to server
				contentType     : contentType, // content type sent to server
				dataType        : "JSON", //Expected data format from server
				processdata     : false, //True or False
				timeout			    : 60000,
				xhrFields       : {withCredentials: true},
				success         : successFunction,
				error						: errorFunction,

			});
	}


	function getAccessToken(clientData,code)
	{
			var _onSuccess = function(response)
			{
					BaseURL = URL+"/"+versionM2+"/"+server.reqdata.username+"/";
					authorization = response.token_type+" "+response.access_token;
					makeServerCall(server.reqType,BaseURL+server.requestURL,"",server.callBackSuccess);
			}

			var _onError = function(response,error,msg)
			{

			}

			var data = "grant_type=authorization_code"
				+"&code="+code
				+"&client_id="+clientData.client_id
				+"&client_secret="+clientData.client_secret;

			makeServerCall("POST",URL+"/oauth2/token",data,_onSuccess,_onError);
	}

	function getAuthenticate(clientData) {
			var xhttp;
			if (window.XMLHttpRequest) {
				// code for modern browsers
				xhttp = new XMLHttpRequest();
				} else {
				// code for IE6, IE5
				xhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhttp.onreadystatechange = function() {
				if (xhttp.responseURL && xhttp.readyState == 4 && xhttp.status == 200) {
					var token = getParameterByName("code",xhttp.responseURL);
					getAccessToken(clientData,token);
				}
			};
			xhttp.open("GET", URL+"/oauth2/token?username="+server.reqdata.username, true);
			xhttp.send();

	}

	function getAuthorizationCode(clientData)
	{
			var _onSuccess = function()
			{

			}

			var _onError = function(response,error,msg)
			{
					if(response.status === 401)
					{
						 getAuthenticate(clientData);
					}

			}

			var url = URL+"/oauth2/authorize?response_type=code&client_id="+clientData.client_id;
			makeServerCall("GET",url,"",_onSuccess,_onError);
	}

	function registerClient(token)
	{
			var _onSuccess = function(data)
			{
					getAuthorizationCode(data);
			}

			var _onError = function(error,msg,response)
			{
					console.log(response);
			}

			var obj = "initial_access_token="+token;
			makeServerCall("POST",URL+"/oauth2/register",obj,_onSuccess,_onError);
	}

	function getInitialTokenForClient()
	{
			var xhttp;
		  if (window.XMLHttpRequest) {
		    // code for modern browsers
		    xhttp = new XMLHttpRequest();
		    } else {
		    // code for IE6, IE5
		    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		  }
		  xhttp.onreadystatechange = function() {
		    if (xhttp.responseURL && xhttp.readyState == 4 && xhttp.status == 200) {
		      var token = getParameterByName("initial_access_token",xhttp.responseURL);
					registerClient(token);
		    }
		  };
		  xhttp.open("GET", URL+"/oauth2/authorize?response_type=initial_token", true);
		  xhttp.send();
	}

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

});
