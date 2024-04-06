const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/db.config");

require("dotenv").config();
const SERVER_PORT = 8081;

const CHAT_SERVER_PORT = 2000;
const io = require("socket.io")(CHAT_SERVER_PORT, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:8081"],
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);
});

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
app.use("/comment", require("./routes/comment/commentGetByUserId"));
app.use("/comment", require("./routes/comment/commentGetByTrainLine"));
app.use("/comment", require("./routes/comment/commentAddByUserId"));

// Friends
app.use("/friend", require("./routes/friend/friendAddByUserId"));
app.use("/friend", require("./routes/friend/friendDeleteByUserId"));
app.use("/friend", require("./routes/friend/friendGetByUserId"));
app.use("/friend", require("./routes/friend/friends"));

// Train Line
app.use("/trainLine", require("./routes/trainLine/trainLines"));

// Favriote Line
app.use(
    "/favoriteLine",
    require("./routes/favoriteLine/favoriteLineAddByUserId")
);
app.use(
    "/favoriteLine",
    require("./routes/favoriteLine/favoriteLineDeleteByUserId")
);
app.use(
    "/favoriteLine",
    require("./routes/favoriteLine/favoriteLineGetByUserId")
);

app.listen(SERVER_PORT, (req, res) => {
    console.log(
        `The backend service is running on port ${SERVER_PORT} and waiting for requests.`
    );
});
