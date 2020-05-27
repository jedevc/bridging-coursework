#!/usr/bin/env python

import argparse
from django.core.management.utils import get_random_secret_key

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--debug", help="enable debugging", action="store_true")
    args = parser.parse_args()

    key = get_random_secret_key()
    print(f"export SECRET_KEY='{key}'")
    if args.debug:
        print("export DEBUG=true")

if __name__ == "__main__":
    main()
