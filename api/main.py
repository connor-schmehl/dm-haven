from flask import Flask, request, Response, redirect
from google.oauth2 import id_token
from google.auth.transport import requests
from google.cloud import secretmanager
import jwt
import time

app = Flask(__name__)
CLIENT_ID = '329578885504-fdhgbm69bgqcj3seolbuu8jjlt8na89j.apps.googleusercontent.com'
secret_client = secretmanager.SecretManagerServiceClient()

@app.route('/login', methods=['POST'])
def login():
    csrf_token_cookie = request.cookies.get('g_csrf_token')
    if not csrf_token_cookie:
        return Response('access denied', status=403, mimetype='application/json')
    csrf_token_body = request.get('g_csrf_token')
    if not csrf_token_body:
        return Response('access denied', status=403, mimetype='application/json')
    if csrf_token_cookie != csrf_token_body:
        return Response('access denied', status=403, mimetype='application/json')
    try:
        token = this.request.form['credential']
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        jwt_token = generate_jwt({'sub': idinfo['email'], 'iat': int(time.time()), 'exp': int(time.time()) + 2592000}) #tokens are valid for a month
        resp = Response(redirect('/'), status=200, mimetype='application/json')
        resp.set_cookie('dm-haven-token', jwt_token, httponly=True, secure=True)
        resp.set_cookie('dm-haven-logged-in', "true", httponly=False)
        return resp
    except:
        return Response('access denied', status=403, mimetype='application/json')

def authenticate(jwt_token):
    return jwt.decode(jwt_token, get_jwt_signing_key(), algorithm='HS256')
    
def generate_jwt(payload):
    return jwt.encode(payload, get_jwt_signing_key(), algorithm='HS256')

def get_jwt_signing_key():
    

    name = 'projects/dm-haven/secrets/jwt_signing_key/versions/1'

    response = secret_client.access_secret_version(request={'name': name})

    key = response.payload.data.decode('UTF-8')
    return key

#gcloud support: 1-877-355-5787