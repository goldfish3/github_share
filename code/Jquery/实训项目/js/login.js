$(function () {
    //登陆
    $("#loginContent .loginBtn").click(function (e) {
        e.preventDefault();
        var username = $("#loginContent .userInput").val();
        var password = $("#loginContent .pasInput").val();
        var type = $("#loginContent .type>option:selected").val();
        alert(type);

        var callBack = function (XMLHttpRequest,textStatus) {
            console.log("请求成功");
        };
        var succ = function (data,textStatus) {
            console.log(data);
            if (data.status.result == "success"){
                //保存用户信息
                var userInfo = JSON.stringify(data);
                document.cookie = userInfo;

                // 页面跳转
                window.location.href = "student.html";
            }else{
                alert("登陆失败");
            }
        };
        var err = function(XMLHttpRequest, textStatus, errorThrown){
            console.log(textStatus);
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.responseText);
        }
        var sendData = {
            data: JSON.stringify({
                'username': username,
                'password': password,
                'type':type
            })
        };
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:5000/login",
            dataType:"json",
            //这里接收一个字符串参数，所以要将字典转成字符串
            data:sendData,
            complete:callBack,
            success:succ,
            error:err
        });
    });

//注册
    $("#loginContent .registBtn").click(function () {
        //将登陆框移出屏幕
        var loginContent = $("#loginContent");
        loginContent.animate({
            top:-500
        },500);

        //将注册框移入屏幕
        var registContent = $("#registContent");
        registContent.animate({
            top:0
        },500)
    });

//返回登陆
    var backLogin = function () {
        //将注册框移出屏幕
        var registContent = $("#registContent");
        registContent.animate({
            top:1000
        },500);

        //将登陆框移入屏幕
        var loginContent = $("#loginContent");
        loginContent.animate({
            top:0
        },500);
    };
    $("#registContent .loginBtn").click(backLogin);

//立即注册
    $("#registContent .registBtn").click(function () {
        // e.preventDefault();
        var username = $("#registContent .userInput").val();
        var password = $("#registContent .pasInput").val();
        var type = $("#registContent .type>option:selected").val();
        alert(type);
        var callBack = function (XMLHttpRequest,textStatus) {
            console.log("请求完成");
        };
        var succ = function (data,textStatus) {
            if (data.status == "用户名存在"){
                alert("用户名已存在");
            }else if(data.status == "成功"){
                alert("注册成功");
                backLogin();
            }else{
                alert("注册失败");
            }
            console.log(data.status);
        };
        var err = function(XMLHttpRequest, textStatus, errorThrown){
            console.log(textStatus);
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.responseText);
        }
        var sendData = {
            data: JSON.stringify({
                username: username,
                password: password,
                type:type
            }),
        }
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:5000/regist",
            dataType:"json",
            //这里接收一个字符串参数，所以要将字典转成字符串
            data:sendData,
            complete:callBack,
            success:succ,
            error:err
        });
    });
});