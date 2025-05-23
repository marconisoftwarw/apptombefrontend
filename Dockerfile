FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install react-scripts@3.4.1 -g
COPY . ./
CMD ["npm", "start"]
