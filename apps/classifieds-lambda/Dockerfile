# Most recent version of node.
FROM node:12.16.1

# Sets the default working directory of the image.
ENV DEPLOYMENT_DIR=/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Sets the default working directory of the image for any
# RUN, CMD, ENTRYPOINT, COPY, and ADD statements that come
# with it in the Dockerfile.
WORKDIR $DEPLOYMENT_DIR

RUN npm install -g serverless

# Install and cache dependencies.
COPY package.json /app/package.json
RUN npm install

# Add the app
COPY . $DEPLOYMENT_DIR

# Create client build
RUN ng run classifieds:build --configuration="dev" --baseHref="/dev/" --deployUrl="/dev/"

# Create server build
RUN ng run classifieds:server --configuration="dev" --deployUrl="/dev/"

# Build node server files
RUN ng run classifieds-lambda:build
