FROM node:8.2.1

RUN mkdir -p /app
COPY . /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
