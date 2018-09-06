Full Stack Pokemon Game
===
* Updated previous pokemon game project that was a C++ command-line based into a web based application using React & Redux<br />
* UI allows users to select a team of pokemon to battle and level up as they win games<br />
* Google Auth so users can select and keep their pokemon within the players account<br />
* Includes battle components such as healthpoints, moves, element types, damage points, dynamic texts<br />
* Pokemon, moves, & users are stored in the back-end with MongoDB<br />
* Versus computers that can autonomously determine the best attack to use based on general pokemon strategy<br />
[Check out the site here!](https://whispering-savannah-71164.herokuapp.com/)<br />
Steps required
1. create a dev.js file with the required api keys for google, mongo, and cookie. In the file you'll need the following in the module.exports:<br />
* googleClientID<br />
* googleClientSecret<br />
* mongoURI<br />
* cookieKey<br />
2. In the terminal execute <br />
```
npm install --save less less-loader react-bootstrap
npm run dev
```
