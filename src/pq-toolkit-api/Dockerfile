FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    make \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir poetry

WORKDIR /app
ENV PYTHONPATH=./
ENV PATH="$PATH:/root/.local/bin"

#COPY README.md pyproject.toml poetry.lock prestart.sh ./
COPY . /app

RUN poetry install --no-interaction --no-cache --without dev

RUN poetry show

RUN poetry run alembic --version

RUN chmod +x prestart.sh

EXPOSE 8787

CMD ["./prestart.sh"]
