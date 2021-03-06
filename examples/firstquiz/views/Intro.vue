<template>
<div class="main">
  <div class="content flex2">
    <p class="heading">
      Welcome to the Gig <br />
      Retirement Calculator
    </p>
    <p class="para">
      Fill out the questionnaire to calculate <br />
      your 2020 profit after taxes. <br />
      <br />

      You'll need your last year's tax returns, and <br />
      estimate how much you made and spent this tax year. <br />
      <br />

      Then, we will make a personalized<br />
      retirement account suggestion <br />
      to maximize your tax savings💰! <br />
      <br />
      <strong>Note:</strong> Your information is safe with us 😊. <br />
      We will never sell your data.
    </p>
    <br /><br />
    <router-link to="/input" aria-label="start input page"><button>GET STARTED</button></router-link>
  </div>
  <div class="image">
    <div class="img"></div>
  </div>
</div>
</template>

<script>
// import "../../../src/assets/css/intro.css";
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  border: 0;
}

:root {
  --heading-font: "Manrope", sans-serif;
  --para-font: "Karla", sans-serif;
  --light-font: 300;
  --normal-font: 400;
  --semi-bold-font: 600;
  --bold-font: 700;
  --extra-bold: 900;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex2 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column;
}

.container {
  display: grid;
  grid-template-rows: 7vh 93vh;
  grid-template-areas: "main";
  background-color: aliceblue;
}

.main {
  grid-area: main;
  background: linear-gradient(180deg, #d6ffec 50%, white 50%);
  display: grid;
  height: 100vh;
  /* align-items: center; */
  /* grid-template-rows: 100%; */
  grid-template-columns: 10vw 45vw 40vw 5vw;
  grid-template-areas: ". content image .";
}

.content {
  grid-area: content;
  /* padding-top: 5rem; */
  /* background-color: cyan; */
}

.content .heading {
  font-size: 64px;
  font-weight: bold !important;
  font-family: Karla;
  padding-top: 3rem;
  /* line-height: 66px; */
  font-weight: var(--semi-bold-font);
}

.content .para {
  font-size: 29px;
  font-weight: var(--regular-font);
  font-family: Karla;
  /* padding-bottom: 20px; */
  /* line-height: 35.07px; */
}

.content button {
  background-color: #f07f62;
  width: 300px;
  height: 75px;
  border-radius: 35px;
  color: white;
  font-size: 30px;
  letter-spacing: 0.3px;
  line-height: 38px;
  margin-top: -1rem;
  font-family: var(--para-font);
  font-weight: var(--semi-bold-font);
}

.image {
  grid-area: image;
  display: flex;
  align-items: center;
}

.img {
  background-image: url(../../../src/assets/images/taking-money-from-bank.png);
  background-size: cover;
  height: 540px;
  width: 540px;
}

/* MEDIA QUERIES */

@media only screen and (max-width: 1320px) {
  .content .heading {
    font-size: 40px;
    padding-bottom: 10px;
    line-height: 55px;
  }

  .content .para {
    font-size: 21px;
    padding-bottom: 15px;
  }

  .content button {
    width: 250px;
    height: 65px;
    font-size: 25px;
  }

  .img {
    height: 440px;
    width: 440px;
  }
}

@media only screen and (max-width: 1090px) {
  .content {
    justify-content: unset;
  }
}

@media only screen and (max-width: 960px) {
  .content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column;
  }

  .content .heading {
    font-size: 30px;
    padding-bottom: 10px;
    line-height: 45px;
  }

  .content .para {
    font-size: 18px;
    padding-bottom: 10px;
  }

  .img {
    height: 400px;
    width: 400px;
  }
}

@media only screen and (max-width: 880px) {
  .main {
    display: grid;
    grid-template-columns: 5vw 50vw 43vw 3vw;
    grid-template-areas: ". content image .";
  }

  .img {
    height: 350px;
    width: 350px;
  }

  .content .para {
    line-height: 1.5rem;
  }
}

@media only screen and (max-width: 765px) {
  .main {
    display: grid;
    grid-template-columns: 10fr 85fr 5fr;
    grid-template-rows: 30vh 70vh;
    grid-template-areas:
      ". image ."
      ". content .";
    /* align-items: unset; */
  }

  .image {
    display: flex;
    justify-content: center;
    /* align-items: flex-start; */
  }

  .content {
    display: flex;
    align-items: left;
    justify-content: flex-end;
    padding-top: 0;
  }

  .content .heading {
    font-size: 35px;
    padding-bottom: 5px;
    line-height: 40px;
    padding-top: 1rem;
  }

  .content .para {
    font-size: 18px;
    /* padding-bottom: 5px; */
    line-height: 1.3rem;
  }

  .content button {
    width: 220px;
    height: 50px;
    font-size: 20px;
  }

  .img {
    height: 250px;
    width: 250px;
  }
}

@media only screen and (max-width: 560px) {
  .content .heading {
    font-size: 30px;
    margin-top: -4rem;
  }

  .content .para {
    font-size: 15px;
    padding-top: 2rem;
  }

  .content button {
    width: 150px;
    height: 50px;
    font-size: 16px;
  }

  .main {
    align-items: center;
  }

  .image {
    align-items: center;
  }
}

@media only screen and (max-width: 420px) {
  .content .heading {
    font-size: 30px;
    /* padding-top: 3rem; */
    /* margin-top: -4rem !important; */
  }

  .content .para {
    font-size: 15px;
    padding-top: 2rem;
  }
}

@media only screen and (max-width: 380px) {
  .content .heading {
    font-size: 30px;
    /* padding-top: 3rem; */
    margin-top: -5rem !important;
  }

  .content .para {
    font-size: 15px;
    padding-top: 2rem;
  }
}

@media only screen and (max-width: 370px) {
  .content .heading {
    font-size: 25px;
    padding-top: 0rem;
    margin-top: 0rem !important;
  }

  .main {
    display: grid;
    grid-template-columns: 5fr 90fr 5fr;
    grid-template-rows: 30vh 70vh;
    grid-template-areas:
      ". image ."
      ". content .";
  }
}

@media only screen and (max-width: 345px) {
  .content .para {
    font-size: 12px;
    padding: 0;
  }

  .content button {
    margin-bottom: 5px;
  }
}
</style>
