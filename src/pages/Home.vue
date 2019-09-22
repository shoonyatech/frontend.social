<template>
  <div>
    <div class="home">
      Hangout with Frontend Developers and Designers..
    </div>

    <div class="text">
      Meet fellow developers and designers in your city meetups, learn from
      online courses and find jobs matching your skills
    </div>

    <!-- developer box div -->
    <div class="join-box">
      <div class="msg">
        I am a developer/designer
      </div>
      <a
        href="/signin"
        class="join-button"
      >Join for Free</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.join-box {
  border: 2px solid #aada20;
  max-width: 417px;
  height: 200px;
  margin: 0 auto;
}

.join-box .msg {
  margin-top: 20px;
}

.join-button {
  background: #aada20;
  color: #fff;
  border: none;
  padding: 8px;
  margin-bottom: 20px;
  margin-top: 30px;
}
</style>