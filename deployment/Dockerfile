FROM node:18-alpine

WORKDIR /app

# Copy main-web-app
COPY main-web-app/package*.json ./main-web-app/
RUN cd main-web-app && npm ci --only=production

COPY main-web-app ./main-web-app

# Build the Next.js app
RUN cd main-web-app && npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "--prefix", "main-web-app", "start"]