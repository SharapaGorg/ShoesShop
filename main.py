from sys import argv
from utils import logger
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from json import loads

from utils.config import LINK
from utils.utils import *

database = create_session(LINK)

app = Flask(__name__)
CORS(app)

if len(argv) <= 1:
    logger.warning('Using : python3 main.py --dev | --prod')
    exit()

if argv[1] == '--prod':
    HOST, PORT = '0.0.0.0', 9001

elif argv[1] == '--dev':
    HOST, PORT = 'localhost', 9090
else:
    logger.warning(f'Undefined argument: {argv[1]}')
    logger.warning('Using : python3 main.py --dev | --prod')
    exit()


@app.route('/', methods=['GET'])
def root():
    return render_template('index.html')


@app.route('/api/shoes', methods=['GET', 'POST'])
def shoes():
    """
    
    category : str - category of shoes

    """
    data = loads(request.get_data())

    print(data)

    category : str = data.get('category')

    _shoes = get_shoes(database, category)
    shoes = list()

    for shoe in _shoes:
        shoe = {
            'title': shoe.title,
            'price': shoe.price,
            'category': shoe.category,
            'img' : shoe.img_src
        }

        shoes.append(shoe)

    return jsonify(shoes)

app.run(host=HOST, port=PORT, debug=True)
