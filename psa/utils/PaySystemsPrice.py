import time, datetime

from flask import request
from utils.koronapay import koronapay
from utils.unistream import unistream
from utils.contact import contact
from subprocess import getoutput
# import logging
# from settings.logging import LOGGING
# import logging.config


# logging.config.dictConfig(LOGGING)
# l = logging.getLogger("my_logger")

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
    
    from operator import ge
    def command(self):
        
        if self.system == 'koronapay':
            return koronapay(self.country_src, self.currency_src["ID"], self.country_dst, self.currency_dst["ID"], self.amount)
        
        elif self.system == 'unistream':
            return unistream(self.currency_src, self.country_dst,self.currency_dst,self.amount)
        
        elif self.system == 'contact':
            return contact()


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