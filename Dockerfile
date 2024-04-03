FROM node:20

WORKDIR /usr/app
COPY package.json .
EXPOSE 5173
RUN npm install
COPY . .
RUN npm run dev
