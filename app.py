from flask import Flask, render_template, Response
from flask_webpack import Webpack
from flask_dotenv import DotEnv
from time import sleep
import random

from api.v1.hero import hero_route
from api.v1.github import github_route
from api.v1.linkedin import linkedin_route


app = Flask(__name__)

env = DotEnv(app)

apiRoute = '/api/v1'

app.config.update(
  DEBUG=True,
  WEBPACK_MANIFEST_PATH='./webkit-build/manifest.json'
)

webpack = Webpack()
webpack.init_app(app)

@app.route('/')
@app.route('/<section>')
def home(section="top"):
  return render_template('app.html', section=section)

@app.route('/test')
def test():
  return render_template('test.html')

@app.route('/test.csv')
def testCsv():
  sleep(10)
  csv='header1,header2,header3,header4,header5,header6\n';

  i = 0
  while i < 4000000:
    csv+=str(random.randrange(3000,20000)) + ","
    csv+=str(random.randrange(3000,20000)) + ","
    csv+=str(random.randrange(3000,20000)) + ","
    csv+=str(random.randrange(3000,20000)) + ","
    csv+=str(random.randrange(3000,20000)) + ","
    csv+=str(random.randrange(3000,20000)) + "\n"
    i = i + 1
  
  return Response(csv, mimetype='text/csv', 
                  headers={"Content-disposition": "attachment; filename=test.csv"})

# Register REST API routes
app.register_blueprint(hero_route, url_prefix=apiRoute)
app.register_blueprint(github_route, url_prefix=apiRoute)
app.register_blueprint(linkedin_route, url_prefix=apiRoute)
