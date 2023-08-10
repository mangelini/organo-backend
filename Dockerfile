FROM node:alpine
WORKDIR /app

COPY package*.json .
# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install

RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3000

# pass an argument to determine if we are in production or development (start or dev)
ARG BUILDTYPE

# The npm script is different based on the prod or dev environment
CMD ["npm", "run", "$BUILDTYPE"]
