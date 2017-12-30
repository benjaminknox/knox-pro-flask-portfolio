import json, random, urllib2
import httplib, re
from flask import Blueprint, render_template, jsonify

linkedin_route = Blueprint('linkedin_route', __name__)

@linkedin_route.route('/recommendations')
def recommendations():
    return jsonify({
        
    })
