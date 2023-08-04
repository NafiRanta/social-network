FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g http-server
EXPOSE 80
CMD ["http-server", "build", "-p", "80", "-c-1"]
