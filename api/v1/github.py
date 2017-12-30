from flask import Blueprint, render_template, jsonify
from flask import current_app as app
from graphqlclient import GraphQLClient
from flask_dotenv import DotEnv
import json, random

github_route = Blueprint('github_route', __name__)


@github_route.route('/files')
def repositories():
    client = GraphQLClient('https://api.github.com/graphql')
    files = {'angular-instagram-website': 'master:assets/js/app/bpk-articles.js',
       'bash-recursive-jpg-rename': 'master:jpgRename.sh',
       'flask-react': 'master:webpack.config.js',
       'twitter-clone': 'master:spec/models/user_spec.rb',
       'premeetup-youtube-search': 'master:app/components/search/searchController.js',
       'intel-press-pdt-tool': 'feature/schedule_centric_design:PDTtool/update_tool_centos.sh',
       'knox-pro-api': 'master:routes/api/v1/articles.js',
       'hhg-logo': 'master:scripts.js'
       }
    client.token = app.config["CLIENT_TOKEN"]
    results = {}
    for repo, fileRef in files.iteritems():
        requestString = '''
            query { repository(name: "%s", owner: "benjaminknox") {
                object(expression: "%s") {
                    ... on Blob {
                        text
                    }
                }
            }}
        ''' % (repo, fileRef)
        request = json.loads(client.execute(requestString))
        results[repo] = {'use': 0,
           'reference': fileRef,
           'request': request
           }

    keys = results.keys()
    last = '2'
    i = 0
    while i < 3:
        key = None
        while True:
            key = keys[random.randrange(0, len(keys) - 1)]
            if key != last:
                break

        results[key]['use'] = 1
        i = i + 1
        last = key

    return jsonify(results)
