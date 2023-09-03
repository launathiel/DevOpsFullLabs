FROM node:18.10.0-alpine

WORKDIR /app/member

COPY package.json .

RUN npm install --force

COPY . . 

EXPOSE 3000

CMD [ "npm", "start" ]