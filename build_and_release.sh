#!/usr/bin/env bash
# -*- coding: utf-8 -*-

login_on_heroku() {
    bash -c "heroku container:login"
    return
}

release_on_heroku() {
    bash -c "heroku container:release web"
    return
}


build_image_on_heroku() {
    bash -c "heroku container:push web"
    return
}

build_image_on_heroku && release_on_heroku