FROM node:lts-alpine

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN npm install

COPY app ./

EXPOSE 80

CMD ["npm", "run", "start"]