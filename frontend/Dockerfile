# test

FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/the-knight/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/the-knight/frontend/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/the-knight/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build-stage /var/jenkins_home/ssl/fullchain.pem /etc/letsencrypt/live/sword-shield.co.kr/fullchain.pem
# COPY --from=build-stage /var/jenkins_home/ssl/privkey.pem /etc/letsencrypt/live/sword-shield.co.kr/privkey.pem

EXPOSE 80
CMD ["nginx", "-g","daemon off;"]