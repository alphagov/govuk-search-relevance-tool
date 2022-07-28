ARG base_image=ruby:2.7.6
FROM $base_image AS builder

ENV RAILS_ENV=production

RUN apt-get update -qy && \
    apt-get upgrade -y && \
    apt-get install -y build-essential nodejs && \
    apt-get clean

RUN bundle config set force_ruby_platform true

RUN mkdir /app

WORKDIR /app

COPY Gemfile Gemfile.lock .ruby-version /app/

RUN bundle config set deployment 'true' && \
    bundle config set without 'development test' && \
    bundle install --jobs 4 --retry=2

COPY . /app

RUN GOVUK_APP_DOMAIN=www.gov.uk \
    GOVUK_WEBSITE_ROOT=https://www.gov.uk \
    bundle exec rails assets:precompile

FROM $base_image

ENV GOVUK_PROMETHEUS_EXPORTER=true RAILS_ENV=production GOVUK_APP_NAME=finder-frontend GOVUK_APP_DOMAIN=www.gov.uk GOVUK_WEBSITE_ROOT=https://www.gov.uk PORT=3062

RUN apt-get update -qy && \
    apt-get upgrade -y && \
    apt-get install -y nodejs && \
    apt-get clean

WORKDIR /app

HEALTHCHECK CMD curl --silent --fail localhost:$PORT/healthcheck/ready || exit 1

COPY --from=builder /usr/local/bundle/ /usr/local/bundle/
COPY --from=builder /app ./

CMD bundle exec puma
