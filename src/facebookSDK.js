import React, { useEffect } from 'react';

const FacebookSDK = () => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1981641885630550', // Thay bằng appId của bạn
        cookie: true,
        xfbml: true,
        version: 'v2.7' // Thay bằng api-version như 'v10.0'
      });

      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return null; // Không cần render gì
};

export default FacebookSDK;
