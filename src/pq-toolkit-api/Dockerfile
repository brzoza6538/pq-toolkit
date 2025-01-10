FROM python:3.11-slim

RUN pip install poetry

RUN apt update
RUN apt-get install -y make

WORKDIR /app/

ENV PYTHONPATH=/app
ARG ENVIRONMENT=production

COPY pyproject.toml poetry.lock ./

RUN POETRY_VIRTUALENVS_CREATE=false poetry install $(test "$ENVIRONMENT" == production && echo "--only=main") --no-interaction --no-ansi --no-root 

COPY . .

RUN chmod +x prestart.sh

EXPOSE 8787
