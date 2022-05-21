import time, datetime
from subprocess import getoutput

from flask import request

def cleaned_result(command: str, system: str) -> dict:
    with request:
        
        dt = {
            "year": datetime.datetime.now().utcnow().year,
            "month": datetime.datetime.now().utcnow().month,
            "day": datetime.datetime.now().utcnow().day,
            "hour": datetime.datetime.now().utcnow().hour,
            "minute": datetime.datetime.now().utcnow().minute,
        }

        if (system == "contact"):
            prices = dict(eval(getoutput(command)))["result"]
            for item in prices:
                if (item["from"] != "643") or (item["to"] != "840"):
                    continue
                price = item["rate"]
                break
            
            return {
                "system": system,
                "price": price,
                "datetime": dt,
                "time": time.time()
            }
        
        elif (system == "unistream"):
            price = dict(eval(getoutput(command)))["acceptedAmount"]
            
            return {
                "system": system,
                "price": price,
                "datetime": dt,
                "time": time.time()
            }
        
        elif (system == "koronapay"):
            price = dict(eval(getoutput(command)))["exchangeRate"]

            return {
                "system": system,
                "price": price,
                "datetime": dt,
                "time": time.time()
            }