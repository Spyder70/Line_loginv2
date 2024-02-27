import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const LineLogin = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
          const tokenParams = {
            grant_type: 'authorization_code',
            client_id: "2003300966", 
            client_secret: "0265d79808b6cc1b9d8c1d0e30e2d125", 
            redirect_uri: "http://localhost:5173/auth/callback", 
            code,
          };

          const tokenResponse = await axios.post(
            'https://api.line.me/oauth2/v2.1/token',
            qs.stringify(tokenParams),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          const { access_token } = tokenResponse.data;

          const profileResponse = await axios.get('https://api.line.me/v2/profile', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          const userProfile = profileResponse.data;
          setUserProfile(userProfile);
        }
      } catch (error) {
        console.error('Error during authentication callback:', error);
      }
    };

    handleAuthCallback();
  }, []);

  const handleLogin = () => {
    const params = {
      response_type: 'code',
      client_id: "2003300966", 
      redirect_uri: "http://localhost:5173/auth/callback",
      state: 'random_state_string', // optional
      scope: 'profile openid email', // specify required scopes
    };
    const queryParams = qs.stringify(params);
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?${queryParams}`;
  };

  return (
    <div>
      <h1>Line Login</h1>
      {!userProfile ? (
        <button onClick={handleLogin}>Login with Line</button>
      ) : (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userProfile.displayName}</p>
          <p>Picture: <img src={userProfile.pictureUrl} alt="User Picture" /></p>
        </div>
      )}
    </div>
  );
};

export default LineLogin;
