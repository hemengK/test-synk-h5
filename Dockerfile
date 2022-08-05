FROM docker.io/fuyuda/nginx:fixcurl
RUN  apk upgrade
COPY dist/ /usr/share/nginx/html/anniversary/h5/
COPY nginx.conf /etc/nginx/conf.d/default.conf
