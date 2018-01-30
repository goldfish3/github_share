from flask import Flask
from flask import make_response
from flask import jsonify
from flask import json
from flask import request
import studentDao

app = Flask(__name__)
# app.run(host='0.0.0.0')

def createResponse(dict):
    response = make_response(jsonify(dict))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.mimetype = 'text/plain'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

@app.route('/')
def hello_world():
    return 'Hello World!'

# 注册
@app.route('/regist',methods=["post"])
def regist():
    data = json.loads(request.values.get('data'))
    ans = studentDao.saveUserInfo(data['username'],data['password'],data['type'])
    dict = {"status":ans}
    print(ans)
    return createResponse(dict)

# 登陆
@app.route('/login',methods=["POST"])
def login():
    data = json.loads(request.values["data"])
    ans = studentDao.inquireUserInfo(data["username"],data["password"],data["type"])
    dict = {"status": ans}
    return createResponse(dict)

# 课程信息
@app.route('/courseInfo',methods=["POST"])
def courseInfo():
    ans = studentDao.inquireCourseInfo();
    return createResponse(ans)

# 添加授课信息
@app.route('/teachInfo',methods=["POST"])
def teachInfo():
    ans = studentDao.commitTeachInfo(request.values["data"])
    return createResponse(ans)

# 查询授课信息
@app.route('/inquireTeachInfo',methods=["POST"])
def inquireTeachInfo():
    ans = studentDao.inquireCourseInfo(request.values["data"])
    return ans

if __name__ == '__main__':
    app.run()
