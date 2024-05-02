const express = require('express');
const app = express();
app.use(express.json());

let channel1 = {
    title : "first BBa",
    subscribes : 1000,
};

let channel2 = {
    title : "내가KiRaDa",
    subscribes : 24000,
};

let channel3 = {
    title : "코딩고수가될거야",
    subscribes : 920,
}

let channelMap = new Map();

channelMap.set(1, channel1);
channelMap.set(2, channel2);
channelMap.set(3, channel3);

// 개별 조회
app.route("/channels/:id")
.get((req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    let result = {
        code : 200,
        msg : ""
    };

    let channel = channelMap.get(id);

    if (!channel) {
        result.code = 404;
        result.msg = "this channel is not found";
    } else {
        channel.id = id;
    }

    res.status(result.code).json({
        message : result.msg,
        channel : channel
    });
}).delete((req, res)=>{
    let {id} = req.params;
    id = parseInt(id);

    let result = {
        code : 200,
        msg : ""
    };

    let channel = channelMap.get(id);

    if (!channel) {
        result.code = 404;
        result.msg = "존재하지 않는 채널인데 어케 삭제해!"
    } else {
        channelMap.delete(id);
        result.msg = `${channel.title} 채널을 삭제 했습니다!`;
    }

    res.status(result.code).json({
        message : result.msg
    });
}).put((req, res)=>{
    let {id} = req.params;
    let { title } = req.body;

    id = parseInt(id);

    let result = {
        code : 200,
        msg : ""
    };

    let originTitle = "";
    let channel = channelMap.get(id);

    if (!channel) {
        result.code = 404;
        result.msg = "없는 채널인대 어케 수정해!"
    } else {
        if (!title){
            result.code = 400;
            result.msg = "제대로 바꿀 title을 입력해주세요!";
        } else {
            originTitle = channel.title;
            channel.title = title;
            channelMap.set(id,channel);
            result.msg = `${originTitle} 에서 ${channel.title} 로 채널 title을 수정 했습니다!`;
        }
    }

    res.status(result.code).json({
        message : result.msg
    });
});

// 전체 조회
app.route("/channels")
.get((req, res) => {
    let channels = new Array();

    let result = {
        code : 200,
        msg : ""
    };

    if (!channelMap.size) {
        result.code = 404;
        result.msg = "Threr are no channels";
    } else {
        channelMap.forEach((value, index)=>{
            channels.push(
                {
                    id : index,
                    title : value.title,
                    subscribes : value.subscribes
                }
            );
        });
    }

    res.status(result.code).json({
        message : result.msg,
        channels : channels
    });
}).post((req, res) => {
    let { title, subscribes } = req.body;

    let result = {
        code : 201,
        msg : ""
    };

    if (!title || !subscribes) {
        result.code = 400;
        result.msg = "다시 입력해주세요!";
    } else {
        let isExist = false;
        
        channelMap.forEach((key, value)=>{
            if (value.title === title) {
                isExist = true;
            }
        });

        if (isExist){
            result.code = 400;
            result.msg = "이미 같은 채널이 있습니다!"
        } else {
            let channel = {
                title : title,
                subscribes : subscribes
            };

            channelMap.set(channel, channelMap.size+1)

            result.msg = `${title} 채널이 성공적으로 생성되었습니다!`;
        }
    }

    res.status(result.code).json({
        message : result.msg
    });
});

app.listen(1990);