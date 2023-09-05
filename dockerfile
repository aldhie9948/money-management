FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
ENV DATABASE_URL=file:../src/lib/server/db/dev.db
ENV APP_USER=gunawan
ENV APP_PASS=gunawan
RUN npx prisma db push
RUN npx prisma generate
ENV PORT=5173
EXPOSE 5173
VOLUME [ "/app/src/lib/server/db" ]
CMD [ "yarn","dev","--","--host" ]