from json import JSONEncoder


class FilmSeries:
    def __init__(self, title, genre, director, country, producer, cast, resume, img):
        self.title = title
        self.genre = genre
        self.director = director
        self.country = country
        self.producer = producer
        self.cast = cast
        self.resume = resume
        self.img = img


# subclass JSONEncoder
class FilmSeriesEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__
