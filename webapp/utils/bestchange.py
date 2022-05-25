import requests
import uuid
count = 0
max_count = 99999999999
while count < max_count:
    try:
        u = uuid.uuid4()
        url = f"http://ext.avalon.ru/QTest/Assessment/?id={u}"
        r = requests.get(url)
        count = count + 1
        print(resp.body)
        continue
    except Exception as e:
        print(e)
        continue