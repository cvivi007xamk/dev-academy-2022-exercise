FROM alpine as build-stage

ENV LC_ALL=C.UTF-8

WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache nodejs npm && \
    npm install && \
    npm run build 

FROM alpine

EXPOSE 3000

WORKDIR /usr/src/app

ENV LC_ALL=C.UTF-8

COPY --from=build-stage /usr/src/app/build /usr/src/app/build

RUN apk add --no-cache nodejs npm && \
    npm install -g serve && \
    adduser -D myuser && chown -R myuser /usr/src/app && \
    apk del npm

USER myuser

CMD ["serve", "-s", "-l", "3000", "build"]

