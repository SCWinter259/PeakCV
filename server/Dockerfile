# the version when I develop the app is 22.9.0
FROM node:current-bookworm

# install pdflatex
RUN apt-get update && apt-get install -y texlive-full

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

ENV PORT=8080

EXPOSE 8080

RUN npm run build

CMD ["npm", "start"]