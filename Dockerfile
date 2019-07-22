FROM node:alpine
COPY * /app/
WORKDIR /app
RUN npm install
ENV PORT 80
CMD ["node", "server.js"]
