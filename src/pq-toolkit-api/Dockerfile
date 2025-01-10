FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    make \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir poetry==2.0.0

WORKDIR /app

RUN python --version

ENV PYTHONPATH=./
ENV PATH="$PATH:/root/.local/bin"

#COPY README.md pyproject.toml poetry.lock prestart.sh ./
COPY . /app

RUN poetry lock --no-interaction --no-ansi

RUN poetry install --no-interaction --no-ansi --with dev

RUN poetry show

RUN poetry run alembic --version

RUN chmod +x prestart.sh

EXPOSE 8787

CMD ["./prestart.sh"]
