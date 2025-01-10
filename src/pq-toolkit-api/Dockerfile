FROM python:3.11-slim

RUN apt update && apt-get install -y make

RUN pip install poetry

WORKDIR /app/
ENV PYTHONPATH=/app
ARG ENVIRONMENT=production

COPY pyproject.toml poetry.lock ./

RUN poetry lock --no-interaction --no-ansi

RUN POETRY_VIRTUALENVS_CREATE=false poetry install $( [ "$ENVIRONMENT" = "production" ] && echo "--only=main" || echo "--dev" ) --no-interaction --no-ansi --no-root

COPY . .

RUN chmod +x prestart.sh

EXPOSE 8787