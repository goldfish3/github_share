/*
������
*/

//��������֤
function checkForm(form){

	//����һ�����Ⱥ��ı��������ͬ������
	var checkForms = new Array("email","pwd");
	
	//һ���ж�ÿһ���ı���
	for(var i=0; i<checkForms.length; i++){
		
		//����Ҫ���ǿ�
		if(form.elements[checkForms[i]].value == ""){//���Ϊ��
			
			//��ʾ����
			alert("������\""+form.elements[checkForms[i]].title+"\"��");
			form.elements[checkForms[i]].focus();//�ĸ��ط�û�����룬�ĸ��ط��;۽�
			return false;

		}
	}

	//��Σ����������
	var email = form.email;//�õ��������DOM����<input type="text" name="email" id="email" title="����" />
	//alert(email);//OK
	//��������������֤��adsa@163.com
	var atIndex = email.value.indexOf("@");//ȡ��@������
	var dotIndex = email.value.indexOf(".");//ȡ��.������
	
	//�ж��Ƿ����������@��.
	if((-1==atIndex) || (-1==dotIndex)){
		
			alert("�����ַ��ʽ����ȷ�����������룡");
			email.focus();//�����ı���۽�
			email.select();
			return false;
	}
	
	//8λ����
	if(form.pwd.value.length<8){
		
			alert("���볤�ȱ���8λ���ϣ����������룡");
			form.pwd.focus();//�����۽�
			//form.pwd.select();
			return false;
	}
	
	//�������֤��ͨ���ˣ������û��ύ��

	
	return true;
}

//��λ
function resetForm(form){
	/*
	//alert("****");
	var emailDom = document.getElementById("email");
	//  alert(emailDom);
	//���
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
		alert("��ѡ�������ݣ�");
		year.focus();
		return false;
	}else{
		alert("�ύ�ɹ�");
		return false;
	}
}

//��ѡť��֤
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
		alert("������ѡ��һ����");
		return false;
	}

	alert("��ѡ���ѡ���У�"+selStr);
	return false;
	
}