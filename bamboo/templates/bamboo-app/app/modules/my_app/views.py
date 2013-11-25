from flask import render_template, request
from my_app import module

@module.route('/')
def index():
    remote_addr = request.environ['REMOTE_ADDR']
    return render_template('my_app/index.html', remote_addr=remote_addr)


