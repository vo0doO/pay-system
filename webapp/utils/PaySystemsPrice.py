import time, datetime
from subprocess import getoutput
from webbrowser import get
from flask import request
from webapp.settings.logging import LOGGING
import logging.config


logging.config.dictConfig(LOGGING)
l = logging.getLogger("my_logger")

class PaySystemsPrice:
    """Класс имеющий методы для возвращаюшие стоимость
    перевода по системам: Контакт, Золотая Корона, 
    Юнистреам.
    
    Для успешнго получения цены необходимо
    сформировать строку запроса из параместров:
        @country_dst: Страна получения ["KAZ", "RUS", "UZB"]
        @country_src: Страна отправиления ["KAZ", "RUS", "UZB"]
        @currency_src: Валюта отправления S или Р
        @currency_dst: Валюта получения
        @amount: Сумма

    Так как разные платежные систему в качестве параметров запроса требуют
    разные фильтры и разные типы одинаковых значений. В качестве статических параметров
    класса объявленны словари доступных вариантов параметров.



    Returns:
        _type_: стоимость по всем возможным комбинациям переводов из представленных вариантов
    """


    CURRENCY = {
        "S" :{
            "NAME": "USD",
            "ID": 840,
            "CID": 840,
            "IDX": 1,
            },
        "R": {
            "NAME": "RUB",
            "ID": 810,
            "CID": 643,
            "IDX": 2,
        }    
    }

    CURRENCY_AS_LIST = {
            "NAMES": ["USD","RUB"],
            "ID": [840, 810],
            "CID": [840, 643],
    }

    SYSTEMS = ["contact", "unistream", "koronapay"]

    COUNTRIES = ["KAZ", "RUS", "UZB"]


    def __init__(self, system_idx, country_src_idx, currency_src, country_dst_idx, currency_dst, amount):
        self.amount = int(amount)
        self.currency_src = PaySystemsPrice.CURRENCY[currency_src]
        self.currency_dst = PaySystemsPrice.CURRENCY[currency_dst]
        self.system = PaySystemsPrice.SYSTEMS[int(system_idx)]
        self.country_dst = PaySystemsPrice.COUNTRIES[int(country_dst_idx)]
        self.country_src = PaySystemsPrice.COUNTRIES[int(country_src_idx)]

    def command(self):
        
        if self.system == 'koronapay':
            return f"""curl -s 'https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId={self.country_src}&sendingCurrencyId={self.currency_src["ID"]}&receivingCountryId={self.country_dst}&receivingCurrencyId={self.currency_dst["ID"]}&paymentMethod=debitCard&receivingAmount={self.amount}&receivingMethod=cash&paidNotificationEnabled=true' \
                -H 'authority: koronapay.com' \
                -H 'accept: application/vnd.cft-data.v2.82+json' \
                -H 'accept-language: ru' \
                -H 'cache-control: no-cache' \
                -H 'cookie: _gcl_au=1.1.1015475964.1652277766; _ga=GA1.2.308647720.1652277854; _ym_uid=16522778561059353062; _ym_d=1652277856; tmr_lvid=0668be386ac76566d3fb1818ee1af648; tmr_lvidTS=1652277856534; _gid=GA1.2.744022738.1652427793; _ym_isad=2; _fbp=fb.1.1652427964556.22806925; qpay-web/3.0_locale=ru; tmr_detect=0%7C1652482502191; tmr_reqNum=24; _dc_gtm_UA-100141486-1=1; _dc_gtm_UA-100141486-2=1; _dc_gtm_UA-100141486-25=1; _dc_gtm_UA-100141486-26=1; _ym_visorc=b; _gali=changeable-field-input-amount; ROUTEID=d32d92401831bd3c|Yn8LR; qpay-web/3.0_csrf-token-v2=9aa273f52588f08d12fb613d509647bb' \
                -H 'pragma: no-cache' \
                -H 'referer: https://koronapay.com/transfers/online/' \
                -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"' \
                -H 'sec-ch-ua-mobile: ?0' \
                -H 'sec-ch-ua-platform: "Windows"' \
                -H 'sec-fetch-dest: empty' \
                -H 'sec-fetch-mode: cors' \
                -H 'sec-fetch-site: same-origin' \
                -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36' \
                -H 'x-application: Qpay-Web/3.0' \
                -H 'x-csrf-token: 9aa273f52588f08d12fb613d509647bb' \
                --compressed | jq .[0]"""
        
        elif self.system == 'unistream':
            return f"""curl -s 'https://online.unistream.ru/card2cash/calculate?destination={self.country_dst}&amount={self.amount}&currency={self.currency_dst["NAME"]}&accepted_currency={self.country_src}&profile=unistream_front' \
                -H 'Accept: application/json' \
                -H 'Accept-Language: ru' \
                -H 'Cache-Control: no-cache' \
                -H 'Connection: keep-alive' \
                -H 'Origin: https://unistream.ru' \
                -H 'Pragma: no-cache' \
                -H 'Referer: https://unistream.ru/' \
                -H 'Sec-Fetch-Dest: empty' \
                -H 'Sec-Fetch-Mode: cors' \
                -H 'Sec-Fetch-Site: same-site' \
                -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36' \
                -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"' \
                -H 'sec-ch-ua-mobile: ?0' \
                -H 'sec-ch-ua-platform: "Windows"' \
                --compressed | jq .fees[0]"""

    def get_dict(self) -> dict:
        try:        
            with request:
                dt = {
                    "year": datetime.datetime.now().utcnow().year,
                    "month": datetime.datetime.now().utcnow().month,
                    "day": datetime.datetime.now().utcnow().day,
                    "hour": datetime.datetime.now().utcnow().hour,
                    "minute": datetime.datetime.now().utcnow().minute,
                }
                l.info("Hello")
                if (self.system == "contact"):
                    prices = dict(eval(getoutput(self.command())))["result"]
                    for item in prices:
                        if (item["from"] != self.country_src["CDI"]) or (self.country_dst["CDI"] != "840"):
                            continue
                        price = item["rate"]
                        break
                    
                    return {
                        "system": self.system,
                        "price": price,
                        "datetime": dt,
                        "time": time.time()
                    }

                elif (self.system == "unistream"):
                    price = dict(eval(getoutput(self.command())))
                    price = price["acceptedAmount"]
                    return {
                        "system": self.system,
                        "price": price,
                        "datetime": dt,
                        "time": time.time()
                    }

                elif (self.system == "koronapay"):
                    price = dict(eval(getoutput(self.command())))
                    price = price["exchangeRate"]
                    return {
                        "system": self.system,
                        "price": price,
                        "datetime": dt,
                        "time": time.time()
                    }
        
        except Exception as error:
            print(error.with_traceback.__text_signature__())
            return f"{error.with_traceback.__text_signature__()}"