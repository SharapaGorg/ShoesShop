from distutils.errors import LinkError
# database tools
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# database connecting link
from .config import LINK

# DATABASE CONNECTING
engine = create_engine(LINK)
Session = sessionmaker(engine)
Base = declarative_base()


class Shoe(Base):
    """

    Shoe database model

    id : int
    title : str
    price : float
    category : str

    """

    __tablename__ = "shoes"

    id = Column(Integer, nullable=False, unique=True,
                primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    img_src = Column(String, nullable=True)


def add_shoe(_session: Session, title: str, price: float, category: str, img_src : str) -> Shoe:
    shoe = Shoe(title=title,
                price=price,
                category=category,
                img_src = img_src)
    _session.add(shoe)
    _session.commit()

    return shoe


def get_shoes(_session: Session, category : str) -> list:
    shoes = select(Shoe)

    if category and category != 'all':
        shoes = shoes.where(Shoe.category == category)

    return _session.scalars(shoes)


def create_session(link: str) -> Session:
    """
    Create session to provide interaction with database
    """
    _session_ = sessionmaker(create_engine(link))

    return _session_()


Base.metadata.create_all(engine)
