def create_app(test_config=None):
    import os
    import logging.config
    from wsgiref.util import request_uri

    from pkg_resources import get_entry_map
    from .utils.PaySystemsPrice import PaySystemsPrice
    from flask import Flask, render_template, ctx, render_template_string, request, redirect, url_for, jsonify


    psa = Flask(__name__, instance_relative_config=True, template_folder="templates", static_url_path="/static", static_folder="static")
    psa.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(psa.instance_path, 'database.sqlite')
    )

    if test_config is None:
        psa.config.from_file(
            'config.py',
            silent=True,
            load=open,
        )
    else:
        psa.config.from_mapping(test_config)
    
    try:
        os.makedirs(psa.instance_path)
    except OSError:
        pass

    @psa.route("/", methods=["GET"])
    def index():
        try:
            with request:
                return render_template("index.html")
        except Exception as error:
            print(error)

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
                    print(error)

            else:
                system = PaySystemsPrice(system, country_src, currency_src, country_dst, currency_dst, amount)        
                return jsonify(system.get_dict())

    @psa.route("/ip")
    def view_origin():
        """Returns the requester's IP Address.
        ---
        tags:
        - Request inspection
        produces:
        - psalication/json
        responses:
        200:
            description: The Requester's IP Address.
        """

        return jsonify(origin=request.headers.get("X-Forwarded-For", request.remote_addr))
    

    return psa