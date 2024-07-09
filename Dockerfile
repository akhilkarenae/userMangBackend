# Node.js runtime image
FROM node:18-alpine

WORKDIR /app

# package.json
COPY ["package.json","package-lock.json", "./"]

# Install dependencies
RUN npm install

COPY . .

# port that application will run on
EXPOSE 8000

# command to run application
CMD ["node", "src/index.js"]