const routes = require("express").Router()

const SpotifyWebApi = require("spotify-web-api-node");









routes.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    const client_id = "bdd9da03ae0b4e068945d124833236e3";
    const client_secret = "c8134b1d8304455381ac20e549583a77";
  
    const spotifyApi = new SpotifyWebApi({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: "http://localhost:5173",
      refreshToken,
    });
    spotifyApi
      .refreshAccessToken()
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        });
  
        spotifyApi.setAccessToken(data.body["access_token"]);
      })
      .catch((err) => {
        console.log(err);
        res.status();
      });
  });
  
  routes.post("/login", (req, res) => {
    const code = req.body.code;
    const client_id = "bdd9da03ae0b4e068945d124833236e3";
    const client_secret = "c8134b1d8304455381ac20e549583a77";
  
    const spotifyApi = new SpotifyWebApi({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: "https://musicio-d325003c7109.herokuapp.com/",
    });
    console.log(code);
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status();
      });
  });
  module.export = routes