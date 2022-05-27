#!/usr/bin/env bash
# -*- coding: utf-8 -*-


# heroku create -n &&\

TRIGGER_APP="https://pay-systems.herokuapp.com/"

heroku webhooks:add \
    --include api:release \
    -l sync \
    --url https://vsso.herokuapp.com/webhooks \
    -s debed5296c0a0a56a36f44667ffb1b0ef136f24aba4c8f1a080485df0ce5c8c7 \
    -a "$TRIGGER_APP" &&\

heroku config:set FOO=bar -a "$TRIGGER_APP"

heroku addons:admin:manifest:generate