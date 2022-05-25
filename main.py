from ast import arg
from sys import argv
from utils import logger
from flask import Flask, render_template
import os

if len(argv) <= 1:
    logger.warning('Using : python3 main.py --dev | --prod')
    exit()

if argv[1] == '--prod':
    HOST, PORT = '0.0.0.0', 9001

if argv[1] == '--dev':
    HOST, PORT = 'localhost', 9090

app = Flask(__name__)

@app.get('/index')
def root():
    return render_template('index.html')

app.run(host=HOST, port=PORT, debug=True)