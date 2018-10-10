FROM node

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm install
RUN npm run build

ENV NODE_ENV=production
ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]