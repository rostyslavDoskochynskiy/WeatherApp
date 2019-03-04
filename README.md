1) Run app with npm start
2) When app is loaded you have to sign up and sign in.
    You may use these credentials for both or another you want:
       login - test1@gmail.com,
        password - testpassword123
        

3)  When you are signed in you need to press OK or close icon and allow us to get your current location.
    Then you will see your current location.

4) If you tap on the input in the header you will see autocomplete to select specify city to know its weather data.
    If city was not found you see Error Modal with error message.    
 
5) When you are on the some city screen and if you want to return to your current location screen, tap icon in the header.

In this project I use:

1) Ant design - for material ui
2) Axios - for http requests,
3) Redux - for storing data,
3) https://cors-anywhere.herokuapp.com/ - for getting at least temporary CORS for my request
4) https://www.metaweather.com/api/ - for getting the weather data,
5) https://geoip-db.com/json/ - for getting current location data 