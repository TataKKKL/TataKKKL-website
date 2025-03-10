# Log


## 2025-03-10, Monday
### 1. deploy backend as ECS service [todo]
```
danqingzhang@Danqings-MBP GitIssuePulse % curl -N http://3.231.212.90:3000/api/sse/events
data: {"type": "connection", "message": "Connected to SSE"}

data: {"type": "ping", "message": "Server heartbeat", "timestamp": "2025-03-10T07:12:31.026728"}

data: {"type": "ping", "message": "Server heartbeat", "timestamp": "2025-03-10T07:12:32.027259"}

data: {"type": "ping", "message": "Server heartbeat", "timestamp": "2025-03-10T07:12:33.028559"}

data: {"type": "ping", "message": "Server heartbeat", "timestamp": "2025-03-10T07:12:34.029738"}

data: {"type": "ping", "message": "Server heartbeat", "timestamp": "2025-03-10T07:12:35.031899"}
```

### 2. frontend
https://github.com/TataKKKL/GitIssuePulse/commit/1187c88c2d8e7b84d91a89fc7354445f16f96473

## 2025-03-01, Saturday
### deploy backend as ECS service [todo]
```

## 1. docker 


docker build --platform linux/arm64 -t github-issue-pulse-fastapi-backend .
docker run -p 3000:3000 --name github-issue-pulse-fastapi-backend github-issue-pulse-fastapi-backend

## 2. ECR
1. Create a New ECR Repository (if not created)
aws ecr create-repository --repository-name github-issue-pulse-fastapi-backend --region us-east-1

aws sts get-caller-identity --query Account --output text

2. Authenticate Docker with ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin 010526261030.dkr.ecr.us-east-1.amazonaws.com

3. Build and Tag Your Docker Image
docker tag github-issue-pulse-fastapi-backend:latest \
  010526261030.dkr.ecr.us-east-1.amazonaws.com/github-issue-pulse-fastapi-backend:latest

4. Push to ECR
docker push 010526261030.dkr.ecr.us-east-1.amazonaws.com/github-issue-pulse-fastapi-backend:latest

## 3. ECS task definition & ECS task
check task -> networking -> security group -> inbound rule -> 3000


curl -X GET http://52.91.190.248:3000/api/hello

curl -X GET http://52.91.190.248:3000/api/sse/events

## 4. ECS service
* ECS service
* DNS

## 5. autoscaling
```
### add pages on frontend to connect to backend [todo]

## 2025-02-28, Friday
### 1. Enable autoscaling again


### 2. backend code for sse [done]
https://git-issue-pulse.vercel.app/testing1

SSE implementation allows clients to:
* Establish a persistent connection with a single HTTP request
* Receive a stream of events from the server in real-time
* Get automatic reconnection (handled by the EventSource API in browsers)

```
curl -N http://localhost:3000/api/sse/events
data: {"type":"connection","message":"Connected to SSE"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:45.225Z"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:46.226Z"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:47.227Z"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:48.229Z"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:49.231Z"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:50.231Z"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:51.233Z"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:52.233Z"}

data: {"type":"ping","message":"Server heartbeat","timestamp":"2025-02-28T21:12:53.234Z"}
```

* resource management with SSE connection
optimizes resource usage by only running the ping interval when clients are connected

### 3. simple backend code for websocket [done]
https://git-issue-pulse.vercel.app/testing2

```
## step 1: local testing

## step 2: local testing

## step 3: docker based testing
```

### 4. python version of backend code [done]
```
## step 1: create virtual environment
python3.11 -m venv venv
. venv/bin/activate
pip install -e .

## step 2: run the server
uvicorn app.main:app --reload

uvicorn app.main:app --port 3000 --reload

## step 3: build docker image
# Build the Docker image
docker rm fastapi-app
docker build -t fastapi-backend .

# Run the container
docker run -p 3000:3000 --name fastapi-app fastapi-backend
```

### 5. deploy python version of backend code to fargate, ECS task [todo]

