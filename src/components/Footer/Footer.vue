<template>
  <footer>
    <b-row>
      <b-col md="8">
        <div class="messages">
          We are building a one stop platform for frontend developers and
          designers.
          <br>If you want to contribute to this community driven effort,
          please mail us
          <b>contact@shoonya.ca</b>
          <br>
        </div>
      </b-col>
      <b-col md="4">
        <div class="social-links">
          <a
            class="social-link"
            href="https://shoonya-tech.slack.com/archives/CJ6KZLC9M"
            target="_blank"
          >
            <img
              src="https://www.frontend.social/images/slack.png"
              alt="slack"
            >
          </a>
          <a
            class="social-link"
            href="https://twitter.com/frontendsocial"
            target="_blank"
          >
            <img
              src="https://www.frontend.social/images/twitter.png"
              alt="twitter"
            >
          </a>
          <a
            class="social-link"
            href="https://github.com/shoonyatech/frontend.social/"
            target="_blank"
          >
            <img
              src="https://www.frontend.social/images/github.png"
              alt="github"
            >
          </a>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <div class="copyright-text">
          {{ copyrightText }}
        </div>
      </b-col>
    </b-row>
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
    text-align: left;
    color: #2c3e50;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  border-top: 2px solid #aada18;

  .copyright-text {
    background-color: #aada18;
    color: #fff;
    font-size: 13px;
    padding: 11px;
    text-align: center;
  }

  .messages {
    text-align: left;
    margin: 0.5rem 1rem;
  }

  .social-links {
    margin: 1rem;
    display: flex;
    flex-direction: row;
    .social-link {
      flex: 0 1 auto;
      height: 50px;
      width: 50px;
      display: flex;
      background-color: #aada18;
      margin-right: 10px;
      border-radius: 50%;
      padding: 8px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
