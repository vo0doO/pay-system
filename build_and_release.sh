#!/usr/bin/env bash
# -*- coding: utf-8 -*-

login_on_heroku() {
    heroku container:login
}

release_on_heroku() {
    heroku container:release web -a pay-systems
}

build_image_on_heroku() {
    heroku container:push web -a pay-systems
}
# heroku container:push web && heroku container:release web
build_image_on_heroku && release_on_heroku