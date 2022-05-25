from utils.utils import *
from utils.config import LINK

database = create_session(LINK)

add_shoe(database, 'adidas', 150.99, 'sport')