import json
from SPARQLWrapper import SPARQLWrapper, JSON
from Film import Film, FilmEncoder
from FilmSeries import FilmSeries, FilmSeriesEncoder
import wikipedia
from bs4 import BeautifulSoup
import requests

from FilmSeries import FilmSeries


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


def construct_film_series(ret, id, ret_genre, ret_cast, ret_producers):
    r = ret["results"]["bindings"][0]
    titre = r['titre']['value']
    country = r['countrylabel']['value']
    director = r['producerlabel']['value']

    genre = []
    for re in ret_genre["results"]["bindings"]:
        genre.append(re['genrelabel']['value'])

    casting = []
    for re in ret_cast["results"]["bindings"]:
        casting.append(re['objectlabel']['value'])

    producers = []
    for re in ret_producers["results"]["bindings"]:
        producers.append(re['objectlabel']['value'])

    query = """
                SELECT ?pageid WHERE {
                VALUES (?item) {(%()s)} 
                [ schema:about ?item ; schema:name ?name ;
                  schema:isPartOf <https://en.wikipedia.org/> ]
                 SERVICE wikibase:mwapi {
                     bd:serviceParam wikibase:endpoint "en.wikipedia.org" .
                     bd:serviceParam wikibase:api "Generator" .
                     bd:serviceParam mwapi:generator "allpages" .
                     bd:serviceParam mwapi:gapfrom ?name .
                     bd:serviceParam mwapi:gapto ?name .
                     ?pageid wikibase:apiOutput "@pageid" .
                }
            }""".replace("%()s", id)
    sparql = SPARQLWrapper(
        "https://query.wikidata.org/sparql"
    )
    sparql.setReturnFormat(JSON)
    sparql.setQuery(query)
    try:
        url = "https://en.wikipedia.org/?curid=" + sparql.queryAndConvert()['results']['bindings'][0]['pageid']['value']
    except Exception as e:
        print(e)

    get_url = requests.get(url)
    get_text = get_url.text
    soup = BeautifulSoup(get_text, "html.parser")
    title = soup.find_all(["h1"])[0].get_text()

    p = wikipedia.page(title, auto_suggest=False)
    resume = p.summary

    imgs = p.images
    img = ""
    for i in imgs:
        if "poster" in i or "logo" in i or "wordmark" in i or title in i:
            img = i
            break

    # franchise ou logo ou le titre ou wordmark
    f = FilmSeries(titre, country, director, genre, producers, casting, resume, img)
    return json.dumps(f, cls=FilmSeriesEncoder)


def construct_film(ret, id, ret_genre, ret_cast, ret_scen, ret_photo, ret_prod_comp, ret_dur_review):
    r = ret["results"]["bindings"][0]
    titre = r['titre']['value']
    country = r['countrylabel']['value']
    director = r['directorlabel']['value']

    part_of_serie = ""
    if 'partoflabel' in r:
        part_of_serie = r['partoflabel']['value']

    pub_date = ret_dur_review["results"]["bindings"][0]['datelabel']['value']
    duration = ""
    review = ret_dur_review["results"]["bindings"][0]['label']['value']

    genres = []
    for r in ret_genre["results"]["bindings"]:
        genres.append(r['genrelabel']['value'])

    cast_member = []
    for r in ret_cast["results"]["bindings"]:
        cast_member.append(r['objectlabel']['value'])

    screenwriter = []
    for r in ret_scen["results"]["bindings"]:
        screenwriter.append(r['objectlabel']['value'])

    photograph = []
    for r in ret_photo["results"]["bindings"]:
        photograph.append(r['objectlabel']['value'])

    production_company = []
    for r in ret_prod_comp["results"]["bindings"]:
        production_company.append(r['objectlabel']['value'])

    query = """
            SELECT ?pageid WHERE {
            VALUES (?item) {(%()s)} 
            [ schema:about ?item ; schema:name ?name ;
              schema:isPartOf <https://en.wikipedia.org/> ]
             SERVICE wikibase:mwapi {
                 bd:serviceParam wikibase:endpoint "en.wikipedia.org" .
                 bd:serviceParam wikibase:api "Generator" .
                 bd:serviceParam mwapi:generator "allpages" .
                 bd:serviceParam mwapi:gapfrom ?name .
                 bd:serviceParam mwapi:gapto ?name .
                 ?pageid wikibase:apiOutput "@pageid" .
            }
        }""".replace("%()s", id)
    sparql = SPARQLWrapper(
        "https://query.wikidata.org/sparql"
    )
    sparql.setReturnFormat(JSON)
    sparql.setQuery(query)
    try:
        url = "https://en.wikipedia.org/?curid=" + sparql.queryAndConvert()['results']['bindings'][0]['pageid']['value']
    except Exception as e:
        print(e)

    get_url = requests.get(url)
    get_text = get_url.text
    soup = BeautifulSoup(get_text, "html.parser")
    title = soup.find_all(["h1"])[0].get_text()

    p = wikipedia.page(title, auto_suggest=False)
    plot = p.content.split("== Plot ==")[1].split("==")[0]

    imgs = p.images
    img = ""
    for i in imgs:
        if "poster" in i:
            img = i
            break

    f = Film(titre, part_of_serie, country, pub_date, director, screenwriter, cast_member, photograph,
             production_company, duration, review, plot, img, genres)
    return json.dumps(f, cls=FilmEncoder)
