FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir poetry

WORKDIR /app
ENV PYTHONPATH=/app
ENV PATH="$PATH:/root/.local/bin"
ENV ENVIRONMENT=development

COPY pyproject.toml README.md ./ 

RUN poetry config virtualenvs.create false \
    && poetry install $(if [ "$ENVIRONMENT" = "production" ]; then echo "--no-dev"; fi) --no-interaction --no-ansi

COPY . /app

RUN chmod +x prestart.sh

RUN python --version \
    && poetry show \
    && poetry run alembic --version

EXPOSE 8787

CMD ["./prestart.sh"]
