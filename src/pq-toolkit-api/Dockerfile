FROM python:3.11-slim

RUN pip install poetry

RUN apt update
RUN apt-get install -y make

WORKDIR /app/

ENV PYTHONPATH=/app
ARG ENVIRONMENT=production

COPY pyproject.toml poetry.lock ./

RUN poetry lock --no-interaction --no-ansi
RUN if [ "$ENVIRONMENT" = "production" ]; then \
        POETRY_VIRTUALENVS_CREATE=false poetry install --only=main --no-interaction --no-ansi --no-root; \
    else \
        POETRY_VIRTUALENVS_CREATE=false poetry install --dev --no-interaction --no-ansi --no-root; \
    fi

COPY . .

RUN chmod +x prestart.sh

EXPOSE 8787
