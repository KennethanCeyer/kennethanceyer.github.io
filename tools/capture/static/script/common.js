var domain = 'http://www.interface-ent.com';

function signinWithFacebook(callback) {
	FB.login(function(response) {
		if (response.session) {
			try {
				var userid = response.authResponse.userID || '';
				var accessToken = response.authResponse.accessToken || '';
			} catch(e) { ; }
			FB.api('/me', function(response) {
					callback({userid: userid, accessToken: accessToken, name: response.name, email: response.email, pic: 'http://graph.facebook.com/' + userid + '/picture?type=large'});
			});
		} else {
			if(typeof response !== 'undefined') {
				try {
					var userid = response.authResponse.userID || '';
					var accessToken = response.authResponse.accessToken || '';
				} catch(e) { ; }
				FB.api('/me', function(response) {
					callback({userid: userid, accessToken: accessToken, name: response.name, email: response.email, pic: 'http://graph.facebook.com/' + userid + '/picture?type=large'});
				});
			} else {
				alert('예기치 않은 문제가 발견되었습니다.\r\n다시 시도해주세요.');
				location.reload();
			}
		}
	}, {
		scope: 'email,publish_actions',
		return_scopes: true
	});
}