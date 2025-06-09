FROM node:22.16.0-alpine

# Install psql and bash
RUN apk add --no-cache postgresql-client bash

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source files (including db/init-db.sh and schema-init.sql)
COPY . .

# Create the files directory inside the container
RUN mkdir -p files 

# Expose port
EXPOSE 3000

# Make the init script executable
RUN chmod +x db/init-db.sh

# Run schema init before starting app
CMD ["sh", "-c", "./db/init-db.sh && yarn dev"]