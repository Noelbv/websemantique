from SPARQLWrapper import SPARQLWrapper, JSON
import Utils


class SPARQLCall:
    def __init__(self):
        self.sparql = SPARQLWrapper(
            "https://query.wikidata.org/sparql"
        )
        self.sparql.setReturnFormat(JSON)

    def get_Human(self, id):
        query = """
        select ?instancelabel ?genrelabel ?date where
        {
        %()s wdt:P31 ?instance;
                     wdt:P21 ?genre;
                     wdt:P569 ?date.
          ?instance rdfs:label ?instancelabel.
          ?genre rdfs:label ?genrelabel.
          FILTER ((lang(?instancelabel)="en") && (lang(?genrelabel)="en") )
        }
        """.replace("%()s", id)

        # Genre
        query_country = """
        SELECT ?countrylabel ?namelabel WHERE {
          %()s wdt:P27 ?country;
            wdt:P734 ?name.
          ?country rdfs:label ?countrylabel.
          ?name rdfs:label ?namelabel.
          FILTER(((LANG(?namelabel)) = "en") && ((LANG(?countrylabel)) = "en"))
        }
        """.replace("%()s", id)

        #Metiers
        query_metier = """
        select  ?label where
        {
        %()s wdt:P31 ?instance;
                     wdt:P106?occupation.
          ?occupation rdfs:label ?label.
          VALUES ?instance {wd:Q5}
          FILTER ((lang(?label)="en") )
        }
        """.replace("%()s", id)

        # Prenoms
        query_prenoms = """
        SELECT ?firstnamelabel WHERE {
          %()s wdt:P735 ?firstname.
          ?firstname rdfs:label ?firstnamelabel.
          FILTER(((LANG(?firstnamelabel)) = "en"))
        }""".replace("%()s", id)

        try:
            self.sparql.setQuery(query)
            ret = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_country)
            ret_country = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_metier)
            ret_metier = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_prenoms)
            ret_prenoms = self.sparql.queryAndConvert()
            return Utils.construct_human(ret, id, ret_country, ret_metier, ret_prenoms)
        except Exception as e:
            print(e)

    def get_Film_Series(self, id):
        query = """
        select ?instancelabel ?titre ?countrylabel ?producerlabel  where
        {
        %()s wdt:P31 ?instance;
                     wdt:P1705 ?titre;
                     wdt:P495 ?country;
                     wdt:P162 ?producer.
          ?country rdfs:label ?countrylabel.
          ?instance rdfs:label ?instancelabel.
          ?producer rdfs:label ?producerlabel.
          VALUES ?instance {wd:Q24856}  
          FILTER ((lang(?countrylabel)="en")  && (lang(?producerlabel)="en") && (lang(?instancelabel)="en"))
        }
        """.replace("%()s", id)

        # Genres
        query_genres = """
        select  ?genrelabel where
        {
        %()s wdt:P31 ?instance;
                     wdt:P136 ?genre.
          ?genre rdfs:label ?genrelabel.
          VALUES ?instance {wd:Q24856}
          FILTER ((lang(?genrelabel)="en") )
        } LIMIT 10
        """.replace("%()s", id)

        # Casting
        query_cast = """
        select  ?objectlabel where
        {
        %()s wdt:P31 ?instance;
                     wdt:P161 ?list.
          ?list rdfs:label ?objectlabel.
          VALUES ?instance {wd:Q24856}
          FILTER ((lang(?objectlabel)="en") )
        } LIMIT 10
        """.replace("%()s", id)

        # Producers
        query_producers = """
        select  ?objectlabel where
        {
        %()s wdt:P31 ?instance;
                     wdt:P162 ?list.
          ?list rdfs:label ?objectlabel.
          VALUES ?instance {wd:Q24856}
          FILTER ((lang(?objectlabel)="en") )
        } LIMIT 10
        """.replace("%()s", id)

        try:
            self.sparql.setQuery(query)
            ret = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_genres)
            ret_genres = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_cast)
            ret_cast = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_producers)
            ret_producer = self.sparql.queryAndConvert()
            return Utils.construct_film_series(ret, id, ret_genres, ret_cast, ret_producer)
        except Exception as e:
            print(e)

    def get_Film(self, id):
        query = """
               select ?instance ?titre ?partoflabel ?directorlabel ?countrylabel ?datelist where
                {
                %()s wdt:P31 ?instance;
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

        # Genres
        query_genres = """
        select  ?genrelabel where
        {
        %()s wdt:P31 ?instance;
                     wdt:P136 ?genre.
          ?genre rdfs:label ?genrelabel.
          VALUES ?instance {wd:Q11424}
          FILTER ((lang(?genrelabel)="en") )
        }""".replace("%()s", id)

        # Casting
        query_cast = """
        select  ?objectlabel where
        {
        %()s wdt:P31 ?instance;
                     wdt:P161 ?list.
          ?list rdfs:label ?objectlabel.
          VALUES ?instance {wd:Q11424}
          FILTER ((lang(?objectlabel)="en") )
        } LIMIT 10""".replace("%()s", id)

        # Scénaristes
        query_scenaristes = """
        select  ?objectlabel where
        {
        %()s wdt:P31 ?instance;
                     wdt:P58 ?list.
          ?list rdfs:label ?objectlabel.
          VALUES ?instance {wd:Q11424}
          FILTER ((lang(?objectlabel)="en") )
        } LIMIT 5""".replace("%()s", id)

        # Photographes
        query_photo = """
        select  ?objectlabel where
        {
        %()s wdt:P31 ?instance;
                     wdt:P344 ?list.
          ?list rdfs:label ?objectlabel.
          VALUES ?instance {wd:Q11424}
          FILTER ((lang(?objectlabel)="en") )
        }""".replace("%()s", id)

        # Compagnies de production
        query_production_comp = """
        select  ?objectlabel where
        {
        %()s wdt:P31 ?instance;
                     wdt:P272 ?list.
          ?list rdfs:label ?objectlabel.
          VALUES ?instance {wd:Q11424}
          FILTER ((lang(?objectlabel)="en") )
        }""".replace("%()s", id)

        query_dur_review = """
        select ?label ?datelabel where
        {
        %()s wdt:P31 ?instance;
                     p:P444 ?node;
                     p:P577 ?datenode.
          ?node pq:P459 wd:Q108403540;
           ps:P444 ?label.
          ?datenode pq:P291 wd:Q30;
                    ps:P577 ?datelabel.
          VALUES ?instance {wd:Q11424}
        }""".replace("%()s", id)
        try:
            self.sparql.setQuery(query)
            ret = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_genres)
            ret_genres = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_cast)
            ret_cast = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_scenaristes)
            ret_scen = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_photo)
            ret_photo = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_production_comp)
            ret_prod_comp = self.sparql.queryAndConvert()
            self.sparql.setQuery(query_dur_review)
            ret_dur_review = self.sparql.queryAndConvert()
            return Utils.construct_film(ret, id, ret_genres, ret_cast, ret_scen, ret_photo, ret_prod_comp,
                                        ret_dur_review)
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

    def get_result_search(self, enter, limit):
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
        LIMIT %(limit)s
        """.replace("%()s", enter).replace("%(limit)s", limit)
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
