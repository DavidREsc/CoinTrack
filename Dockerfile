FROM node:19

WORKDIR /usr/src/app

RUN npm install -g nodemon
RUN npm install -g typescript

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

USER node

EXPOSE 5000

CMD ["tsc", "-w"]