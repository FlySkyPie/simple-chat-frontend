import express from 'express';
import cors from 'cors';
import { ChatGPTAPI } from 'chatgpt'
import { config } from 'dotenv';

config();

const api = new ChatGPTAPI({
    sessionToken: process.env.accessToken
});
const conversation = api.getConversation();


export const createAPIServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.post("/", async (req, res) => {
        const response = await conversation.sendMessage(req.body.context);
        res.send(response);
    });

    app.listen(8181, () => {
        console.log(`server started on port ${8181}`);
    });
}