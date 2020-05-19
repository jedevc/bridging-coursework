# Bridging coursework

Due to COVID-19, my uni asked me to complete a piece of coursework between my
second and third year.

The coursework is a personal website containing a blog and a portfolio.

## Setup

Build the frontend:

    $ (cd frontend && npm install && npm run build)

Install python dependencies:

    $ pip install -r requirements.txt

Run the python server:

    $ python manage.py runserver

## Development

In one shell:

    $ (cd frontend && npm run dev)

In another:

    $ python manage.py runserver
