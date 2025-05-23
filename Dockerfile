FROM node:20-bookworm

WORKDIR /app
COPY . /app

RUN npx -y playwright@1.39.0 install --with-deps
RUN npm i

CMD [ "npx", "playwright", "test" ]