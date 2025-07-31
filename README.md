# Currency Converter App
A real-time currency converter that uses the ExchangeRate-API to help users convert over 200 currencies. Useful for travelers, businesses, and everyday users.

## Features
    * Live exchange rates (ExchangeRate-API)
    * Supports 200+ currencies    
    * Converts any amount between selected currencies

## Tech Stack
    * Frontend: HTML, CSS, JavaScript (ES6)    
    * Backend: Node.js + Express.js    
    * API: ExchangeRate-API    
    * Containerization: Docker    
    * Load Balancing: HAProxy    
    * Deployment: Azure VMs

## Docker Info
    * Repo: docker.io/ralphishimwe/currency-converter    
    * Tags: v2, latest    
    * URL: [Docker Hub Link](https://hub.docker.com/r/ralphishimwe/currency-converter)

## Local Setup
    
### Requirements
    Node.js 18+
    ExchangeRate-API key

### Run Locally
    git clone https://github.com/ralphishimwe/api_project
    cd currency-converter
    npm install
    echo "API_KEY=your_api_key_here" > .env
    npm start
    Access: http://localhost:8080

## Docker Deployment

### Build & Push
    docker build -t ralphishimwe/currency-converter:v2 .
    docker run -p 8080:8080 -e API_KEY=your_api_key ralphishimwe/currency-converter:v2
    docker push ralphishimwe/currency-converter:v2

### Run on Web01 & Web02
    docker pull ralphishimwe/currency-converter:v2
    docker run -d --name currency-app \
      --restart unless-stopped -p 8080:8080 \
      -e API_KEY=your_api_key ralphishimwe/currency-converter:v2
      
### Load Balancer (HAProxy)
    frontend currency_frontend
    bind *:80
    default_backend currency_backend

    backend currency_backend
        balance roundrobin
        option httpchk GET /api/codes
        server web01 <web01-private-ip>:8080 check
        server web02 <web02-private-ip>:8080 check

### Deploy HAProxy container
    docker run -d \
      --name haproxy-lb \
      --restart unless-stopped \
      -p 80:80 \
      -v /etc/haproxy:/usr/local/etc/haproxy:ro \
      haproxy:2.4

### Reload HAProxy configuration
    docker exec haproxy-lb haproxy -sf $(docker exec haproxy-lb pidof haproxy) -f /usr/local/etc/haproxy/haproxy.cfg


## Testing Load Balancing
  for i in {1..10}; do 
  echo "Request $i:"
  curl -s http://4.231.106.46/api/codes | head -n 3
  echo "---"
  sleep 1
  done

  curl http://4.231.106.46/api/codes
  curl http://4.231.106.46/api/rates/USD

## API Attribution
This application uses the [ExchangeRate-API](https://exchangerate-api.com/) by Jonathan Mearns. Special thanks for providing reliable, free currency exchange rate data.

## Challenges
  I faced a challenge when the servers didn’t support Node.js 18+, which my app required. Originally, I planned to use Nginx and PM2 for deployment, but that approach wasn’t possible the remote machines. I had to learn Docker and Docker Hub from scratch and build the image locally instead. This allowed me to deploy the app without depending on the server’s environment or native resources. 

## Future Enhancements
  1. Mobile Version
  2. Historical Charts

#### Website 
http://www.getralphishy.tech

#### Demo video 
https://youtu.be/l7f43OBOhPE

#### Contact & Support Email: 
r.ishimwe3@alustudent.com

© 2025 Ralph Ishimwe Yvan. All rights reserved

