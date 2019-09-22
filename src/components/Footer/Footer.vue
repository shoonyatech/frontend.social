<template>
  <footer>
    <div class="footer-content">
      <div class="messages">
        We are building a one stop platform for frontend developers and
        designers.
        <br>If you want to contribute to this community driven effort, please
        mail us
        <b>contact@shoonya.ca</b>
        <br>
      </div>
      <div class="social-links">
        <div class="social-link">
          <img
            src="https://www.frontend.social/images/slack.png"
            alt="slack"
          >
        </div>
        <div class="social-link">
          <img
            src="https://www.frontend.social/images/twitter.png"
            alt="twitter"
          >
        </div>
        <div class="social-link">
          <img
            src="https://www.frontend.social/images/github.png"
            alt="github"
          >
        </div>
      </div>
    </div>

    <div class="copyright-text">
      {{ copyrightText }}
    </div>
  </footer>
</template>

<script>
export default {
  props: { copyrightText: { type: String, required: true } }
};
</script>

<style scoped lang="scss">
footer {
  .footer-content {
    font-size: 22px;
    text-align: left;
    color: #2c3e50;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .social-links {
      display: flex;
      .social-link {
        height: 50px;
        width: 50px;
        display: flex;
        background-color: #aada18;
        margin-right: 10px;
        border-radius: 50%;
        padding: 8px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  border-top: 2px solid #aada18;

  .copyright-text {
    background-color: #aada18;
    color: #fff;
    font-size: 13px;
    padding: 11px;
    text-align: center;
  }
}

@media screen and (max-width: 759px) {
  .footer-content {
    flex-direction: column;
    .messages {
      margin-bottom: 10px;
    }
    .social-links {
      justify-content: center;
    }
  }
}
</style>
