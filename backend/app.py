from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('./Artworks.json', 'r') as f:
    data = json.load(f)


@app.route('/pages/<page>')
def api_root(page):
    print(len(data))
    page = int(page)
    if page > 0 and page < len(data)/100:
        d = [a for a in data if a['ThumbnailURL'] != None]
        return jsonify(d[100*(int(page)-1):100*int(page)])
    else:
        return jsonify({'msg': 'Page out of range'})


@app.route('/author/<author>')
def api_author(author):
    return jsonify(filter_by_author(author))


def filter_by_author(author):
    d = []
    for i in data:
        try:
            if author.lower() in ' '.join(i['Artist']).lower() and i['ThumbnailURL'] != None:
                d.append(i)
        except IndexError:
            pass

    return d


def get_all_authors():
    authors = []
    for i in data:
        try:
            for a in i['Artist']:
                if a not in authors:
                    authors.append(a)
        except IndexError:
            pass
    return authors


@app.route(rule='/authors')
def api_authors():
    with open('./Authors.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True)
