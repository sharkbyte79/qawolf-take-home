# 'slim' version lacks some libs for webkit
FROM node:20-bookworm

WORKDIR /app
COPY . /app

RUN npm i
RUN npx -y playwright@1.52.0 install --with-deps

CMD [ "npx", "playwright", "test" ]