import express from "express";
import cors from "cors";

const app = express();
const PORT = 7000;

const apiRouter = express.Router();
app.use(cors());
app.use(express.json());

const alldata = [{
    "name": "Solar",
    "power": 20,
    "datetime": "2024-03-2612:00-00"
  },
  {
    "name": "Load",
    "power": 7,
    "datetime": "2024-03-2612:00-00"
  },
  {
    "name": "Battery",
    "power": 5,
    "datetime": "2024-03-2612:00-00"
  },
  {
    "name": "EV",
    "power": 6,
    "datetime": "2024-03-2612:00-00"
  }]

// GET method
apiRouter.get('/getdata', async (req, res) => {
    res.json(alldata);
})

app.use('/api', apiRouter);
app.listen(PORT, ()=> console.log("Server is running on : ", PORT));