def koronapay(country_src, currency_src_id, country_dest, currency_dest_id, amount):
    return f"""curl -s "https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId={country_src}&sendingCurrencyId={currency_src_id}&receivingCountryId={country_dest}&receivingCurrencyId={currency_dest_id}&paymentMethod=debitCard&receivingAmount={amount}&receivingMethod=cash&paidNotificationEnabled=true" \
      -H "authority: koronapay.com" \
      -H "accept: application/vnd.cft-data.v2.82+json" \
      -H "accept-language: ru" \
      -H "cache-control: no-cache" \
      -H "cookie: _gcl_au=1.1.1015475964.1652277766; _ga=GA1.2.308647720.1652277854; _ym_uid=16522778561059353062; _ym_d=1652277856; tmr_lvid=0668be386ac76566d3fb1818ee1af648; tmr_lvidTS=1652277856534; _gid=GA1.2.744022738.1652427793; _ym_isad=2; _fbp=fb.1.1652427964556.22806925; qpay-web/3.0_locale=ru; tmr_detect=0%7C1652482502191; tmr_reqNum=24; _dc_gtm_UA-100141486-1=1; _dc_gtm_UA-100141486-2=1; _dc_gtm_UA-100141486-25=1; _dc_gtm_UA-100141486-26=1; _ym_visorc=b; _gali=changeable-field-input-amount; ROUTEID=d32d92401831bd3c|Yn8LR; qpay-web/3.0_csrf-token-v2=9aa273f52588f08d12fb613d509647bb" \
      -H "pragma: no-cache" \
      -H "referer: https://koronapay.com/transfers/online/" \
      -H "sec-ch-ua-mobile: ?0" \
      -H "sec-ch-ua-platform: "Windows"" \
      -H "sec-fetch-dest: empty" \
      -H "sec-fetch-mode: cors" \
      -H "sec-fetch-site: same-origin" \
      -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36" \
      -H "x-application: Qpay-Web/3.0" \
      -H "x-csrf-token: 9aa273f52588f08d12fb613d509647bb" \
      --compressed | jq .[0]"""