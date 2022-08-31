FROM gradle:7.5.1-jdk17 AS build

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM azul/zulu-openjdk-alpine:17.0.2

EXPOSE 80

ENV PORT=80

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/ /app/

ENTRYPOINT ["java", "-Denv=prod", "-jar", "/app/server.jar"]
