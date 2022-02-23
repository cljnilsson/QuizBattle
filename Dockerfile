FROM node:14 as base
COPY package*.json ./
RUN npm i --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm", "run", "serv"]