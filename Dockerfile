FROM node:latest

WORKDIR /app
ADD . /app

RUN npm install
RUN npm run build
RUN npm run generate

ENV NODE_ENV=production
ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]