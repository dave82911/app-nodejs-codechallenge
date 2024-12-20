FROM node:20.14.0-alpine as intermediate
COPY package.json ./
COPY package-lock.json ./
RUN npm i

FROM node:20.14.0-alpine
RUN mkdir /code
COPY . /code
WORKDIR /code
COPY --from=intermediate ./node_modules /code/node_modules
RUN npm i -gq forever > /dev/null 2> /dev/null

CMD sh docker_entrypoint.sh
