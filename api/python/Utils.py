import json
from Film import Film, FilmEncoder


def construct_separated_list_of_result(ret):
    persons = []
    films = []
    films_series = []
    for r in ret["results"]["bindings"]:
        res = {"link": r['object']["value"], "name": r['objectlabel']["value"]}
        if r['objectinstance']['value'] == 'http://www.wikidata.org/entity/Q5':
            persons.append(res)
        elif r['objectinstance']['value'] == 'http://www.wikidata.org/entity/Q24856':
            films_series.append(res)
        elif r['objectinstance']['value'] == 'http://www.wikidata.org/entity/Q11424':
            films.append(res)

    result = {"personnes": persons, "films": films, "film_series": films_series}
    return json.dumps(result)


def construct_list_films(ret):
    films = []
    for r in ret["results"]["bindings"]:
        res = {"link": r['f']["value"], "name": r['flabel']["value"]}
        films.append(res)

    result = {"films": films}
    return json.dumps(result)


def construct_film(ret):
    r = ret["results"]["bindings"][0]
    titre = r['titre']['value']
    country = r['country']['value']
    director = r['director']['value']
    screenwriter = r['screenwriter']['value']
    photograph = r['photograph']['value']
    part_of_serie = ""
    if 'partof' in r:
        part_of_serie = r['partof']['value']
    pub_date = r['date']['value']
    cast_member = r['cast']['value']
    production_company = r['production']['value']
    duration = r['duration']['value']
    review = r['review']['value']


    # title, part_of_series, country, pub_date, director, screenwriter, cast_member,
    # director_photography, production_company, duration, review, resume, photo):
    f = Film(titre, part_of_serie, country, pub_date, director, screenwriter, cast_member, photograph,
             production_company, duration, review, "", "")
    return json.dumps(f, cls=FilmEncoder)