### 6. backend code for websocket
* simple chat app: https://git-issue-pulse.vercel.app/chatbot
    * supabase for authentication
        * add login page, similar to e-lirary demo
        * chat page is protected
    * websocket for real-time communication
        * openai api for chat: only send the current conversation context to OpenAI for generating responses.
    * supabase for database
    * aws ecs service instead of vercel backend
    

### 6. backend code for webhook + sse
build locally with docker
```
npm install
npm run build
npm start
```
* simple dashboard: https://git-issue-pulse.vercel.app/github-issues-dashboard
    * auth with github




## 2025-02-27, Thursday
https://github.com/TataKKKL/GitIssuePulse/tree/main/core-api-backend
* finish github issues pulse website, move backend to fargate
    * docker [done]
    * ECR
    * ECS
    * Fargate
    * ALB

### Migrate the backend to fargate
* step 1: docker
```
docker build --platform linux/arm64 -t github-issue-pulse-backend .
docker run -p 3000:3000 github-issue-pulse-backend
``` 
test the hello endpoint:
```
curl -X GET http://localhost:3000/api/hello
{"name":"John Doe"}%
``` 
* step 2: ECR
```
1. Create a New ECR Repository (if not created)
aws ecr create-repository --repository-name github-issue-pulse-backend --region us-east-1


aws sts get-caller-identity --query Account --output text

2. Authenticate Docker with ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin 010526261030.dkr.ecr.us-east-1.amazonaws.com

3. Build and Tag Your Docker Image
docker tag github-issue-pulse-backend:latest \
  010526261030.dkr.ecr.us-east-1.amazonaws.com/github-issue-pulse-backend:latest


4. Push to ECR
docker push 010526261030.dkr.ecr.us-east-1.amazonaws.com/github-issue-pulse-backend:latest
```
* step 3: ECS
```
1. Create a new ECS cluster
aws ecs list-clusters

2. Create an ECS Task Definition
be careful about network port
also select linux/arm64
```
* step 4: Run a one-off task
```
security group add the port 3000: add inbound rule

get the public ip address and run below command

curl -X GET http://54.227.4.14:3000/api/hello
{"name":"John Doe"}% 
```

* step 5: ECS service: ALB
```
Container: github-issue-pulse-backend-macbook 3000:3000

The format (Host Port : Container Port) means:
Container Port (3000): Your Express backend listens on this.
Host Port (should be left blank for AWS Fargate).

✅ Correct ALB Configuration
Option 1 (Recommended)
ALB Listener Port: 80 (Standard HTTP)
Target Group Forwarding to ECS: 3000 (Matches container port)
💡 This allows requests like:

curl -X GET http://your-alb-dns/api/hello
without needing :3000 in the URL.

Option 2 (If You Want to Use 8000)
ALB Listener Port: 8000
Target Group Forwarding to ECS: 3000
💡 Use this if clients expect to call http://your-alb-dns:8000/api/hello.

after you click creating the service, you can CloudFormation/Stack to see the service
```

test
```
curl -X GET http://github-issue-pulse-alb-1297267319.us-east-1.elb.amazonaws.com/api/hello
{"name":"John Doe"}
```

* step 6: 

