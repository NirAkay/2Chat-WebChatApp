# TM2part3

## How to start

First clone our project by the shell command git clone https://github.com/NirAkay/TM2part3.git. Then open a new folder, open a cmd/shell from within the new folder and install a new React application on this directory using `npx create-react-app ex2` command. Then, move to the directory(the app one) by the shell command cd ex2.
Afterward, copy the src and public files from the cloened folder into your ex2 directory and replace src and public folders with ours.
Now, install some React things by the command `npm i react-router-dom`, `npm i socket.io-client`. now copy the server folder near to the Ex2 folder then cd server and now we should use some installs here. `npm i express`, `npm i socket.io`, `npm i mongodb`, `npm i jsonwebtoken`, `npm i body-parser`, `npm i socket.io-client`.<br />
the server you start with the command `node app.js` from the server folder.<br />
the client you start with the command `npm statr` from the ex2 folder.<br />

## Descreption -
in this part we take our project from the last part and make him to work with server. also we use Mongodb database that will work with the server and help us the save data about our users.<br />

### Register -

in the `register` the client only validate if the field are right (see the previous part to know what is our valdittions). and in the server we check if the username is already exist in our database. if all the fields are valids and the `username` doesn't exist in the database the web will transfer to the `login` page.<br />

### Login -

in the `login` the client will insert his `username` and `password` and this field will transfer to the server. if this fields exist in the database the server the web will transfer to the `Chat` page, otherwise a message `Username or Password are incorrect. please try again.` will apear in the page.<br />

### Chat -

in the `chat` the client will add conatcts and if they are exist in the database the contact will add to the list of contacts. when the user sent a message to this contact the message he sent will transfer to the database and then will transfer to this contact. our user will recive the messages in the moment his contact sent to him.<br />

### Server - 
the server will run endlesslesy and respone to requests of the users that connects to him. the server is responsible to send messages to the contacts in the ot![chat1](https://github.com/NirAkay/TM2part3/assets/117992376/08c7d500-6c2f-4997-b5d7-ad75e5743375)
her side of the chat.<br /> 

![chat1](https://github.com/NirAkay/TM2part3/assets/117992376/068151da-a65a-4728-963c-5085967a3fdf)
![chat2](https://github.com/NirAkay/TM2part3/assets/117992376/6ca80ccd-6c4c-4dac-bfed-4fd7d4da45d1)
![chat 3](https://github.com/NirAkay/TM2part3/assets/117992376/e4850fc7-1351-4764-8e8c-6c8de934a664)
![chat4](https://github.com/NirAkay/TM2part3/assets/117992376/f1dea50b-78f0-4cb6-946e-6a7895470e53)
![chat5](https://github.com/NirAkay/TM2part3/assets/117992376/651cd676-22c4-4250-a582-6d8a49dc2da5)



