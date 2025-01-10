FROM python:3.11-slim

RUN apt update && apt-get install -y make

RUN pip install poetry

WORKDIR /app/
ENV PYTHONPATH=/app

COPY pyproject.toml poetry.lock ./
COPY README.md ./
COPY app ./app


RUN poetry lock --no-interaction --no-ansi
RUN poetry install --no-interaction --no-ansi $( [ "$ENVIRONMENT" = "production" ] && echo "--without dev" || echo "--with dev" )

RUN poetry show

COPY . .

RUN ls -l /app
RUN ls -l ./

RUN chmod +x prestart.sh



EXPOSE 8787