FROM node

WORKDIR /usr/src/app

COPY package.json ./

EXPOSE 4200

RUN npm install -g @angular/cli

RUN npm install

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]