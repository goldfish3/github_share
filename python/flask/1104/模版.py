# 模版:是一个包含响应文本的文件
# 其中包含用占位变量表示的动态部分
# 但具体的值只有在请求的上下文中才能知道

# 渲染：使用真实的值替换变量，再返回最终得到的响应字符串

from flask import Flask, render_template
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/user/<name>')
def user(name):
    return render_template('user.html',name=name)