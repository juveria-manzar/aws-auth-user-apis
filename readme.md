## Serverless CRUD APIs with AWS Lambda functions and JWT authentication for runtime env Nodejs and DB MongoDb Atlas 
### Prerequisites
    - AWS Lambda Account
    - MongoDB Atlas Account
    - Node.js/npm installed
### Steps for implementation
    - Setting up AWS
        - in the AWS management Console, click on IAM
        - click on users tab
        - click on button add User and fill in the details
        - then enable Access Type> Programmatic access
        - proceed to Add Tags. Proceed to Review and then click Create User.

    - Setting up MongoDb  
        - On your account page and add a new organization.
        - Once the organization step is complete, click on create a new project.
        - Click the button Create Project. In order to create a new database instance, create a cluster 
        - Click on the button Build a Cluster, then choose a free-tier and then click on the button Create Cluster below. 
        - In the cluster create the database. add a collection Users in the database.

    - Setting up AWS in Nodejs Environment
          - On the CLI type the command: npm install -g serverless. This will install the serverless dependency globally
          - Run the command: sls config credentials --provider aws --key ACCESS_KEY --secret SECRET_KEY 
            With the access key and the secret key stored while creating the IAM user.
          - on the cli type the command: sls create -t aws-nodejs -p serverless-user-api && cd serverless-user-api
          This will create a aws-nodejs predefined boilerplate in a new directory assigned with the -p flag.
          - Next initialize the npm repository inside the serverless-user-api directory using the command: npm init -y
          - after initialization, add the necessary dependencies 
          - npm install --save bcryptjs bcryptjs-then jsonwebtoken mongoose

          - add a file named 'secrets.json' in the gitignore file.
          - to store environment variables create a file secrets.json and add the following piece of code 
                        {
                            "DB": "your connection string", // MongoDB Atlas connection string.
                            "JWT_SECRET": "your secret"
                        }
          - define the resources in serverless.yml. The serverless framework allows us to define resources and permissions right from the serverless.yml file.
          - define the handlers in the handler.js file or you can create directories on your own requirements and pass coorect path of handlers in the serverless.yml

          - to deploy use the command: sls deploy or serverless deploy.

##  End points generated
    - 6 endpoints generated, just as defined in the serverless.yml. /myProfile /updateUser cannot be accessed without authkey
    POST - https://2dwvrpfkm5.execute-api.us-east-1.amazonaws.com/dev/auth/login
    POST - https://2dwvrpfkm5.execute-api.us-east-1.amazonaws.com/dev/auth/register
    GET - https://2dwvrpfkm5.execute-api.us-east-1.amazonaws.com/dev/user/myprofile
    PUT - https://2dwvrpfkm5.execute-api.us-east-1.amazonaws.com/dev/user/updateUser
    GET - https://2dwvrpfkm5.execute-api.us-east-1.amazonaws.com/dev/user/allUsers
    GET - https://2dwvrpfkm5.execute-api.us-east-1.amazonaws.com/dev/user/aUser/{id}

                  