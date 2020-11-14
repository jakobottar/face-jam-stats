FROM nginx
COPY . /usr/share/nginx/html

# docker build -t name .
# docker run  --name container-name -p 80:80 -d name