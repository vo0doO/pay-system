from crypt import methods
import os
import re
from wsgiref.util import request_uri
from flask import Flask, render_template, request_tearing_down, session, ctx, request, redirect, url_for, current_app, jsonify
import subprocess
from utils.unistream import unistream
from utils.koronapay import koronapay
from utils.contact import contact
from utils.get_command import cleaned_result
from collections import OrderedDict

app = Flask(__name__, static_folder="./static", )


# @app.template_global("get_user_ip")
# def get_user_ip():
#     user_ips = []
#     with request:
#         for item in request.headers["X-Forvarded-For"]:
#             user_ips.append(item)
#         return user_ips

@app.route("/", methods=["GET"])
def index(**user_ip):
    with request:
        if not user_ip:
            return redirect('/api/exchange-price')
        else:
            return redirect("/user_ip")


@app.route('/api/exchange-price', methods=["GET"])
def exchange_price():
    data = {}
    with request:
        data["koronapay"] = cleaned_result(koronapay, "koronapay"),
        data["contact"] = cleaned_result(contact, "contact"),
        data["unistream"] = cleaned_result(unistream, "unistream"),
        return jsonify(data)


@app.route("/user_ip", methods=["GET"])
def get_user_ip():
    with request:
        if "X-Forwarded-For" in request.headers.keys():
            client_ip = request.headers["X-Forwarded-For"]
            return redirect(request.url, client_ip=client_ip)


@app.route('/koronapay')
def get_koronapay():
    return jsonify(cleaned_result(koronapay, "koronapay"))


@app.route('/unistream')
def get_unistream():
    return jsonify(cleaned_result(unistream, "unistream"))

@app.route('/contact')
def get_contact():
    return jsonify(cleaned_result(contact, "contact"))


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    import webbrowser
    app.run(host='0.0.0.0', port=port, debug=True, load_dotenv=True)
    webbrowser.Chrome.open_new_tab("http://localhost:5000/")
