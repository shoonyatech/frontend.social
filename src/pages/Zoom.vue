  
<template>
  <div
    id="zmmtg-root"
    class="iframe-container"
  >
    <meta charset="utf-8">
    <link
      type="text/css"
      rel="stylesheet"
      href="https://dmogdx0jrul3u.cloudfront.net/1.3.7/css/bootstrap.css"
    >
    <link
      type="text/css"
      rel="stylesheet"
      href="https://dmogdx0jrul3u.cloudfront.net/1.3.7/css/react-select.css"
    >

    <meta
      name="format-detection"
      content="telephone=no"
    >
  </div>
</template>

<script>
//import { ZoomMtg } from '@zoomus/websdk';

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
    setTimeout(() => {
    var ZoomMtg = window.ZoomMtg
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.5/lib', '/av'); 

    console.log(document.querySelector("#zmmtg-root"));
    ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    this.meetConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: this.meetingId,
      userName: this.nickName,
      passWord: this.meetingPasword,
      leaveUrl: "www.zoom.com",
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
      leaveUrl: "www.zoom.com",
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
    }, 3000)

  }
}
</script>