```
Step 1: Enable Auto Scaling to Reduce Tasks to Zero
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/fargate-cluster/github-issue-pulse-service \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 0 \
  --max-capacity 5

{
    "ScalableTargetARN": "arn:aws:application-autoscaling:us-east-1:010526261030:scalable-target/0ec525bfd96f74ae411ca3d95e406f071ec9"
}


Step 2: Set Up Auto Scaling Policy: ALB Request Count-Based Scaling

aws elbv2 describe-load-balancers --query "LoadBalancers[*].[LoadBalancerName, LoadBalancerArn]" --output json

[
    [
        "github-issue-pulse-alb",
        "arn:aws:elasticloadbalancing:us-east-1:010526261030:loadbalancer/app/github-issue-pulse-alb/ad6fd073e19f0ac6"
    ]
]

aws elbv2 describe-target-groups --query "TargetGroups[*].[TargetGroupName, TargetGroupArn]" --output json

[
    [
        "ecs-fargat-github-issue-pulse-se",
        "arn:aws:elasticloadbalancing:us-east-1:010526261030:targetgroup/ecs-fargat-github-issue-pulse-se/09a2c50ea833a017"
    ]
]


aws application-autoscaling put-scaling-policy \
  --service-namespace ecs \
  --resource-id service/fargate-cluster/github-issue-pulse-service \
  --scalable-dimension ecs:service:DesiredCount \
  --policy-name request-scaling-policy \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration "{
    \"TargetValue\": 0.1,
    \"PredefinedMetricSpecification\": {
      \"PredefinedMetricType\": \"ALBRequestCountPerTarget\",
      \"ResourceLabel\": \"app/github-issue-pulse-alb/ad6fd073e19f0ac6/targetgroup/ecs-fargat-github-issue-pulse-se/09a2c50ea833a017\"
    },
    \"ScaleInCooldown\": 300,
    \"ScaleOutCooldown\": 60
  }"


### step 3: verify the scaling policy

danqingzhang@Danqings-MBP core-api-backend % aws application-autoscaling describe-scaling-policies --service-namespace ecs

{
    "ScalingPolicies": [
        {
            "PolicyARN": "arn:aws:autoscaling:us-east-1:010526261030:scalingPolicy:25bfd96f-74ae-411c-a3d9-5e406f071ec9:resource/ecs/service/fargate-cluster/github-issue-pulse-service:policyName/request-scaling-policy",
            "PolicyName": "request-scaling-policy",
            "ServiceNamespace": "ecs",
            "ResourceId": "service/fargate-cluster/github-issue-pulse-service",
            "ScalableDimension": "ecs:service:DesiredCount",
            "PolicyType": "TargetTrackingScaling",
            "TargetTrackingScalingPolicyConfiguration": {
                "TargetValue": 0.1,
                "PredefinedMetricSpecification": {
                    "PredefinedMetricType": "ALBRequestCountPerTarget",
                    "ResourceLabel": "app/github-issue-pulse-alb/ad6fd073e19f0ac6/targetgroup/ecs-fargat-github-issue-pulse-se/09a2c50ea833a017"
                },
                "ScaleOutCooldown": 60,
                "ScaleInCooldown": 300
            },
            "Alarms": [
                {
                    "AlarmName": "TargetTracking-service/fargate-cluster/github-issue-pulse-service-AlarmHigh-fdfac9fa-abbd-47b1-9c79-718870091d6d",
                    "AlarmARN": "arn:aws:cloudwatch:us-east-1:010526261030:alarm:TargetTracking-service/fargate-cluster/github-issue-pulse-service-AlarmHigh-fd
fac9fa-abbd-47b1-9c79-718870091d6d"
                },
                {
                    "AlarmName": "TargetTracking-service/fargate-cluster/github-issue-pulse-service-AlarmLow-1932bb6f-dbd5-4518-b2cb-9aee5179b7c9",
                    "AlarmARN": "arn:aws:cloudwatch:us-east-1:010526261030:alarm:TargetTracking-service/fargate-cluster/github-issue-pulse-service-AlarmLow-193
2bb6f-dbd5-4518-b2cb-9aee5179b7c9"
                }
            ],
            "CreationTime": "2025-02-27T23:24:23.271000-08:00"
        }
    ]
}

### step 4: check request count

danqingzhang@Danqings-MBP core-api-backend % aws cloudwatch get-metric-statistics \
  --namespace AWS/ApplicationELB \
  --metric-name RequestCount \
  --statistics Sum \
  --period 60 \
  --dimensions Name=LoadBalancer,Value=app/github-issue-pulse-alb/ad6fd073e19f0ac6 \
  --start-time $(gdate -u --iso-8601=seconds --date='5 minutes ago') \
  --end-time $(gdate -u --iso-8601=seconds)

{
    "Label": "RequestCount",
    "Datapoints": [
        {
            "Timestamp": "2025-02-28T07:29:00+00:00",
            "Sum": 0.0,
            "Unit": "Count"
        },
        {
            "Timestamp": "2025-02-28T07:30:00+00:00",
            "Sum": 0.0,
            "Unit": "Count"
        },
        {
            "Timestamp": "2025-02-28T07:33:00+00:00",
            "Sum": 0.0,
            "Unit": "Count"
        },
        {
            "Timestamp": "2025-02-28T07:32:00+00:00",
            "Sum": 0.0,
            "Unit": "Count"
        },
        {
            "Timestamp": "2025-02-28T07:31:00+00:00",
            "Sum": 1.0,
            "Unit": "Count"
        }
    ]
}

### step 5: change dns
danqingzhang@Danqings-MBP GitIssuePulse % nslookup github-issue-pulse-api.pathon.ai
Server:         192.168.50.1
Address:        192.168.50.1#53

Non-authoritative answer:
github-issue-pulse-api.pathon.ai        canonical name = github-issue-pulse-alb-1297267319.us-east-1.elb.amazonaws.com.
Name:   github-issue-pulse-alb-1297267319.us-east-1.elb.amazonaws.com
Address: 3.220.248.124
Name:   github-issue-pulse-alb-1297267319.us-east-1.elb.amazonaws.com
Address: 44.209.225.212
Name:   github-issue-pulse-alb-1297267319.us-east-1.elb.amazonaws.com
Address: 18.213.222.74
Name:   github-issue-pulse-alb-1297267319.us-east-1.elb.amazonaws.com
Address: 18.215.190.191

danqingzhang@Danqings-MBP GitIssuePulse % curl -X GET http://github-issue-pulse-api.pathon.ai/api/hello
{"name":"John Doe"}% 
```

