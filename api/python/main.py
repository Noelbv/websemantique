import API
import sys


def main():
    a = API.SPARQLCall()
    fct = sys.argv[1]

    if fct == "0":
        # Resultat de recherche
        print(a.get_result_search(sys.argv[2]))
    elif fct == "1":
        # Récupérer les films d'une série
        print(a.get_all_movies_of_serie(sys.argv[2]))
    elif fct == "2":
        # Récupérer les films d'une même série qu'un film donné
        print(a.get_all_films_from_same_serie(sys.argv[2]))
    elif fct == "3":
        # Récupérer les films d'une même série qu'un film donné
        print(a.get_Film(sys.argv[2]))


main()
