const app=require('C:/Users/Asela/OneDrive/Documents/Research Project Management Tool/af-assignment02/project_management-server/createNewServer.js');
const request=require('supertest');
const mongoose=require('mongoose');
const dotenv=require("dotenv");
require("dotenv").config();

const URL=process.env.MONGODB_URL;

jest.setTimeout(3600);


describe("Geting Markingschemes",()=>{

    beforeAll(async()=>{
  
        mongoose.connect(URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      })
    
      afterAll(async ()=>{
        await mongoose.connection.close();
      });

    describe("Get all the markignschemes",()=>{
  
      describe("Error with getting markignschemes",()=>{
        it("Should return status as 404",async()=>{
  
          await request(app).get('/markingSchem').expect(404);
        })
      });

      describe("Getting all markignschemes with the correct way",()=>{
        it("Should return status as 200",async()=>{
  
            const { statusCode, body }= await request(app).get('/markingScheme/');

            expect(statusCode).toBe(200);   
            expect(body).toEqual([
                {
                    "EvaluationDocumentName": expect.any(String), 
                    "markingPaper": expect.any(String), 
                    "__v": 0, 
                    "_id": expect.any(String)
                 }]);
        });
      });

    });
  
  });