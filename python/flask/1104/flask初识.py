from flask import Flask
# 下面是一个完整的flask程序

app = Flask(__name__)

# 客户端把请求发送给服务器，服务器将请求发送给flask实例，flask实例决定调用哪个函数，这个过程就叫路由
# 这里就将index函数注册为路由(视图函数？)
# 这里的app是一个对象，它的route方法是一个装饰器
# 装饰器的作用就是将下面的函数注册为路由，当然，由于index被装饰器所调用
# 之后我们再返回index,应该就是被装饰过的函数了，也许是 路由（看装饰器里怎么写的了）？
@app.route('/')
def index():
    # 这里函数的返回值就是响应
    return '<h1>hello world</h1>'

# 上面程序的加强版，动态路由
@app.route('/user/<name>')
def user(name):
    return "<h1>Hello,%s!<h1>" % name

# 在运行之前可以多次注册，但是运行只能是一次
if __name__ == "__main__":
    app.run(debug=True)