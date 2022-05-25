import os
import logging.config
from wsgiref.util import request_uri
from webapp.utils.PaySystemsPrice import PaySystemsPrice
from webapp.settings.logging import LOGGING
from flask import Flask, make_response, render_template, ctx, request, redirect, url_for, jsonify


logging.config.dictConfig(LOGGING)
l = logging.getLogger("my_logger")


app = Flask("pay-systems/webapp", static_url_path="/webapp/static", static_folder="webapp/static")


@app.route("/", methods=["GET"])
def index(**user_ip):
    try:
        with request:
            if not user_ip:
                return redirect(url_for(".exchange_price", system_idx=1, country_src_idx=1, currency_src="R", country_dst_idx=0, currency_dst="S", amount=1000))
            else:
                return redirect("/user_ip")                
    except Exception as e:
        l.warning(e)

@app.route('/api/exchange-price/<system_idx>/<country_src_idx>/<currency_src>/<country_dst_idx>/<currency_dst>/<amount>', methods=["GET"])
def exchange_price(system_idx, country_src_idx, currency_src, country_dst_idx, currency_dst, amount):
    with request:
        if int(system_idx) == 0:
            contact = PaySystemsPrice(system_idx, country_src_idx, currency_src, country_dst_idx, currency_dst, amount)
            return jsonify(contact.get_dict())
        if int(system_idx) == 1:
            unistream = PaySystemsPrice(system_idx, country_src_idx, currency_src, country_dst_idx, currency_dst, amount)
            return jsonify(unistream.get_dict())
        if int(system_idx) == 2:
            koronapay = PaySystemsPrice(int(system_idx), int(country_src_idx), currency_src, int(country_dst_idx), currency_dst, int(amount))
            return jsonify(koronapay.get_dict())
        
        if int(system_idx) == 6: 
            data = {}
            system_idx = [0, 1, 2]
            for idx in system_idx:
                if int(idx) == 0:
                    koronapay = PaySystemsPrice(int(idx), country_src_idx, currency_src, country_dst_idx, currency_dst, amount)
                if int(idx) == 2:
                    contact = PaySystemsPrice(int(idx), country_src_idx, currency_src, country_dst_idx, currency_dst, amount)
                if int(idx) == 1:
                    unistream = PaySystemsPrice(int(idx), country_src_idx, currency_src, country_dst_idx, currency_dst, amount)
            data["koronapay"] = jsonify(koronapay.get_dict())
            data["contact"] = jsonify(contact.get_dict())
            data["unistream"] = jsonify(unistream.get_dict())
            return jsonify(data)


@app.route("/user_ip", methods=["GET"])
def get_user_ip():
    with request:
        if "X-Forwarded-For" in request.headers.keys():
            client_ip = request.headers["X-Forwarded-For"]
            l.info(f"{client_ip}")
            return redirect(request.url, client_ip=client_ip)
        
@app.route("/test")
def test():
    with app.test_request_context():
        ex = make_response(url_for(exchange_price(system_idx=6, country_src_idx=1, currency_src="P", country_dst_idx=0, currency_dst="S", amount=1000)))
        return app.test_request_context(ex)



if __name__ == '__main__':

    
    port = int(os.environ.get('PORT', 5000))

    app.run(host='0.0.0.0', port=port, debug=True, load_dotenv=True)
    # app.test_request_context(make_response(url_for(".exchange_price")))


