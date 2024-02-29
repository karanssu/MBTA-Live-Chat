const express = require("express");
const app = express();
const cors = require("cors");
const loginRoute = require("./routes/user/userLogin");
const getAllUsersRoute = require("./routes/user/users");
const registerRoute = require("./routes/user/userSignUp");
const getUserByIdRoute = require("./routes/user/userGetUserById");
const addCommentByUsernameRoute = require("./routes/comment/commentAddByUsername");
const addCommentByUserIdRoute = require("./routes/comment/commentAddByUserId");
const getAllCommentsRoute = require("./routes/comment/comments");
const getCommentByUsernameRoute = require("./routes/comment/commentGetByUsername");
const getCommentByUserIdRoute = require("./routes/comment/commentGetByUserId");
const dbConnection = require("./config/db.config");
const editUser = require("./routes/user/userEditUser");
const deleteUser = require("./routes/user/userDeleteAll");
const addFriendByUserIdRoute = require("./routes/friend/friendAddByUserId");
const addFriendByUsernameRoute = require("./routes/friend/friendAddByUsername");
const deleteFriendByUserIdRoute = require("./routes/friend/friendDeleteByUserId");
const deleteFriendByUsernameRoute = require("./routes/friend/friendDeleteByUsername");
const getFriendByUserIdRoute = require("./routes/friend/friendGetByUserId");
const getFriendByUsernameRoute = require("./routes/friend/friendGetByUsername");
const getAllFriendsRoute = require("./routes/friend/friends");

require("dotenv").config();
const SERVER_PORT = 8081;

dbConnection();
app.use(cors({ origin: "*" }));
app.use(express.json());

// user
app.use("/user", loginRoute);
app.use("/user", registerRoute);
app.use("/user", getAllUsersRoute);
app.use("/user", getUserByIdRoute);
app.use("/user", editUser);
app.use("/user", deleteUser);

// Comment
app.use("/comment", getAllCommentsRoute);
app.use("/comment", getCommentByUsernameRoute);
app.use("/comment", getCommentByUserIdRoute);
app.use("/comment", addCommentByUsernameRoute);
app.use("/comment", addCommentByUserIdRoute);

// Friends
app.use("/friend", addFriendByUserIdRoute);
app.use("/friend", addFriendByUsernameRoute);
app.use("/friend", deleteFriendByUserIdRoute);
app.use("/friend", deleteFriendByUsernameRoute);
app.use("/friend", getFriendByUserIdRoute);
app.use("/friend", getFriendByUsernameRoute);
app.use("/friend", getAllFriendsRoute);


// Favriote Line
app.use("/favoriteLine", addFavoriteLineByUsernameRoute);
app.use("/favoriteLine", addFavoriteLineByUserIdRoute);
app.use("/favoriteLine", deleteFavoriteLineByUsernameRoute);
app.use("/favoriteLine", deleteFavoriteLineByUserIdRoute);
app.use("/favoriteLine", getFavoriteLineUsernameRoute);
app.use("/favoriteLine", getFavoriteLineUserIdRoute);

app.listen(SERVER_PORT, (req, res) => {
    console.log(
        `The backend service is running on port ${SERVER_PORT} and waiting for requests.`
    );
});
