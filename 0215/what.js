
//회원수정

// http://localhost:3000/updateMember/apple1

app.put('/updateMember/:userid', (req, res) => {

    const result = {};

    const userid = req.params.userid;



    if (!req.body['password'] || !req.body['name']) { //내용입력여부

        result["success"] = 100;  // 100 : 실패

        result["msg"] = "매개변수가 전달되지 않음";

        res.json(result);

        return false;//더이상 진행이 안되게 불러왔던 곳으로 이동

    }



    fs.readFile(__dirname + '/../data/member.json', 'utf8', (err, data) => {

        if (!err) {

            const member = JSON.parse(data);//JSON파일로 저장    

            member[userid] = req.body;//전달한 정보



            //수정한 파일을 작성

            fs.writeFile(__dirname + '/../data/member.json', JSON.stringify(member, null, '\t'), (err, data) => {

                if (!err) {

                    result['success'] = 200;

                    result['msg'] = "성공";

                    res.json(result);

                } else {

                    console.log(err);

                }

            });



        } else {

            console.log(err);






        }

    });

})