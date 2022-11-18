import json
from SPARQLWrapper import SPARQLWrapper, JSON
from Film import Film, FilmEncoder
from FilmSeries import FilmSeries, FilmSeriesEncoder
import wikipedia
from bs4 import BeautifulSoup
import requests

from FilmSeries import FilmSeries
from Human import Human, HumanEncoder


def get_image_from_wikipedia(id, words):
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
    url = ""
    """try:
        url = "https://en.wikipedia.org/?curid=" + sparql.queryAndConvert()['results']['bindings'][0]['pageid']['value']
        print(sparql.queryAndConvert()['results']['bindings'])
    except Exception as e:
        print(e)

    get_url = requests.get(url)
    get_text = get_url.text
    soup = BeautifulSoup(get_text, "html.parser")
    title = soup.find_all(["h1"])[0].get_text()

    p = wikipedia.page(title, auto_suggest=False)

    imgs = p.images

    for i in imgs:
        if any(ext in i for ext in words):
            img = i
            break
    else:
        img = imgs[0]
    return img"""
    return ""


def construct_separated_list_of_result(ret, ret_movie, ret_serie):
    persons = []
    films = []
    films_series = []
    for r in ret["results"]["bindings"]:
        id = "wd:" + r['object']["value"].split("/")[-1]
        res = {"id": id, "name": r['objectlabel']["value"]}
        persons.append(res)

    """for r in ret_movie["results"]["bindings"]:
        id = "wd:" + r['object']["value"].split("/")[-1]
        res = {"id": id, "name": r['objectlabel']["value"]}
        films.append(res)

    for r in ret_serie["results"]["bindings"]:
        id = "wd:" + r['object']["value"].split("/")[-1]
        res = {"id": id, "name": r['objectlabel']["value"]}
        films_series.append(res)
"""
    result = {"personnes": persons}
    return json.dumps(result)


def construct_list_films(ret):
    films = []
    for r in ret["results"]["bindings"]:
        res = {"link": r['f']["value"], "name": r['flabel']["value"]}
        films.append(res)

    result = {"films": films}
    return json.dumps(result)


def construct_human(ret, id, ret_country, ret_metier, ret_prenoms, ret_movies):
    r = ret["results"]["bindings"][0]
    r_c = ret_country["results"]["bindings"][0]
    movies = []
    for m in ret_movies["results"]["bindings"]:
        movies.append([m['flabel']['value'], "wd:" + m['f']['value'].split("/")[-1]])
    prenoms = []
    for r_p in ret_prenoms["results"]["bindings"]:
        prenoms.append(r_p['firstnamelabel']['value'])

    name = r_c['namelabel']['value']
    sexe = r['genrelabel']['value']
    country = r_c['countrylabel']['value']
    birth = r['date']['value']
    r_m = ret_metier["results"]["bindings"]
    metiers = []
    for r_i in r_m:
        metiers.append(r_i['label']['value'])
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

    imgs = p.images
    img = ""
    elements = name.split(" ")
    for i in imgs:
        if any(ext in i for ext in elements):
            img = i
            break
    else:
        img = imgs[0]

    h = Human(name, sexe, img, country, birth, metiers, prenoms, movies)
    return json.dumps(h, cls=HumanEncoder)



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
    else:
        img = imgs[0]

    # franchise ou logo ou le titre ou wordmark
    f = FilmSeries(titre, genre, director, country, producers, casting, resume, img)
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
    else:
        img = imgs[0]

    f = Film(titre, part_of_serie, country, pub_date, director, screenwriter, cast_member, photograph,
             production_company, duration, review, plot, img, genres)
    return json.dumps(f, cls=FilmEncoder)
