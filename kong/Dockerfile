FROM kong/kong-gateway:3.2.2.0-alpine
USER root

RUN apk update && apk add nodejs npm && npm install -g kong-pdk@0.5.5

USER kong
EXPOSE 8000 8001 8002 8003 8004 8443 8444 8445
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=10s --timeout=10s --retries=10 CMD kong health
CMD ["kong", "docker-start"]