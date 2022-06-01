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
    title : str
    sort : dict = {
        price : 'low-high' | 'high-low'
    }

    """
    data = loads(request.get_data())

    category : str = data.get('category')
    title : str = data.get('title')
    sort : dict = data.get('sort')

    _shoes = get_shoes(database, category, title)
    shoes = list()

    for shoe in _shoes:
        shoe = {
            'title': shoe.title,
            'price': shoe.price,
            'category': shoe.category,
            'img' : shoe.img_src,
            'id' : shoe.id
        }

        shoes.append(shoe)

    if sort and sort.get('price') == 'low-high':
        sort = shoes.sort(key=lambda x : x['price'])
    if sort and sort.get('price') == 'high-low':
        sort = shoes.sort(key=lambda x : x['price'], reverse=True)

    return jsonify(shoes)

app.run(host=HOST, port=PORT, debug=True)
