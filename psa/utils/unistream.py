country_dest = "KAZ"
amount = "1"
currency_dest_name = "USD"
def unistream(currency_src, country_dst,currency_dst,amount):
    return f"""curl -s 'https://online.unistream.ru/card2cash/calculate?destination={country_dst}&amount={amount}&currency={currency_dst["NAME"]}&accepted_currency={currency_src["NAME"]}&profile=unistream_front' \
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