<template>
  <h1>Zoom</h1>
</template>

<script>
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.3.7/lib', '/av'); 
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
var API_KEY = "";
var API_SECRET = "";
// https://us04web.zoom.us/j/76543121168?pwd=TTJJSEJ1ZWQ4QzhUTE44dlpNVkZ3Zz09
export default {
  data() {
    return {
      meetingId: this.$route.query.id,
      meetingPasword: this.$route.query.password,
      nickName: this.$route.query.name,
    }
  },
  mounted() {
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    this.meetConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: this.meetingId,
      userName: this.nickName,
      passWord: this.meetingPasword,
      leaveUrl: "",
      role: 0
    };
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetConfig.meetingNumber,
      apiKey: this.meetConfig.apiKey,
      apiSecret: this.meetConfig.apiSecret,
      role: this.meetConfig.role,
      success: function(res) {
        console.log("success signature: " + res.result);
      }
    });

  ZoomMtg.init({
      leaveUrl: "",
      isSupportAV: true,
      success: () => {
        ZoomMtg.join({
          meetingNumber: this.meetConfig.meetingNumber,
          userName: this.meetConfig.userName,
          signature: this.signature,
          apiKey: this.meetConfig.apiKey,
          userEmail: "email@gmail.com",
          passWord: this.meetingPasword,
          success: function(res) {
            console.log("join meeting success");
          },
          error: function(res) {
            console.log(res);
          }
        });
      },
      error: function(res) {
        console.log(res);
      }
    });
  }
}
</script>