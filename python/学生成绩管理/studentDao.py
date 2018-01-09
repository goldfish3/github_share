import pymysql

# 连接数据库
connection = pymysql.connect(host='127.0.0.1',
                             port=3306,
                             user='root',
                             password='',
                             db='student',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
cursor = connection.cursor()

# type---1:老师 2:学生 3:管理员
def saveUserInfo(username,password,type):
    # 查询用户名是否已经存在
    sql1 = "select * from USER WHERE  username = %s"
    cursor.execute(sql1,username)
    result = cursor.fetchall()
    if(len(result) > 0):
        return "用户名存在"

    # 添加用户
    sql = 'INSERT INTO USER (username, password, type) VALUES (%s, %s, %s)'
    cursor.execute(sql, (username,password,int(type)))

    # 没有设置默认自动提交，需要主动提交，以保存所执行的语句
    connection.commit()
    return "成功"

def inquireUserInfo(username):
    sql = "select * from USER WHERE username = %s password = %s"
    cursor.execute(sql,)