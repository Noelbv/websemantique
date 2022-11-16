import json
from json import JSONEncoder


class Film:
    def __init__(self, title, part_of_series, country, pub_date, director, screenwriter, cast_member,
                 director_photography, production_company, duration, review, resume, photo):
        self.title = title
        self.part_of_series = part_of_series
        self.country = country
        self.pub_date = pub_date
        self.director = director
        self.screenwriter = screenwriter
        self.cast_member = cast_member
        self.director_photography = director_photography
        self.production_company = production_company
        self.duration = duration
        self.review = review
        self.resume = resume
        self.photo = photo
        self.list_actors = []
        self.list_producers = []
        self.list_genre = []


# subclass JSONEncoder
class FilmEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__
