define (function (require) {

	var server={requestURL:"", reqType:"",reqdata:"",callBackSuccess:""};
	var URL= "http://vmisupdnatap/metricstream/m2";
	var versionM2 = "2.3";
	var BaseURL;
	var authorization;

	var servercall_success = function(msg)
	{
		try{

			server.callBackSuccess(msg);

		}catch(e){

		}
	};

	var servercall_error = function(msg)
	{

	};

	var cancel =  function()
	{
	};

	var call_backed_service = function()
	{
		serverCall.connectServer(server.reqType,server.requestURL,server.reqdata,server.callBackSuccess);
	};


	var serverCall = {

		connectServer:function (reqType,reqURL,reqdata,successFunction)
		{
			try
			{
				if(reqURL=="handshake")
				{
						BaseURL = URL+"/"+versionM2+"/"+reqdata.username+"/";
						authorization = reqdata.pwd;
						reqdata = "";
				}
				var Type = reqType;
				var ServiceUrl = BaseURL+reqURL;
				var varData = reqdata;
				var ContentType = "application/json";
				var DataType = "JSON";
				var ProcessData = false;

				server.reqType = reqType;
				server.reqdata = reqdata;
				server.callBackSuccess = successFunction;
				server.requestURL = reqURL;
				var timeout_server = 60000;


				$.ajax({
					beforeSend			:  function (xhr){
																xhr.setRequestHeader('authorization', authorization);
																xhr.setRequestHeader('access-control-allow-origin','*');
														},
					cache						: false,
					complete				: function (xhr) {},
					type            : Type, //GET or POST or PUT or DELETE verb
					url             : ServiceUrl, // Location of the service
					data            : varData, //Data sent to server
					contentType     : ContentType, // content type sent to server
					dataType        : DataType, //Expected data format from server
					processdata     : ProcessData, //True or False
					timeout			    : timeout_server,
					xhrFields       : {withCredentials: true},
					success         : servercall_success,
					error						: servercall_error,

				});
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

});
