package com.cpt202.cw1.findu.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.cpt202.cw1.findu.annotation.UserLoginToken;
import com.cpt202.cw1.findu.mapper.InfoMapper;
import com.cpt202.cw1.findu.mapper.TopicMapper;
import com.cpt202.cw1.findu.mapper.Topic_UserMapper;
import com.cpt202.cw1.findu.pojo.Info;
import com.cpt202.cw1.findu.pojo.Topic;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class ProfileController {

    @Resource
    InfoMapper infoMapper;
    @Resource
    TopicMapper topicMapper;
    @Resource
    Topic_UserMapper topic_userMapper;

    @UserLoginToken
    @RequestMapping("/me")
    public Object profile( HttpServletRequest request){
        String email = JWT.decode(request.getHeader("token")).getAudience().get(0);
        JSONObject jsonObject = new JSONObject();
        String name = infoMapper.findByEmail(email).getName();
        jsonObject.put("name", name);
        return jsonObject;
    }

    @UserLoginToken
    @RequestMapping("/me/info")
    public Object info( HttpServletRequest request){

        String email = JWT.decode(request.getHeader("token")).getAudience().get(0);
        System.out.println(email);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("user_info", infoMapper.findByEmail(email));

        return jsonObject;
    }


//    @UserLoginToken
//    @RequestMapping("/me/editInfo")
//    public Object editInfo(@RequestBody Info info,  HttpServletRequest request){
//        JSONObject jsonObject = new JSONObject();
//        try{
//            infoMapper.updateInfo(info);
//        }catch (Exception e){
//            jsonObject.put("message", "0");
//            return jsonObject;
//        }
//        jsonObject.put("message", "200");
//        return jsonObject;
//    }

    @UserLoginToken
    @RequestMapping("/me/myPost")
    public Object myPost(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        String email = JWT.decode(request.getHeader("token")).getAudience().get(0);
        Topic myPost = topicMapper.topic_findByCreator(email);
        if(myPost==null){
            jsonObject.put("message", "0");
            return jsonObject;
        }
        jsonObject.put("message", "200");
        jsonObject.put("myPost", myPost);
        return jsonObject;
    }

    @UserLoginToken
    @RequestMapping("/me/myPost/delete")
    public Object deletePost(HttpServletRequest request){

        JSONObject jsonObject = new JSONObject();
        String email = JWT.decode(request.getHeader("token")).getAudience().get(0);
        int topicId = topicMapper.selectId(email);
        try{
            topic_userMapper.deleteByTopicId(topicId);
            topicMapper.delete(email);
        }catch (Exception e){
            jsonObject.put("message", "0");
            return jsonObject;
        }
        jsonObject.put("message", "200");
        return jsonObject;
    }
}
