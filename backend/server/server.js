const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/db.config");

require("dotenv").config();
const SERVER_PORT = 8081;

dbConnection();
app.use(cors({ origin: "*" }));
app.use(express.json());

// user
app.use("/user", require("./routes/user/userLogin"));
app.use("/user", require("./routes/user/userSignUp"));
app.use("/user", require("./routes/user/users"));
app.use("/user", require("./routes/user/userGetUserById"));
app.use("/user", require("./routes/user/userEditUser"));
app.use("/user", require("./routes/user/userDeleteAll"));

// Comment
app.use("/comment", require("./routes/comment/comments"));
app.use("/comment", require("./routes/comment/commentGetByUsername"));
app.use("/comment", require("./routes/comment/commentGetByUserId"));
app.use("/comment", require("./routes/comment/commentAddByUsername"));
app.use("/comment", require("./routes/comment/commentAddByUserId"));

// Friends
app.use("/friend", require("./routes/friend/friendAddByUserId"));
app.use("/friend", require("./routes/friend/friendAddByUsername"));
app.use("/friend", require("./routes/friend/friendDeleteByUserId"));
app.use("/friend", require("./routes/friend/friendDeleteByUsername"));
app.use("/friend", require("./routes/friend/friendGetByUserId"));
app.use("/friend", require("./routes/friend/friendGetByUsername"));
app.use("/friend", require("./routes/friend/friends"));

// Favriote Line
app.use(
    "/favoriteLine",
    require("./routes/favoriteLine/favoriteLineAddByUsername")
);
app.use("/favoriteLine", addFavoriteLineByUserIdRoute);
// app.use("/favoriteLine", deleteFavoriteLineByUsernameRoute);
// app.use("/favoriteLine", deleteFavoriteLineByUserIdRoute);
// app.use("/favoriteLine", getFavoriteLineUsernameRoute);
// app.use("/favoriteLine", getFavoriteLineUserIdRoute);

app.listen(SERVER_PORT, (req, res) => {
    console.log(
        `The backend service is running on port ${SERVER_PORT} and waiting for requests.`
    );
});
