#FootballAPI_Frontend  
This is the front-end part of the FootballApplication.  
Firstly I built the API: https://github.com/aleksandromilenkov/FootballAPI with ASP.NET Web API  
With the help of React.js and TypeScript I built this app where you can Signup, Login, Logout, Search for Footballers, Search for Clubs, Search for Countries, Create all of the previous mentioned, Update, Delete...   
The purpouse of this app is simply to search Football Country Represetnations, Clubs, Players and see their details like where they Play, age, Country and more.   
I'm using protected routes so unauthorized users cannot get the data, you must first login.   
I'm using the following packages:  
  Axios - for better manipulating with my API  
  React-Router-Dom v6 - for navigating easily in the app  
  React-Spinners - for beautiful spinners while waiting when fetching the data  
  React-Toastify - for beautiful messages in the top right corner (either success or warning/error messages)  
  Yup - for validating forms in the frontend  

Here are some images from the app including some form validation when attempting to search country that not exists (There is not country with name England that has won 5 world cups):   

1. Home Page
   ![footballApp_home](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/adc1a7f7-7b27-40c6-a7ee-d47949392dfb)

2. Search Page
   ![footballApp_search](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/9ba3a985-674c-40b9-aaa7-3da10c44274d)

3. Footballer searched in the Search page: 
![footballerSearch](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/f71303c6-239f-49c7-aa3a-ffb3485637bb)

4. Club Search page
   ![footballApp_clubSearch](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/1bf3d7cd-c8ea-4c9b-9545-564879e4ad12)

5. Country Search failed:
   ![footballApp_CountrySearchFail](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/a335da5e-c2c6-4139-a96c-7ffa6b6143b7)

6. Country Search succeeded:
   ![footballApp_countrysearchsuccess](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/f8726378-d34c-4cb0-9077-e4162cf6dad9)

7. Create Footballer page:
   ![footballApp_createFootballer](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/373a535e-02a8-4d96-98c2-f914cc0913b0)

8. Create Country :
   ![footballApp_createCountry](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/f2d14a6c-a479-4e33-bf92-f44213752700)

9. Create Club:
    ![footballApp_createClub](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/d0b57468-d87e-4ad5-aef8-f65605c63a50)

10. Club Details page:
    ![footallApp_clubDetailsPage](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/3968c169-cef9-4355-bbb7-2a7821f3f69c)

11. Footballer Details page:
    ![footballApp_footballerDetail](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/468c8acb-f7c8-422b-9ee3-ae4fb7e0ea55)

12. Country Details page:
    ![footballApp_countryDetail](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/03c14d5d-bf04-481e-8840-012e2c6273fc)

13. Login page:
    ![footballApp_Login](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/ab0c379b-412e-40ba-89e0-e937ddd02a10)

14. Signup page:
    ![footballApp_signup](https://github.com/aleksandromilenkov/FootballAPI_Frontend/assets/64156983/d3fc8f33-a144-470b-b55e-c60d2c09b28c)
