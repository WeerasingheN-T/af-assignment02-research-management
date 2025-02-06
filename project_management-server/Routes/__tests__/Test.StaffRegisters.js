let StaffRegister=require("../../Models/StaffRegister.js");
const app=require('C:/Users/Asela/OneDrive/Documents/Research Project Management Tool/af-assignment02/project_management-server/createNewServer.js');
const request=require('supertest');
const mongoose=require('mongoose');
const dotenv=require("dotenv");
require("dotenv").config();

const URL=process.env.MONGODB_URL;

jest.setTimeout(3600);

 const staffmember={
  staffFirstName:"nimal",
  staffLastName:"senewiratne",
  staffId:"E2029",
  imageFiles:"461c9b99-6d57-40a6-8a95-ee5f516983d3-1653723602687.jpg",
  staffPosition:"Co-supervisor",
  staffEmail:"nimal123@gmail.com",
  staffPassword:"nimal123"
}

const login={
  email:'nimal124@gmail.com',
  password:'nimal124'
}

const incorrectemail={
  email:'nimal126@gmail.com',
  password:'nimal124'
}

const incorrectPassword={
  email:'nimal124@gmail.com',
  password:'nimal126'
}

describe("Staff Register",()=>{
  beforeAll(async()=>{
  
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  })

  afterAll(async ()=>{
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

 describe("Login Staff route",()=>{
    describe("Given the staff member is not loggin",()=>{
      it("Shuold return status as 404 if the given email is not found",async()=>{
           
           await request(app).post('/staffRegister/login').send(incorrectemail).expect(404);
      })

      it("Shuold return status as 400 if the given password is not match",async()=>{
           
        await request(app).post('/staffRegister/login').send(incorrectPassword).expect(400);
      })

      it("Shuold return status as 404 if do not given the email and password",async()=>{
           
        const { statusCode } =await request(app).post('/staffRegister/login');
        expect(statusCode).toBe(404);
      })
    })

    describe("Given the staff member is loggin",()=>{
      it("Shuold return status as 200 if login is succes",async()=>{
           
           await request(app).post('/staffRegister/login').send(login).expect(200);
      })
    })
  });

  describe("Get staff register route",()=>{

    describe("Error with get user",()=>{
      it("Should return status as 500",async()=>{
        const _Id='E2029';

        await request(app).get(`/staffRegister/get/staffMember/${_Id}`).expect(500);
      })
    });

    describe("Staff Member found",()=>{
      it("Should return status as 200 and the staff member",async()=>{

        const _Id='6291d1d219492dfe3d67c391';

        await request(app).get(`/staffRegister/get/staffMember/${_Id}`).expect(200);
      })
    });
  });

  describe("Get user by Email",()=>{
    describe("Error with get user by email",()=>{
      it("Shuold return status as 500",async()=>{

        const email='nimal126@gmail.com';
           
          await request(app).get(`/staffRegister/get/${email}`).expect(500);
      })
    })

    describe("Staff member found by email",()=>{
      it("Shuold return status as 200",async()=>{

        const email='nimal124@gmail.com';
           
          await request(app).get(`/staffRegister/get/${email}`).expect(200);
      })
    })
  })

});

