from flask import Blueprint, render_template, jsonify

hero_route = Blueprint('hero_route', __name__)

@hero_route.route('/hero')
def hero():
    return jsonify({
        'header':'Benjamin Knox',
        'tagLine': 'A Web App Developer'
    })
