FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    make \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir poetry

WORKDIR /app

RUN python --version

ENV PYTHONPATH=./
ENV PATH="$PATH:/root/.local/bin"

COPY pyproject.toml README.md ./
COPY app ./app

RUN poetry lock --no-interaction --no-ansi
RUN POETRY_VIRTUALENVS_CREATE=false poetry install $(test "$ENVIRONMENT" == production && echo "--only=main") --no-interaction --no-ansi

COPY . /app

RUN chmod +x prestart.sh

RUN python --version
RUN poetry show
RUN poetry run alembic --version

EXPOSE 8787

CMD ["./prestart.sh"]
