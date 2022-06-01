import os
import logging.config
from wsgiref.util import request_uri

from pkg_resources import get_entry_map
from utils.PaySystemsPrice import PaySystemsPrice
from settings import LOGGING
from flask import Flask, render_template, ctx, render_template_string, request, redirect, url_for, jsonify


logging.config.dictConfig(LOGGING)
l = logging.getLogger("crawler_logger")


psa = Flask(__name__, template_folder="templates", static_url_path="/static", static_folder="static")


@psa.route("/", methods=["GET"])
def index():
    try:
        with request:
            return render_template("index.html")
    except Exception as error:
        l.error(error)


@psa.route('/api/exchange-price/<system>/<country_src>/<currency_src>/<country_dst>/<currency_dst>/<amount>', methods=["GET"])
def exchange_price(system, country_src, currency_src, country_dst, currency_dst, amount):
    with request:        
        if system == "all": 
            try:
                data = {}
                for system in PaySystemsPrice.SYSTEMS:
                    result = PaySystemsPrice(system, country_src, currency_src, country_dst, currency_dst, amount)
                    data[system] = result.get_dict()
                return jsonify(data)
            except Exception as error:
                l.error(error)

        else:
            system = PaySystemsPrice(system, country_src, currency_src, country_dst, currency_dst, amount)        
            return jsonify(system.get_dict())


@psa.route("/user_ip", methods=["GET"])
def get_user_ip():
    with request:
        try:
            if "X-Forwarded-For" in request.headers.keys():
                client_ip = request.headers["X-Forwarded-For"]
            else:
                client_ip = ""
            l.info(f"{client_ip}")
            return redirect(request.url)
        except Exception as error:
                l.error(error)



if __name__ == '__main__':
    try:
        port = int(os.environ.get('PORT', 5005))
        psa.testing = True
        client = psa.test_client(5000)
        psa.run(host='0.0.0.0', port=port, debug=True, load_dotenv=True)
        # app.test_request_context(make_response(url_for(".exchange_price")))
    except Exception as error:
        l.error(error)

