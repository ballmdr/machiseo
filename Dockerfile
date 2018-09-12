FROM node:8.2.1

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

ENV NODE_ENV=production

COPY . /app
RUN npm run build


ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
