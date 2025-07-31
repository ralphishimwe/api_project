# Currency Converter App
A real-time currency converter that uses the ExchangeRate-API to help users convert over 200 currencies. Useful for travelers, businesses, and everyday users.

# Features
    Live exchange rates (ExchangeRate-API)
    Supports 200+ currencies    
    Clean and responsive UI    
    Converts any amount between selected currencies    
    Robust error handling    
    Deployed with load balancing (Web01, Web02, LB01)

# Tech Stack
    Frontend: HTML, CSS, JavaScript (ES6)    
    Backend: Node.js + Express.js    
    API: ExchangeRate-API    
    Containerization: Docker    
    Load Balancing: HAProxy    
    Deployment: Azure VMs

# Docker Info
    Repo: docker.io/ralphishimwe/currency-converter    
    Tags: v1, latest    
    URL: [Docker Hub Link](https://hub.docker.com/r/ralphishimwe/currency-converter)

# Local Setup
    
# Requirements
    Node.js 18+
    ExchangeRate-API key

# Run Locally
    git clone https://github.com/ralphishimwe/api_project
    cd currency-converter
    npm install
    echo "API_KEY=your_api_key_here" > .env
    npm start
    Access: http://localhost:8080

# Docker Deployment

# Build & Push
    docker build -t ralphishimwe/currency-converter:v1 .
    docker run -p 8080:8080 -e API_KEY=your_api_key ralphishimwe/currency-converter:v1
    docker push ralphishimwe/currency-converter:v1

# Run on Web01 & Web02
    docker pull ralphishimwe/currency-converter:v1
    docker run -d --name currency-app \
      --restart unless-stopped -p 8080:8080 \
      -e API_KEY=your_api_key ralphishimwe/currency-converter:v1
      
# Load Balancer (HAProxy)
    frontend currency_frontend
    bind *:80
    default_backend currency_backend

    backend currency_backend
        balance roundrobin
        option httpchk GET /api/codes
        server web01 <web01-private-ip>:8080 check
        server web02 <web02-private-ip>:8080 check

# Deploy HAProxy container
docker run -d \
  --name haproxy-lb \
  --restart unless-stopped \
  -p 80:80 \
  -v /etc/haproxy:/usr/local/etc/haproxy:ro \
  haproxy:2.4

# Reload HAProxy configuration
docker exec haproxy-lb haproxy -sf $(docker exec haproxy-lb pidof haproxy) -f /usr/local/etc/haproxy/haproxy.cfg


# Testing Load Balancing
  for i in {1..10}; do 
  echo "Request $i:"
  curl -s http://4.231.106.46/api/codes | head -n 3
  echo "---"
  sleep 1
  done

  curl http://4.231.106.46/api/codes
  curl http://4.231.106.46/api/rates/USD

# Demo & Submission
  Demo video: YouTube Link  
  GitHub repo: https://github.com/ralphishimwe/api_project

# Challenges
  I faced a challenge when the servers didn’t support Node.js 18+, which my app required. Originally, I planned to use Nginx and PM2 for deployment, but that approach wasn’t possible the remote machines. I had to learn Docker and Docker Hub from scratch and build the image locally instead. This allowed me to deploy the app without depending on the server’s environment or native resources. 

# Future Enhancements
  1. Mobile Version
  2. Historical Charts


Website 🔗:
Demo video 🔗: ############
Contact & Support Email:r.ishimwe3@alustudent.com
© 2025 Ralph Ishimwe Yvan. All rights reserved

