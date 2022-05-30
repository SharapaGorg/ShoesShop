config = {
    'HOST' : '185.127.224.67',
    'PWD': 'ywH03xDBJjLBkkGl',
    'USER' : 'shg',
    'DB' : 'shg',
    'PORT' : 5440,
}

dialect = 'postgresql'

LINK = '{}://{}:{}@{}:{}/{}'.format(dialect, config['USER'], config['PWD'], config['HOST'], config['PORT'], config['DB'])