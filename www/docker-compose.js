// Importar la biblioteca js-yaml
import { load } from 'js-yaml';

// Leer el archivo docker-compose.yml (puedes cargarlo de forma asíncrona si es necesario)
const dockerCompose = `
version: '3'

services:
  nginx-proxy:
    image: jwilder/nginx-proxy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - certs:/etc/nginx/certs:ro
      - vhostd:/etc/nginx/vhost.d
      - html:/usr/share/nginx/html
      - acme:/etc/acme.sh
    labels:
      - com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy

  letsencrypt:
    image: jrcs/letsencrypt-nginx-proxy-companion
    restart: always
    environment:
      - NGINX_PROXY_CONTAINER=nginx-proxy
    volumes:
      - certs:/etc/nginx/certs:rw
      - vhostd:/etc/nginx/vhost.d
      - html:/usr/share/nginx/html
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - acme:/etc/acme.sh

  www:
    image: nginx
    restart: always
    expose:
      - "80"
    volumes:
      - ./www:/usr/share/nginx/html:ro
    environment:
      - VIRTUAL_HOST=orsatecsl.es,alvaro.orsatecsl.es
      - LETSENCRYPT_HOST=orsatecsl.es,alvaro.orsatecsl.es
      - LETSENCRYPT_EMAIL=info@orsatecsl.es
    depends_on:
      - nginx-proxy
      - letsencrypt
volumes: 
  certs:
  html:
  vhostd:
  acme:
`;

// Analizar el archivo docker-compose.yml
const composeData = load(dockerCompose);

// Obtener los nombres de los contenedores
const containerNames = Object.keys(composeData.services);

// Crear elementos <p> con los nombres de los contenedores y agregarlos al documento HTML
const containerList = document.getElementById('container-list');
containerNames.forEach(containerName => {
  const p = document.createElement('p');
  p.textContent = containerName;
  containerList.appendChild(p);
});
