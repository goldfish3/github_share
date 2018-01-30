$(function () {
    //获得cookie中的用户信息
    var userInfo = JSON.parse(document.cookie);

    //加载课程信息
    var courseData;
    var loadCourseData = function () {
        var callBack = function () {};
        var succ = function (data) {
            courseData = data;
            console.log(data);
            var table = $("#courseList");
            //将加载下来的课程信息插入dom
            for (var i=0; i<data.length; i++){
                var tr = $("<tr></tr>");

                //课程名
                var name = $("<td></td>");
                name.text(data[i].name);
                tr.append(name);

                //课时
                var time = $("<td></td>");
                time.text(data[i].time);
                tr.append(time);

                //选择
                var select = $("<td></td>");
                var input = $("<input type=\"checkbox\">");
                input.val(i.toString());
                select.append(input);
                tr.append(select);
                table.append(tr);
            }
        };
        var err = function () {};
        $.ajax({    //新版本的ajax会直接将服务器传过来的json字符串解析为对象
            type:"POST",
            url:"http://127.0.0.1:5000/courseInfo",
            dataType:"json",
            data:{},
            complete:callBack,
            success:succ,
            error:err
        });
    };
    //页面最开始加载的时候，加载课程数据
    loadCourseData();

    //用户点击选课信息的时候，加载课程数据
    $("courseInfo").click(function () {
        loadCourseData();
    });


    //提交选课信息
    $("#commit button").click(function () {
        //将选择的模型提取出来
        var selectCourses = $("table input:checked");
        var selectData = [];    //选择的数据
        var sendData = {};  //要发送的数据
        console.log(selectCourses.length);
        for (var i=0; i<selectCourses.length; i++){
            var ipt = selectCourses[i];
            var index = $(ipt).val();
            selectData.push(courseData[index]);
        }
        sendData["username"] = userInfo.status.username;
        sendData["userId"] = userInfo.status.userId;
        sendData["selectCourse"] = selectData;
        var callBack = function () {};
        var succ = function (data) {
            console.log(data);
        };

        var err = function () {};
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:5000/teachInfo",
            dataType:"json",
            data:{data:JSON.stringify(sendData)},
            complete:callBack,
            success:succ,
            error:err
        });
    });

    var lay = function () {
        var width = $(window).width();
        var height = $(window).height();

        //背景内容
        var content = $("#content");
        var contentW = width - 10;
        var contentH = height - 10;
        content.css({
            top:"5px",
            left:"5px",
            width:contentW.toString() + "px",
            height:contentH.toString() + "px",
        });

        //logo
        var logo = $("#logo");
        logo.css({
            width:"150px",
            height:"100px"
        });

        //title
        var title = $("#title");
        var titleX = logo.width() + 5;
        var titleW = contentW - titleX;
        var titleH = logo.height();
        title.css({
            left: titleX.toString() + "px",
            width:titleW.toString() + "px",
            height:titleH.toString() + "px"
        });
        title.css('line-height',titleH.toString() + "px");

        //menu
        var menu = $("#menu");
        var menuY = logo.height() + 5;
        var menuW = logo.width();
        var menuH = contentH - menuY;
        menu.css({
            top:menuY.toString() + "px",
            width:menuW.toString() + "px",
            height:menuH.toString() + "px",
        });

        //li
        var li = $("#menu li");
        li.css({
            width:menuW.toString() + "px",
            height:"50px",
            color:"white"
        });

        //表格区域
        var tableContent = $("#tableContent");
        var tcY = logo.height() + 5;
        var tcX = logo.width() + 5;
        var tcW = titleW;
        var tcH = menuH;
        tableContent.css({
            top:tcY,
            left:tcX,
            width:tcW.toString() + "px",
            height:tcH.toString() + "px",
            background:"white"
        });

        var table = $("#tableContent table");
        table.css({
            width:tcW,
            height:tcH,
        });
    };
    lay();
    $(window).resize(function () {
        lay();
    });
});