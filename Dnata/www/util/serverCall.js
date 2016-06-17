define (function (require) {

	var server={requestURL:"", reqType:"",reqdata:"",callBackSuccess:""};
	//var URL= "http://msi-l1905/metricstream";
	//var URL= "https://dnatasafetyhub-uat.ek.aero/metricstream";
	//Performance system: 172.27.132.219
	//var URL= "https://172.27.132.219/metricstream";
	//dev
	//var URL = "http://172.27.138.47/metricstream";
	//production
	var URL = "https://safetyhub.dnata.com/metricstream";
	var isSSO = false;
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
			if(404 === msg.status){
				server.callBackSuccess(data,"matches_not_found");
			}else if(408 === msg.status || 200 > msg.status || 3 === msg.code){
				server.callBackSuccess(data,"network_failed");
			}else if(401 === msg.status){
				server.callBackSuccess(data,"invalid_session");
			}else{
				server.callBackSuccess(data,"internal_error");
			}

	};

	var serverCall = {
		getURL:function()
		{
				return URL;
		},
		clearCookies:function()
		{
				authorization = "";
		},
		uploadDocument:function(reqType,reqURL,fileURL,options,successFunction)
		{
				server.reqType = reqType;
				server.reqdata = fileURL;
				server.callBackSuccess = successFunction;
				server.requestURL = reqURL;

				var headers={
											'Authorization':authorization
										};

				options.headers = headers;

				var success = function (data) {
					servercall_success(JSON.parse(data.response))
				}

				var ft = new FileTransfer();
				ft.upload(fileURL, BaseURL+reqURL, success, servercall_error, options,true);
		},
		connectServer:function (reqType,reqURL,reqdata,successFunction,contentType)
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


						if(isSSO)
						{
							authenticateBySSOEncryption();
						}else {
							var userDetails = {};
							userDetails.token_type = server.reqdata.pwd;
							userDetails.access_token = null;
							userDetails.expires_in = 3600;
							userDetails.user_name = server.reqdata.username;
							verifyM2Access(userDetails);
						}

						return;
				}

				var type = contentType;
				if(!contentType)
				{
						type = "application/json";
				}

				makeServerCall(reqType,BaseURL+reqURL,reqdata,servercall_success,servercall_error,type);
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

	function verifyM2Access(userDetails)
	{

			var _onSuccess = function(response)
			{
					if(response.authenticated === "yes")
					{
							servercall_success(userDetails);
					}else {
							servercall_error("login_failed");
					}
			}

			var _onError = function(response,error,msg)
			{
					servercall_error(response);
			}

			BaseURL = URL+"/"+versionM2+"/"+server.reqdata.username+"/";
			authorization = userDetails.token_type;
			if(userDetails.access_token)
			{
				authorization = authorization+" "+userDetails.access_token;
			}
			makeServerCall(server.reqType,BaseURL+server.requestURL,"",_onSuccess,_onError);
	}

	function getAccessToken(clientData,code)
	{
			var _onSuccess = function(response)
			{
					verifyM2Access(response);
			}

			var _onError = function(response,error,msg)
			{
					servercall_error(response);
			}

			var data = "grant_type=authorization_code"
				+"&code="+code
				+"&client_id="+clientData.client_id
				+"&client_secret="+clientData.client_secret;

			makeServerCall("POST",URL+"/oauth2/token",data,_onSuccess,_onError);
	}

	function getAuthenticate(clientData) {

			var _onSuccess = function(redirectURL)
			{
					var token = getParameterByName("code",redirectURL);
					if(!token)
					{
						servercall_error("internal_error");
						return;
					}
					getAccessToken(clientData,token);
			}

			var url = URL+"/oauth2/token";
			getRedirectedUrl(url,_onSuccess);

	}

	function getAuthorizationCode(clientData)
	{
			var url = URL+"/oauth2/authorize?response_type=code&client_id="+clientData.client_id;

			if(!isRedirectUrlWorks())
			{
					var uname = encodeURIComponent(server.reqdata.username);
					var pwd = encodeURIComponent(server.reqdata.pwd);
					var params = "username="+uname+"&password="+pwd;

					var array = [url,URL+"/oauth2/token",params];
					URLRedirecter.redirect(
								function (redirectURL) {
										var token = getParameterByName("code",redirectURL);
										if(!token)
										{
											servercall_error("internal_error");
											return;
										}
										getAccessToken(clientData,token);
								},
								function(error)
								{
										var msg = "internal_error";
										onAuthorizationCodeSuccess(msg);
								},
								array
					);

					return;
			}
			var _onSuccess = function()
			{

			}

			var _onError = function(response,error,msg)
			{
					getAuthenticate(clientData);
			}

			makeServerCall("GET",url,"",_onSuccess,_onError);
	}

	function registerClient(token)
	{
			var _onSuccess = function(data)
			{
					var storage = window.localStorage;
					storage.setItem("clientData", JSON.stringify(data));
					getAuthorizationCode(data);
			}

			var _onError = function(response,error,msg)
			{
					servercall_error(response);
			}

			var obj = "initial_access_token="+token;
			makeServerCall("POST",URL+"/oauth2/register",obj,_onSuccess,_onError);
	}


	function getInitialTokenForClient()
	{
			var _onSuccess = function(redirectURL)
			{
					var token = getParameterByName("initial_access_token",redirectURL);
					if(!token)
					{
						servercall_error("internal_error");
					}
					registerClient(token);
			}

			var url = URL+"/oauth2/token";
			getRedirectedUrl(url,_onSuccess);
	}

	function getClientAuthenticatationSSO()
	{
			if(!isRedirectUrlWorks())
			{
					var uname = encodeURIComponent(server.reqdata.username);
					var pwd = encodeURIComponent(server.reqdata.pwd);
					var params = "username="+uname+"&password="+pwd;

					var array = [URL+"/oauth2/authorize?response_type=initial_token",URL+"/oauth2/token",params];
					URLRedirecter.redirect(
								function (redirectURL) {
										var token = getParameterByName("initial_access_token",redirectURL);
										if(!token)
										{
											servercall_error("internal_error");
										}
										registerClient(token);
								},
								function(error)
								{
										servercall_error("internal_error");
								},
								array

					);

					return;
			}

			var _onSuccess = function(data)
			{

			}

			var _onError = function(response,error,msg)
			{
					getInitialTokenForClient();
			}
			makeServerCall("GET",URL+"/oauth2/authorize?response_type=initial_token","",_onSuccess,_onError);
	}

	function authenticateBySSOEncryption()
	{
			var encryptSuccess = function(encryptedMessage)
			{
					server.reqdata.pwd = encryptedMessage;
					var storage = window.localStorage;
					var value = storage.getItem("clientData");
					if(value)
					{
							getAuthorizationCode(JSON.parse(value));
					}else {
							getClientAuthenticatationSSO();
					}
			}
			var encryptError = function(error)
			{
					servercall_error(error);
			}
			encryptMessage(server.reqdata.pwd,encryptSuccess,encryptError);
	}

	function encryptMessage(message,callBackSuccess,callBackError)
	{
			Encrypter.encryptMessage(
						function (encryptedMessage) {
								callBackSuccess(encryptedMessage);
						},
						function(error)
						{
								var msg = "internal_error";
								callBackError(msg);
						},
						message
			);
	}

	function getParameterByName(name, url) {
	    if (!url) return null;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function isRedirectUrlWorks()
	{
			var platform = device.platform;
			var version = device.version;

			if(platform === "Android" && parseInt(version) <5)
			{
				return false;
			}

			return true;
	}

	function getRedirectedUrl(url,callback)
	{
			var uname = encodeURIComponent(server.reqdata.username);
			var pwd = encodeURIComponent(server.reqdata.pwd);
			var params = "username="+uname+"&password="+pwd;

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
					callback(xhttp.responseURL);
				}else if(xhttp.readyState == 4 && xhttp.status == 200)
				{
					callback(null);
				}
			};
			xhttp.open("POST",url, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(params);
	}

});
