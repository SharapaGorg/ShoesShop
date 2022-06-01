from asyncio.log import logger
from utils.utils import *
from utils.config import LINK
from faker import Faker
from random import randint, choice
from sys import argv
from utils import logger

fake = Faker('en_US')

database = create_session(LINK)

links = ['https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bcfd9ab6-c70d-46e9-9004-6788d007ac7a/blazer-low-jumbo-shoes-HK5Kqs.png',
         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4ba8a34b-7501-4a5e-8763-669692bbbe06/air-force-1-07-shoes-TMBQDj.png',
         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/caa6d4ae-c60e-4c73-98d4-d8f3427e0213/air-zoom-pegasus-39-road-running-shoes-JNVFbf.png',
         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0db30447-d199-4373-bf36-6cbb439e96c2/air-max-terrascape-90-shoes-wdBkKH.png',
         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/593fa447-31ed-4ca6-a11d-11c749d177a2/air-presto-shoes-P4vS8X.png',
         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7f4d349c-b950-46c4-8d0e-a0297c32e02e/zoomx-vaporfly-next-2-road-racing-shoes-821S4F.png',
         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c1edb635-65b1-4a6c-8495-cc013dbd962d/mercurial-superfly-8-elite-fg-football-boots-9M5T0Q.png',
         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/21d38052-598b-44f6-a857-123c9f72b015/air-force-1-07-shoe-lKPQ6q.png',
         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4a8062cc-2332-4746-983a-7d9a2d28bdf2/metcon-7-amp-training-shoes-vsfh3x.png']


if len(argv) < 2:
    logger.warning('Using: python3 generate.py --shoes')
    logger.warning("python3 generate.py --category title")
    exit()

if argv[1] == '--shoes':
    for i in range(10):
        add_shoe(database, fake.word(), randint(100, 500), choice(
            ['sport', 'football', 'basketball', 'training & gym']), choice(links))

if argv[1] == '--category':
    add_category(database, argv[2])
