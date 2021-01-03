FROM php:7.4-apache

RUN a2enmod rewrite

COPY apache/apache2.conf /etc/apache2/apache2.conf
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY apache/initserver /usr/local/bin/
RUN chmod +x /usr/local/bin/initserver

RUN rm -f /var/run/apache2/apache2.pid

COPY php.ini /usr/local/etc/php/

RUN pecl install xdebug \
    && echo "zend_extension=$(find /usr/local/lib/php/extensions -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/xdebug.ini

RUN mkdir -p /var/www/html/public
WORKDIR /var/www/html

# This command will be executed only after the build phase
CMD [ "initserver" ]