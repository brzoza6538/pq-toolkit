FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    make \
    && rm -rf /var/lib/apt/lists/*

RUN pip install poetry

WORKDIR /app

ENV PYTHONPATH=/app
ENV PATH="$PATH:/root/.local/bin"
ENV ENVIRONMENT=development

COPY pyproject.toml README.md ./
COPY app ./app

RUN poetry lock --no-interaction --no-ansi
RUN poetry config virtualenvs.create false 
RUN poetry install --no-interaction --no-ansi

COPY . /app

RUN chmod +x prestart.sh

RUN python --version
RUN poetry show
RUN poetry run alembic --version

EXPOSE 8787

CMD ["./prestart.sh"]
