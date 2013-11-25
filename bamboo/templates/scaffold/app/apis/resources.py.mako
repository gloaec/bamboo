# -*- coding: utf-8 -*-
from bamboo.application import Api, json_response, error_response, bad_id_response
from flask import request
from app.models import ${resource.title()}

api = Api(__name__)

""" RESTful API """

@api.route('/', methods=['GET'])
@api.route('', methods=['GET'])
def index():
    try:
        return json_response(${resource.title()}.all().to_dict())
    except Exception, e:
        return error_response(str(e))

@api.route('/', methods=['POST'])
@api.route('', methods=['POST'])
def create():
    try:
        return json_response(${resource.title()}.create(**request.form).to_dict())
    except Exception, e:
        return error_response(str(e))

@api.route('/<id>', methods=['GET'])
def get(id):
    try:
        return json_response(${resource.title()}.find(id).to_dict())
    except AttributeError, e:
        return bad_id_response(id)
    except Exception, e:
        return error_response(str(e))

@api.route('/<id>', methods=['PUT'])
def update(id):
    print "Update folder %s" % id
    folder = Folder.find(id)
    print "Params %s" % (request.json)
    try:
        return json_response(${resource.title()}.find(id).update(**request.json).to_dict())
    except AttributeError, e:
        return bad_id_response(id)
    except Exception, e:
        return error_response(str(e))

@api.route('/<id>', methods=['DELETE'])
def delete(id):
    try:
        return json_response(${resource.title()}.find(id).delete())
    except AttributeError, e:
        return bad_id_response(id)
    except Exception, e:
        return error_response(str(e))
