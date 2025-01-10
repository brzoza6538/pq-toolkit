FROM python:3.11-slim

RUN apt update && apt-get install -y make && apt-get clean && \
    pip install --upgrade pip setuptools wheel && \
    pip install poetry==1.7.0 distro

WORKDIR /app/

ENV PYTHONPATH=/app
ARG ENVIRONMENT=production

COPY pyproject.toml poetry.lock ./
RUN if [ "$ENVIRONMENT" = "production" ]; then \
      POETRY_VIRTUALENVS_CREATE=false poetry install --only=main --no-interaction --no-ansi --no-root; \
    else \
      POETRY_VIRTUALENVS_CREATE=false poetry install --no-interaction --no-ansi --no-root; \
    fi

COPY . .
RUN chmod +x prestart.sh

EXPOSE 8787
