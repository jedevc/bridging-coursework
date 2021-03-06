# Bridging coursework

Due to COVID-19, my uni asked me to complete a piece of coursework between my
second and third year.

The coursework is a personal website containing a blog and a portfolio.

## Setup

Build the frontend:

    $ (cd frontend && npm install && npm run build)

Install python dependencies:

    $ pip install -r requirements.txt

Generate some development settings:

    $ ./generate_env.py > .env

Run the python server:

    $ python manage.py runserver

## Development

In one shell:

    $ (cd frontend && npm run dev)

In another:

    $ python manage.py runserver

### Testing

There are three sets of tests:

- Blog API tests
- CV API tests
- Frontend tests (using selenium)

To run each set of tests, respectively:

    $ python manage.py test blog
    $ python manage.py test cv
    $ python manage.py test frontend
