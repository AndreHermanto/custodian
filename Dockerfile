FROM node:15

WORKDIR /custodian
COPY ./ ./
ADD start.sh /start.sh
RUN chmod 755 /start.sh
CMD ["/start.sh"]