### Health check
```
1️⃣ Open AWS EC2 Console
Go to EC2 Dashboard → Target Groups.
Find ecs-fargat-github-issue-pulse-se (your ECS target group).
2️⃣ Update the Health Check Path
Click on Health Checks.
Change Health Check Path from / → /api/hello.
Click Save Changes.

aws elbv2 describe-target-health \
  --target-group-arn arn:aws:elasticloadbalancing:us-east-1:010526261030:targetgroup/ecs-fargat-github-issue-pulse-se/09a2c50ea833a017

```

## 2025-02-08, Saturday
```

## 1. Setup

### 1.1 Create .env file

create .env file

SUPABASE_KEY=
SUPABASE_PROJECT_ID=
SUPABASE_URL=
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
GITHUB_ACCESS_TOKEN=
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"

### 1.2 ORM with Prisma
Add the following to .env file to use Prisma to connect to Supabase for database operations.

# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=

# Direct connection to the database. Used for migrations.
DIRECT_URL=

for migration:

npx prisma migrate dev --name create_books_table

for seeding:

npx prisma db seed

## 2. Frontend
We use Next.js page router to build the frontend.
https://github.com/TataKKKL/TataKKKL-website/tree/main/website-app/pages

## 3. Backend
### 3.0 nextjs api route
Right now, the backend are in the same repo as the frontend, but in the future, they will be in different repos. Under the pages/api folder.
https://github.com/TataKKKL/TataKKKL-website/tree/main/website-app/pages/api

### 3.1 separate backend
* local backend
install dependencies:

npm install

Start the development server:

vercel dev --listen 3001

test the hello endpoint:

curl -X GET http://localhost:3001/api/hello
{"name":"John Doe"}%

* production backend
production backend url: https://tata-kkkl-website-d7nq.vercel.app

test the hello endpoint:

curl -X GET https://tata-kkkl-website-d7nq.vercel.app/api/hello
{"name":"John Doe"}%


### 3.2 deploy backend on fargate
#### (1) build docker image

docker build -t github-issue-pulse-backend .
docker run -p 3000:3000 github-issue-pulse-backend

test the hello endpoint:

curl -X GET http://localhost:3000/api/hello
{"name":"John Doe"}%

```

## 2025-01-25, Saturday
### 1. Webhook testing
testing repo: https://github.com/TataKKKL/TataKKKL-website
webhook testing: ngrok

