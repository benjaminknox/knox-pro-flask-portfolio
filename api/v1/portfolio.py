from flask import Blueprint, render_template, jsonify

portfolio_route = Blueprint('portfolio_route', __name__)

@portfolio_route.route('/portfolio')
def portfolio():
    return jsonify({
        'header':'Portfolio',
        'websites':
            [
                {
                    'name': 'Handy Home Guys',
                    'website': 'www.handyhomeguys.com',
                    'image': '/images/site-thumbnails/hhg.jpg'
                },
                {
                    'name': 'Maharashtra Baptist Society',
                    'website': 'www.mbsindia.org',
                    'image': '/images/site-thumbnails/mbsindia.svg'
                }
            ]
    })
