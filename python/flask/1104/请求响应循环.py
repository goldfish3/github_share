from flask import Flask
from flask import request
import flask初识
from flask import  current_app
from flask import make_response
from flask import redirect

# Flask上下文全局变量
# current_app 程序上下文，当前激活程序的程序实例
# g 程序上下文，处理请求时，临时储存对象，每次请求都会重设设个变量
# reqeust 请求对象，封装了客户端发出的http请求中的内容
# session 请求上下文，用户会话，用于储存请求之间需要记住的值的词典

app = Flask(__name__)

# 下面这句代码调用 由于没有激活上下文，调用current_app就产生了错误
# print(current_app.name)
app_ctx = app.app_context()
app_ctx.push()
print(current_app.name)
print(app.url_map)
app_ctx.pop()

# 请求钩子：在处理请求之前或者请求之后调用,一共有4总
# before_first_request:注册一个函数，在处理第一个请求之前运行
# before_request:注册一个函数，在每次请求之前运行
# after_request:注册一个函数，如果没有未处理的异常抛出，在每次请求之后运行
# teardown_request:注册一个函数，即使有未处理的异常抛出，也在每次请求之后运行

@app.route('/')
def index():
    user_agent = request.headers.get('User-Agent')

    # 默认的情况下，请求成功是返回的200，但是我们也可以指定返回码
    return "<h1>Bad Request</h1>",400

@app.route('/response')
def rps():
    # make_response函数可以接收最多3个参数
    response = make_response('<h1>This document carries a cookie!</h1>')
    response.set_cookie('answer','42')
    return response

# 这里就返回了一个重定向视图
@app.route('/redirect')
def redirect():
    return redirect('http://www.baidu.com')

# 使用flask扩展
from flask.ext.script import Manager
manager = Manager(app)

if __name__ == '__main__':
    manager.run()

