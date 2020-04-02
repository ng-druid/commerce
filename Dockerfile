# Most recent version of node.
FROM node:12.16.1 as buildContainer

# Sets the default working directory of the image.
ENV DEPLOYMENT_DIR=/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Sets the default working directory of the image for any
# RUN, CMD, ENTRYPOINT, COPY, and ADD statements that come
# with it in the Dockerfile.
WORKDIR $DEPLOYMENT_DIR

# Install and cache dependencies.
COPY package.json /app/package.json
RUN npm install

# Add the app
COPY . $DEPLOYMENT_DIR

# Create client build
RUN ng run classifieds:build --configuration="dev"

# Create server build
RUN ng run classifieds:server --configuration="dev"

# Build node server files
RUN ng run classifieds-ssr:build

# ----------------------------------------------

FROM node:12.16.1-buster-slim

# Sets the default working directory of the image.
ENV DEPLOYMENT_DIR=/app

WORKDIR $DEPLOYMENT_DIR

COPY --from=buildContainer /app/server.js /app
COPY --from=buildContainer /app/dist/apps/classifieds /app/dist/apps/classifieds
COPY --from=buildContainer /app/dist/apps/classifieds-ssr /app/dist/apps/classifieds-ssr

# ssr runs on port 4000
EXPOSE 80
ENV PORT 80

CMD ["node", "server.js"]
