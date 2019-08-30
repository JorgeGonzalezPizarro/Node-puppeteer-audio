#########LOCAL########

FROM node:12.2.0-alpine as local

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn install --silent
RUN yarn global add react-scripts@3.0.1  --silent

RUN yarn cache clean

#COPY . /application
EXPOSE 3000
ENTRYPOINT ["yarn" ,"start"]
CMD   tail -f /dev/null



