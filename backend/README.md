# INMEANTYPESCRIPT

## INTRODUCTION
   *  This projects contains the boilerplate of any typescript backend projects. We can start the project from here only.
* functinality:
   * auth apis:
     1. signup,
     2. signin,
     3. forgotPassword
   * user apis:
     1. detail,
     2. update,
     3. list,
     4. delete
	   5. create
   * role apis:
     1. add,
     2. delete,
     3. list
	   4. update
   * permission apis:
     1. add,
     2. delete,
     3. list
	   4. update
* modules:
    * Crops Module - contains the crop crud apis functionality
    1. Create crop 
    2. Update crop
    3. Delete crop
    4. List crops
    * Crop Types Module - contains the crop type crud apis functionality
    1. Create crop type
    2. Update crop type
    3. Delete crop type
    4. List crop types
    * Area Module - contains the area crud apis functionality
    1. Create area
    2. Update area
    3. Delete area
    4. List areas
    * Farm Module - contains the farm crud apis functionality
    1. Create farm
    2. Update farm
    3. Delete farm
    4. List farms
    * Survey Module - contains the survey crud apis functionality
    1. Create survey
    2. Update survey
    3. Delete survey
    4. List surveys
    * Distillery Module - contains the distillery crud apis functionality
    1. Create distillery
    2. Update distillery
    3. Delete distillery
    4. List distilleries
    * Purchase Module - contains the purchase crud apis functionality
    1. Create purchase
    2. Update purchase
    3. Delete purchase
    4. List purchases
    * Payment Module - contains the payment apis functionality
    1. Create payment
    2. Delete payment
    * Area Number Module - contains the area number crud apis functionality
    1. Create area number
    2. Update area number
    3. Delete area number
    4. List area numbers
    * Send message on WhatsApp Module - contains the send message on WhatsApp apis functionality
    1. Send message on WhatsApp

## Prerequisites
1. Install Node.js
2. Install MongoDB
3. ts-node should be install globally (npm  i  g ts-node)

* versions:
    * Node: v16.0,
    * MongoDB: v5.0,
    * Express: ^4.0,
    * swagger-ui-express: "^4.3.0"

This project users the Node.js
* **M**ongoose.js (MongoDB): database
* **E**xpress.js: backend framework
* **N**ode.js: runtime environment

Other tools and technologies used:
* JSON Web Token: user authentication
* NodeMailer:email service
* bcrypt:password encryption
* swagger-ui-express:swagger ui
* express-basic-auth:Basic authentication

* How to run:
    * first you get the git code edit the ".env.{{development}}" based on your server setup environment and then use below command.
    * Use Command to run the code :
          1. From project root folder install all the dependencies: `npm i`,
          2. "npm run dev" for development setup,      
          3.  Now this app is  running on (http://localhost:4999/),
          4. swagger url : (http://localhost:4999/api-docs/#/) 
               * swaggerCredential
                  * userName : Admin,
                  * password : test@123,

## Logger
* Winston and morgan used for logger management.You can check logs at below path.
	1. Path : src/logs

## Default Role/Permission/User data
* Using below script we have created two role and users with permission.
	1. Path : src/migration/defaultData.ts

* roles detail
1. admin
2. user
* users detail
1. admin@infistack.com / admin@111
2. test@infistack.com / test@111

## Mongoose Connection
* You can find mongosb connection string from below path
1. Path : src/databases

## Const variable declaration
1. Environment valrialble file path : src/config
2. Constant variable file path : src/utils/const.ts
3. Error message file path : src/utils/en-in.ts
4. Endpoint file path : src/utils/endpoints.ts
