FROM python:3.11-slim

RUN pip install --upgrade pip setuptools wheel && \
    pip install poetry && \
    apt update && \
    apt-get install -y make && \
    apt-get clean

WORKDIR /app/

ENV PYTHONPATH=/app
ARG ENVIRONMENT=production

COPY pyproject.toml poetry.lock ./
RUN POETRY_VIRTUALENVS_CREATE=false poetry install $(test "$ENVIRONMENT" = production && echo "--only=main") --no-interaction --no-ansi --no-root

COPY . .

RUN chmod +x prestart.sh

EXPOSE 8787
