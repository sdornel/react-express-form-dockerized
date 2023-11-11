FROM node:14-alpine
ENV PATH /app/node_modules/.bin:$PATH
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
# Copy app files
COPY . ./
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]