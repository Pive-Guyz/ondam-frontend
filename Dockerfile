# 1단계: Build Stage
FROM node:20-slim AS build
WORKDIR /app

# 환경 변수 파일 복사 (명시적 설정)
COPY .env.production ./

COPY package*.json ./
RUN npm install
COPY . .

# Vite는 NODE_ENV=production에서 .env.production을 자동 인식
ENV NODE_ENV=production

RUN npm run build

# 2단계: Nginx Serve Stage
FROM nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
