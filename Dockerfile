FROM zhangtao25/evaporator:main as FrontEnd

FROM node:14.16.0-alpine

MAINTAINER wr_zhang25

RUN mkdir -p /usr/src/app
COPY . /usr/src/app/

COPY --from=FrontEnd /usr/src/app/dist /usr/src/app/client/
WORKDIR /usr/src/app

RUN node -v
RUN npm install pnpm -g
RUN pnp install
RUN pnp run build

EXPOSE 8080
CMD ["node", "dist/main.js" ]
