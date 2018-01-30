import pymysql
import json

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
# 保存用户信息
def saveUserInfo(username,password,userType):
    # 查询用户名是否已经存在
    sql1 = "select * from USER WHERE  username = %s"
    cursor.execute(sql1,username)
    result = cursor.fetchall()
    if(len(result) > 0):
        return "用户存在"

    # 添加用户
    sql = 'INSERT INTO USER (username, password, type) VALUES (%s, %s, %s)'
    cursor.execute(sql, (username,password,int(userType)))

    # 查找刚刚添加的userId
    sql2 = "SELECT * FROM USER WHERE username = %s"
    cursor.execute(sql2,username)
    result2 = cursor.fetchall()
    userId = result2[0]["id"]   #这里的userId是整型
    print(userId)

    # 根据用户类型，添加到相应的表中
    if userType == "1":
        insertSql = 'INSERT INTO teacher (name,username,userId) VALUES (%s, %s, %s)'
        cursor.execute(insertSql,(username,username,userId))
    elif userType == "2":
        insertSql = 'INSERT INTO student (name,classId,userId) VALUES (%s, %s, %s)'
        cursor.execute(insertSql,(username,1,userId))
    elif userType == "3":
        insertSql = 'INSERT INTO manager (name) VALUES (%s)'
        cursor.execute(insertSql,username)

    # 没有设置默认自动提交，需要主动提交，以保存所执行的语句
    connection.commit()
    return "成功"

# 查询用户信息
def inquireUserInfo(username,password,type):
    sql = "select * from USER WHERE username = %s and password = %s and type = %s"
    cursor.execute(sql,(username,password,type))
    result = cursor.fetchall()
    backResult = {}
    print(len(result))
    if(len(result) > 0):
        print("123321")
        backResult = {"result":"success",
                      "username":username,
                      "type":result[0]["type"],
                      "userId":result[0]["id"]}
    else:
        backResult = {"result":"error"}
    return backResult

# 查询课程信息
def inquireCourseInfo():
    sql = "select * from course"
    cursor.execute(sql)
    result = cursor.fetchall()
    return  result

# 提交选课信息
def commitTeachInfo(data):
    data = json.loads(data)
    username = data["username"]
    userId = data["userId"]
    selectInfo = data["selectCourse"]

    # 通过userId查找teacherId
    teacherId = selectTeacherIdByUserId(userId)

    # 插入老师选课信息（老师id 和 课程id）
    sql = "INSERT INTO teach_course VALUES (%s,%s)"
    for i in range(0,len(selectInfo)):
        print("插入")
        cursor.execute(sql,(teacherId,int(selectInfo[i]["id"])))
    connection.commit()
    return {"status":"success"}

# 查询选课信息
def inquireTeachInfo(data):
    data = json.loads(data)
    userId = data["userId"]

    # 通过userId查找teacherId
    teacherId = selectTeacherIdByUserId(userId)

    # 通过teacherId查找选课信息
    sql = "select name,time " \
          "from teach_course " \
          "LEFT JOIN course ON " \
          "teach_course.courseId = course.id" \
          "WHERE teacherId = %s"
    cursor.execute(sql,teacherId)
    result = cursor.fetchall()
    return result

def selectTeacherIdByUserId(userId):
    selectSql = "select * from teacher WHERE userId = %s"
    cursor.execute(selectSql, (userId))
    teacherId = cursor.fetchall()[0]["id"]
    return teacherId