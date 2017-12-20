/*
表单操作
*/

//输入框的验证
function checkForm(form){

	//构建一个长度和文本框个数相同的数组
	var checkForms = new Array("email","pwd");
	
	//一次判断每一个文本框
	for(var i=0; i<checkForms.length; i++){
		
		//首先要检查非空
		if(form.elements[checkForms[i]].value == ""){//如果为空
			
			//提示输入
			alert("请输入\""+form.elements[checkForms[i]].title+"\"！");
			form.elements[checkForms[i]].focus();//哪个地方没有输入，哪个地方就聚焦
			return false;

		}
	}

	//其次，按规则办事
	var email = form.email;//得到邮箱对象DOM对象，<input type="text" name="email" id="email" title="邮箱" />
	//alert(email);//OK
	//对邮箱规则进行验证：adsa@163.com
	var atIndex = email.value.indexOf("@");//取得@的索引
	var dotIndex = email.value.indexOf(".");//取得.的索引
	
	//判断是否有特殊符号@和.
	if((-1==atIndex) || (-1==dotIndex)){
		
			alert("邮箱地址格式不正确，请重新输入！");
			email.focus();//邮箱文本框聚焦
			email.select();
			return false;
	}
	
	//8位密码
	if(form.pwd.value.length<8){
		
			alert("密码长度必须8位以上，请重新输入！");
			form.pwd.focus();//密码框聚焦
			//form.pwd.select();
			return false;
	}
	
	//上面的验证都通过了，则让用户提交表单

	
	return true;
}

//复位
function resetForm(form){
	/*
	//alert("****");
	var emailDom = document.getElementById("email");
	//  alert(emailDom);
	//清空
	emailDom.value = "";
	
	var pwdDom = document.getElementById("pwd");
    pwdDom.value = "";
	*/
}

function checkForm1(form){
	
	var year = form.year;
	var month = form.month;
	var day = form.day;
	/*
	alert(year);
	alert(month);
	alert(day);
	*/
	if(year.value==""||month.value == "" ||day.value==""){
		alert("请选择出生年份！");
		year.focus();
		return false;
	}else{
		alert("提交成功");
		return false;
	}
}

//单选钮验证
function checkForm2(form){
	
	var votes = form.vote;
	var selStr = "";
	//alert(votes.length);//5
	var flag = false;
	for(var i=0;i<votes.length; i++){
		
			if(votes[i].checked){
				selStr += votes[i].value+" ";
				flag = true;
			}

	}

	if(flag == false){
		alert("请至少选择一个！");
		return false;
	}

	alert("你选择的选手有："+selStr);
	return false;
	
}