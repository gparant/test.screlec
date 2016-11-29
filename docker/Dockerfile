FROM php:7.0-apache
RUN apt-get update; apt-get install -y git gettext cron wget zlib1g-dev && apt-get clean
RUN docker-php-ext-install opcache mbstring pdo_mysql gettext zip
RUN pecl install apcu-5.1.3 \
    && docker-php-ext-enable apcu
#RUN pecl install -f apcu
RUN a2enmod rewrite
ADD docker/crontab /tmp/
RUN crontab /tmp/crontab
ADD docker/apache2.conf /etc/apache2/apache2.conf

#ADD docker/ext-apcu.ini /usr/local/etc/php/conf.d/ext-acpu.ini
#ADD docker/ext-zip.ini /usr/local/etc/php/conf.d/ext-zip.ini
ADD docker/php.ini /usr/local/etc/php/php.ini

ADD docker/startup.sh /usr/local/startup.sh

#ADD docker/ext-xdebug.ini /usr/local/etc/php/conf.d/ext-xdebug.ini
RUN pecl install -f xdebug

RUN docker-php-ext-install bcmath

RUN adduser user --uid 1000 --disabled-login --disabled-password --gecos ""
RUN adduser user www-data
RUN adduser www-data user

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

RUN mkdir /var/log/zoho-rabbit

CMD ["/bin/bash", "/usr/local/startup.sh"]
