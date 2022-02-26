FROM node:17

EXPOSE 3001

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV REQUEST_ORIGIN=http://localhost:3000

CMD ["npm", "start"]
