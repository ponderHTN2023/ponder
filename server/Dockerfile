# FROM python:3.9.1-alpine
# ENV PYTHONUNBUFFERED 1
# ENV PYTHONDONTWRITEBYTECODE 1
# WORKDIR /
# COPY requirements.txt ./
# COPY manage.py ./
# RUN pip install --upgrade pip && \
#   apk add --no-cache postgresql-libs && \
#   apk add ffmpeg && \
#   apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
#   python3 -m pip install -r requirements.txt && \
#   apk --purge del .build-deps
# # RUN python manage.py makemigrations
# # RUN python manage.py migrate
# # ENV NODE_ENV production
# COPY . ./
# ENV SECRET_KEY="django-insecure-owdo033dotr20d9@hfh8k5+e9vv$lv)qondxr4rrv!b=$!p8jm"
# ENV DEBUG=False
# ENV ALLOWED_HOSTS="*"
# ENV CORS_ORIGIN_WHITELIST="localhost:3000 *"
# ENV OPENAI_API_KEY="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"
# ENV DATABASE_URL="postgres://postgres:postgres@localhost:5432/ponder"
# EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# # "python", "manage.py", "migrate", "&&", 

FROM python:3.7.4-alpine3.10

ADD requirements.txt /app/requirements.txt

RUN set -ex \
    && apk add --no-cache --virtual .build-deps postgresql-dev build-base \
    && python -m venv /env \
    && /env/bin/pip install --upgrade pip \
    && /env/bin/pip install --no-cache-dir -r /app/requirements.txt \
    && runDeps="$(scanelf --needed --nobanner --recursive /env \
        | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
        | sort -u \
        | xargs -r apk info --installed \
        | sort -u)" \
    && apk add --virtual rundeps $runDeps \
    && apk del .build-deps

ADD . /app
WORKDIR /app

ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "server.wsgi:application"]