#!/usr/bin/env bash

# Debug: Check installed Python packages
pip list

# Let the DB start
python app/backend_pre_start.py

# Run migrations
if [ "$ENVIRONMENT" != "local" ]; then
    which alembic
    alembic upgrade head
fi

# Create initial data in DB
python app/initial_data.py