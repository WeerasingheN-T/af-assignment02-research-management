const app=require('C:/Users/Asela/OneDrive/Documents/Research Project Management Tool/af-assignment02/project_management-server/createNewServer.js');
const request=require('supertest');
const mongoose=require('mongoose');
const dotenv=require("dotenv");
require("dotenv").config();

const URL=process.env.MONGODB_URL;

jest.setTimeout(3600);


describe("Evaluated presentation marks",()=>{

    beforeAll(async()=>{
  
        mongoose.connect(URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      })
    
      afterAll(async ()=>{
        await mongoose.connection.close();
      });

    describe("Get all evaluated presentation marks",()=>{
  
      describe("Error with getting all marks",()=>{
        it("Should return status as 404",async()=>{
  
          await request(app).get('/presentationSchem').expect(404);
        })
      });

      describe("Getting all marks",()=>{
        it("Should return status as 200",async()=>{
  
            const { statusCode, body }= await request(app).get('/presentationScheme');

            expect(statusCode).toBe(200);   
            expect(body).toEqual([
                {
                    "Nevaluate": expect.any(String), 
                    "Pmark": expect.any(String), 
                    "__v": 0, 
                    "_id": expect.any(String)
                 }]);
        });
      });

    });

    describe("Delete evaluated presentation marks",()=>{
  
        describe("Error with deletion of marks",()=>{
          it("Should return status as 500",async()=>{

            const _id='729fgfgfgfg';
    
            await request(app).delete(`/presentationScheme/delete/${_id}`).expect(500);
          })
        });
  
         describe("Deleting the given marks as expected",()=>{
          it("Should return status as 200",async()=>{

            const _id='62979fdb36b4744cdf1333ba';
    
             await request(app).delete(`/presentationScheme/delete/${_id}`).expect(200);
          });
          });
 
      })
  
  });