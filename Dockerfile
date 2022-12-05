FROM zhangtao25/evaporator-ui:main as FrontEnd

FROM node:16.14.0-alpine

MAINTAINER wr_zhang25

RUN mkdir -p /usr/src/app
COPY . /usr/src/app/

COPY --from=FrontEnd /usr/src/app/dist /usr/src/app/client/
WORKDIR /usr/src/app

RUN node -v
RUN npm install pnpm -g
RUN pnpm install
RUN pnpm run build

EXPOSE 8080
CMD ["node", "dist/main.js" ]
