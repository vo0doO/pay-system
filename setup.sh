setup() {
    python3 -m venv .venv && \
    source .venv/bin/activate &&  \
    pip install -r psa/requirements && \
    curl https://cli-assets.heroku.com/install.sh | sh && \
    heroku container:login
}