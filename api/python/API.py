from SPARQLWrapper import SPARQLWrapper, JSON
import Utils


class SPARQLCall:
    def __init__(self):
        self.sparql = SPARQLWrapper(
            "https://query.wikidata.org/sparql"
        )
        self.sparql.setReturnFormat(JSON)

    def get_Film(self, id):
        query = """
               select ?instance ?titre ?partoflabel ?directorlabel ?countrylabel ?datelist where
                {
                wd:Q14650496 wdt:P31 ?instance;
                             wdt:P1476 ?titre;
                             wdt:P179 ?partof;
                             wdt:P495 ?country;
                             wdt:P57 ?director;
                             p:P577 ?datelist.
                  ?datelist pq:P291 wd:Q30.
                  ?partof rdfs:label ?partoflabel.
                  ?director rdfs:label ?directorlabel.
                  ?country rdfs:label ?countrylabel.
                  VALUES ?instance {wd:Q11424}
                  FILTER ((lang(?partoflabel)="en") && (lang(?countrylabel)="en")  && (lang(?directorlabel)="en") )
                }
                        """.replace("%()s", id)
        self.sparql.setQuery(query)
        try:
            ret = self.sparql.queryAndConvert()
            return Utils.construct_film(ret, id)
        except Exception as e:
            print(e)

    def get_caractere(self, objet, relation):
        query = """
                select ?caract where
                {
                wd:%(objet)s wdt:%(relation)s ?caract.
                }
                """.replace("%(objet)s", objet).replace("%(relation)s", relation)
        self.sparql.setQuery(query)
        try:
            ret = self.sparql.queryAndConvert()
            return ret["results"]["bindings"][0]["caract"]["value"]
        except Exception as e:
            print(e)

    def get_result_search(self, enter):
        query = """
        select distinct ?object ?objectlabel ?objectinstance where
        {
        {
        ?object wdt:P31 wd:Q11424.
        }
        UNION
        {
        ?object wdt:P31 wd:Q24856.
        }
        UNION
        {
        ?object wdt:P31 wd:Q5.
        ?object wdt:P106 ?occupation.
        VALUES ?occupation { wd:Q10800557 wd:Q3282637 wd:Q10798782 wd:Q28389 wd:Q33999}
        }
        ?object rdfs:label ?objectlabel.
        ?object wdt:P31 ?objectinstance.
        VALUES ?objectinstance { wd:Q5 wd:Q24856 wd:Q11424 }
        FILTER ((lang(?objectlabel)="en") && regex(?objectlabel, "%()s"))
        }
        LIMIT 5
        """.replace("%()s", enter)
        self.sparql.setQuery(query)
        try:
            ret = self.sparql.queryAndConvert()
            return Utils.construct_separated_list_of_result(ret)
        except Exception as e:
            print(e)

    def get_all_movies_of_serie(self, serie):
        query = """
                select distinct ?f ?flabel where
                {
                ?f wdt:P179 wd:%()s;
                wdt:P31 wd:Q11424.
                ?f rdfs:label ?flabel.
                FILTER ((lang(?flabel)="en"))
                }
                """.replace("%()s", serie)
        self.sparql.setQuery(query)
        try:
            ret = self.sparql.queryAndConvert()
            return Utils.construct_list_films(ret)
        except Exception as e:
            print(e)

    def get_all_films_from_same_serie(self, film):
        query = """
                select distinct ?f ?flabel where
                {
                wd:%()s wdt:P179 ?serie.
                ?f wdt:P179 ?serie;
                wdt:P31 wd:Q11424.
                ?f rdfs:label ?flabel.
                FILTER ((?f != wd:%()s)&&(lang(?flabel)="en"))
                }
                        """.replace("%()s", film)
        self.sparql.setQuery(query)
        try:
            ret = self.sparql.queryAndConvert()
            return Utils.construct_list_films(ret)
        except Exception as e:
            print(e)
