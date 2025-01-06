import 'dotenv/config'
import { createResponse, createTxtAnswer, startUdpServer } from "denamed"
import {GoogleGenerativeAI} from "@google/generative-ai"

;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
startUdpServer(
   async(query) => {
    //   console.log(query);
        const question = query.questions[0];
        console.log(question);
        const prompt=`
        Answer the following question in one word or sentence
        Question:${question.name.split('.').join('')}`;
        const result = await model.generateContent(prompt);
      return   createResponse(query,[createTxtAnswer(question, result.response.text())]);
    },
    {
      port: 53,
    }
  );
  