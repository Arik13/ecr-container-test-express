FROM 535810869599.dkr.ecr.us-west-2.amazonaws.com/node_14_alpine:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm i
EXPOSE 3000
CMD ["npm","start"]