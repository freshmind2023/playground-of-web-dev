import os
class Config:
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://postgres:0000@localhost/mytest"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False