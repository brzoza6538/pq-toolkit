FROM python:3.11-slim

RUN apt update && apt-get install -y make

RUN pip install poetry

WORKDIR /app
ENV PYTHONPATH=/app

COPY . .

RUN poetry lock --no-interaction --no-ansi

RUN poetry config virtualenvs.create false 
RUN poetry install --no-interaction --no-ansi --with dev

RUN poetry show

RUN chmod +x prestart.sh

ENV PATH="$PATH:/root/.local/bin"

EXPOSE 8787

CMD ["./prestart.sh"]

