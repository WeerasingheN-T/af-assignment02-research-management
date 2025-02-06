const app=require('C:/Users/Asela/OneDrive/Documents/Research Project Management Tool/af-assignment02/project_management-server/createNewServer.js');
const request=require('supertest');
const mongoose=require('mongoose');
const dotenv=require("dotenv");
require("dotenv").config();

const URL=process.env.MONGODB_URL;

jest.setTimeout(3600);

const studentTopic={
    GroupId:'Group2_Research_SE',
    LeaderEmail:'ththweerasinghe@gmail.com',
    GroupDetails:'kamal senewiratne-IT28903451,kamal senewiratne-IT28903451,kamal senewiratne-IT28903451,kamal senewiratne-IT28903451',
    ResearchTopic:'SE Research'
}

const incorrectTopic={
    GroupId:'Group2_Research_SE',
    LeaderEmail:'',
    GroupDetails:'kamali senewiratne-IT28903451,kamali senewiratne-IT28903451,kamali senewiratne-IT28903451,kamali senewiratne-IT28903451',
    ResearchTopic:''
}

const correctTopic={
    GroupId:'Group2_Research_SE',
    LeaderEmail:'kamali@gmail.com',
    GroupDetails:'kamali senewiratne-IT28903451,kamali senewiratne-IT28903451,kamali senewiratne-IT28903451,kamali senewiratne-IT28903451',
    ResearchTopic:'Se Reserach'
}

describe("Student research topics registration",()=>{

    beforeAll(async()=>{
  
        mongoose.connect(URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      })
    
      afterAll(async ()=>{
        await mongoose.connection.close();
      });

    describe("Adding student research topics",()=>{
  
      describe("Adding a Leader email which have already been used,with other data",()=>{
        it("Should return status as 500",async()=>{
  
          const {body,statusCode}= await request(app).post('/studentTopic/add').send(studentTopic);
          expect(statusCode).toBe(500);
          expect(body).toEqual({"message":expect.any(String)});
        });
      });

      describe("Adding a research topic by not giving all required details ",()=>{
        it("Should return status as 500",async()=>{
  
          await request(app).post('/studentTopic/add').send(incorrectTopic).expect(500);
        });
      });

      describe("Adding a research topic by giving all required details ",()=>{
        it("Should return status as 200",async()=>{
  
          await request(app).post('/studentTopic/add').send(correctTopic).expect(200);
        });
      });

    });

    describe("Getting student research topics",()=>{
  
        describe("Getting research topics by using incorrect url",()=>{
          it("Should return status as 404",async()=>{
    
           await request(app).get('/studentTopi/').expect(404);
          });
        });
  
        describe("Getting research topics by using correct url",()=>{
          it("Should return status as 200",async()=>{
    
            await request(app).get('/studentTopic/').expect(200);
          });
        });
  
      });

      describe("Sending research topic confirmation emails to students",()=>{
  
        describe("Send a email to a email which is not found ",()=>{
          it("Should return status as 404",async()=>{

            const email='thtweerasinghe@gmail.com';
    
           await request(app).get(`/studentTopic/sendemail/${email}`).expect(404);
          });
        });
  
        describe("Send a email to a given valid email ",()=>{
            it("Should return status as 200",async()=>{
  
              const email='ththweerasinghe@gmail.com';
      
             await request(app).get(`/studentTopic/sendemail/${email}`).expect(200);
            });
          });
  
      });
  
  });