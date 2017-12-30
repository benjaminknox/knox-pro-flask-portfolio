from flask import Flask, render_template
from flask_webpack import Webpack
from flask_dotenv import DotEnv

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

# Register REST API routes
app.register_blueprint(hero_route, url_prefix=apiRoute)
app.register_blueprint(github_route, url_prefix=apiRoute)
app.register_blueprint(linkedin_route, url_prefix=apiRoute)
