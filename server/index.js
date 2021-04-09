const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/index")
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// 중복이름 방어
app.use(hpp());
// 보안을 위해 설정
app.use(helmet());
// CORS = Cross Origin Resource Sharing : 교차 자원 공유 
app.use(
    cors({
        origin: true,
        credentials: true
    })
)

app.use(morgan("dev"));
// body-parser
// POST 통신시, data 를 주고받지 x
app.use(express.json());

const {MONGO_URI,PORT} = config;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log(`mongodb connecting sucess`);
})
.catch((err) => {console.log(err);
})

app.use("/api/user",require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT} port`);
})