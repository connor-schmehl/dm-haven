from flask import Flask
from flask import request
from flask import Response
from google.oauth2 import id_token
from google.auth.transport import requests
import time

app = Flask(__name__)
CLIENT_ID = '329578885504-fdhgbm69bgqcj3seolbuu8jjlt8na89j.apps.googleusercontent.com'

@app.route('/login', methods=['GET'])
def login():
    if not authenticate(login=True):
        return Response("access denied", status=403, mimetype='application/json')
    res = Response("successfully logged in", status=200, mimetype='application/json')
    res.set_cookie('credential')
    return 
    
def authenticate(login = False):
    csrf_token_cookie = request.cookies.get('g_csrf_token')
    if not csrf_token_cookie:
        return False
    csrf_token_body = request.get('g_csrf_token')
    if not csrf_token_body:
        return False
    if csrf_token_cookie != csrf_token_body:
        return False
    try:
        if login:
            token = this.request.form['credential']
        else:
            token = this.request.get_cookie['credential']
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        userid = idinfo['sub']
    except:
        return False
    return True