<template>
  <div class="page-wrapper" :class="{ 'is-dark': mode === 'dark' }">
    <div class="banner-container">
      <div class="banner-col visual" :style="`background: ${ job.logoBackground };`">
        <img class="logo" :src="job.logo" :alt="job.position">
      </div>
      <div class="banner-col details">
        <h2 class="medium-title">{{ job.company }}</h2>
        <p class="small-text">{{ `${job.company.toLowerCase()}.com` }}</p>
      </div>
      <div class="banner-col company">
        <a class="button light" :href="job.website" target="_blank">Company Site</a>
      </div>
    </div>

    <div class="job-details">
      <div class="details-top">
        <div>
          <p class="small-text">{{ job.position }}</p>
          <h1 class="big-title">{{ job.position }}</h1>
          <p class="text-primary">{{ job.location }}</p>
        </div>

        <a class="button" :href="job.apply" target="_blank">Apply Now</a>
      </div>

      <div class="details-content">
        <p class="regular-text">{{ job.description }}</p>

        <h2 class="medium-title">Requirements</h2>

        <p class="regular-text">{{ job.requirements.content }}</p>

        <ul class="regular-list">
          <li v-for="(item, index) in job.requirements.items" :key="index">{{ item }}</li>
        </ul>

        <h2 class="medium-title">What You Will Do</h2>

        <p class="regular-text">{{ job.role.content }}</p>

        <ol class="number-list">
          <li v-for="(item, index) in job.role.items" :key="index">{{ item }}</li>
        </ol>
      </div>

    </div>

    <div class="floating-banner">
      <div class="floating-banner-content">
        <div class="job-infos">
          <h2 class="medium-title">{{ job.position }}</h2>
          <p class="small-text">{{ job.company }}</p>
        </div>

        <a :href="job.apply" class="button" target="_blank">Apply Now</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['appTitle', 'mode']),
    ...mapGetters('app', ['getJobById']),
    job() { return this.getJobById(this.$route.params.id) }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  width: 100%;
  max-width: 730px;
  height: 100%;
  margin: 0 auto;
  padding: 80px 0 176px;

  @media (max-width: 1024px) {
    width: auto;
    padding: 85px 40px 149px;
  }

  @media (max-width: 425px) {
    padding: 85px 24px 160px;
  }

  &.is-dark {
    .floating-banner {
      background: $darkBlue;

      .medium-title {
        color: $white;
      }
    }

    .banner-container,
    .job-details {
      background: $darkBlue;
    }

    .regular-text,
    .small-text {
      color: $grey;
    }

    .regular-list li,
    .number-list li {
      color: $grey;
    }

    .big-title,
    .medium-title {
      color: $white;
    }

    .button {
      &.light {
        color: $white;
        background: rgba($white, .1);
      }
    }
  }

  .floating-banner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background: $white;
  }

  .floating-banner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 730px;
    margin: 0 auto;
    padding-top: 23px;
    padding-bottom: 22px;

    @media (max-width: 1024px) {
      width: auto;
      padding: 23px 40px 22px;

      .job-infos {
        display: none;
      }

      .button {
        width: 100%;
      }
    }

    .medium-title {
      margin-bottom: 12px;
    }

    .small-title {
      margin-bottom: 0;
    }
  }

  .banner-container {
    position: relative;
    overflow: hidden;
    z-index: 1;
    display: flex;
    align-items: stretch;
    width: 100%;
    margin-top: -120px;
    border-radius: 6px;
    background: $white;

    @media (max-width: 425px) {
      overflow: visible;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: -100px;
      padding: 0 0 32px;
    }
  }

  .banner-col {
    display: flex;
    align-items: center;

    &.visual {
      position: relative;
      z-index: 2;
      justify-content: center;
      width: 140px;
      height: 140px;

      .logo {
        width: 80px;
      }

      @media (max-width: 425px) {
        width: 50px;
        height: 50px;
        margin-top: -25px;

        .logo {
          width: auto;
        }
      }
    }

    &.details {
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: 40px;

      .medium-title {
        margin: 0 0 14px;
      }

      @media (max-width: 425px) {
        margin-top: 24px;
        padding-left: 0;
        text-align: center;

        .medium-title {
          text-align: center;
        }
      }
    }

    &.company {
      padding-right: 43px;

      @media (max-width: 425px) {
        margin-top: 24px;
        padding-right: 0;
        text-align: center;
      }
    }
  }

  .job-details {
    margin-top: 32px;
    padding: 48px 43px 48px 48px;
    border-radius: 6px;
    background: $white;
  }

  .details-top {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    @media (max-width: 425px) {
      flex-direction: column;

      > div {
        margin-bottom: 50px;
      }

      a {
        width: 100%;
      }
    }

    > div {
      flex: 1;
    }
  }

  .details-content {
    width: 100%;
  }

  .big-title {
    margin: 0 0 14px;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 28px;
    color: $darkBlue;
  }

  .medium-title {
    margin: 0 0 28px;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 28px;
    color: $darkBlue;
  }

  .regular-text {
    margin: 0 0 24px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    color: $darkGrey;
  }

  .regular-list {
    margin: 0 0 48px;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      padding-left: 20px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 26px;
      color: $darkGrey;
    }
  }

  .number-list {
    margin: 0;
    padding-left: 0;
    list-style: none;
    counter-reset: my-awesome-counter;

    li {
      margin-bottom: 8px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 26px;
      color: $darkGrey;
      counter-increment: my-awesome-counter;

      &::before {
        content: counter(my-awesome-counter) ". ";
        margin-right: 20px;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 26px;
        color: $violet;
      }
    }
  }

  .small-text {
    margin: 0 0 8px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    color: $darkGrey;
  }

  .text-primary {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    color: $violet;
  }

  .button {
    display: inline-block;
    padding: 16px 30px;
    border: 0;
    border-radius: 5px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    text-decoration: none;
    color: $white;
    background: $violet;
    appearance: none;
    outline: 0;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
      background: $lightViolet;
    }

    @media (max-width: 1024px) {
      padding: 16px;
    }

    &.full {
      width: 100%;
    }

    &.light {
      color: $violet;
      background: rgba($violet, .1);

      &:hover {
        background: rgba($violet, .35);
      }
    }
  }
}
</style>
