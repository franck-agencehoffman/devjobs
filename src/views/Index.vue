<template>
  <div class="page-wrapper" :class="{ 'is-dark': mode === 'dark' }">
    <div class="tools-container" :class="{ 'is-tablet': device === 'tablet','is-mobile': device === 'mobile' }">
      <div class="tool-filter">
        <div class="input-wrapper">
          <svg v-if="device !== 'mobile'" xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24"><path fill="#5964E0" fill-rule="evenodd" d="M16.024 15.059h1.088l6.832 6.845-2.04 2.04-6.845-6.832v-1.081l-.377-.377a8.844 8.844 0 0 1-5.784 2.143A8.898 8.898 0 0 1 0 8.898 8.898 8.898 0 0 1 8.898 0a8.898 8.898 0 0 1 8.899 8.898c0 2.211-.808 4.23-2.15 5.784l.377.377ZM2.738 8.899a6.16 6.16 0 1 0 12.322-.002 6.16 6.16 0 0 0-12.322.001Z" clip-rule="evenodd"/></svg>
          <input type="text" :placeholder="device !== 'desktop' ? 'Filter by title...' : 'Filter by title, companies, expertise...'" v-model="search" />
        </div>
      </div>
      <div v-if="device !== 'mobile'" class="tool-filter">
        <div class="input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="17" height="24" viewBox="0 0 17 24"><path fill="#5964E0" fill-rule="evenodd" d="M8.448 0a8.3 8.3 0 0 1 5.91 2.451c2.922 2.925 3.285 8.427.777 11.774l-6.687 9.669-6.697-9.682c-2.499-3.334-2.136-8.836.786-11.76A8.3 8.3 0 0 1 8.447 0ZM5.474 8.29a3.057 3.057 0 0 0 3.05 3.056 3.057 3.057 0 0 0 3.052-3.055 3.057 3.057 0 0 0-3.051-3.055 3.057 3.057 0 0 0-3.051 3.055Z" clip-rule="evenodd"/></svg>
          <input type="text" placeholder="Filter by location..." v-model="location" />
        </div>
      </div>
      <div class="tool-filter">
        <div v-if="device !== 'mobile'" class="checkbox-wrapper">
          <input id="fullTime" class="checkbox-input" type="checkbox" name="fullTime" v-model="fullTime" />
          <label for="fullTime" class="checkbox-label">{{ device !== 'desktop' ? 'Full Time' : 'Full Time Only' }}</label>
        </div>

        <button v-if="device === 'mobile'" class="button transparent" type="button" @click.prevent="toggleFilters">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1076 1.50591e-06H0.860224C0.538187 -0.000593357 0.243138 0.175089 0.0960199 0.454871C-0.0531279 0.738422 -0.0269509 1.07987 0.163593 1.33883L6.84866 10.5411C6.85089 10.5443 6.85333 10.5473 6.85556 10.5504C7.09845 10.8709 7.22995 11.2591 7.23056 11.6579V19.1605C7.22914 19.3825 7.31842 19.5961 7.47853 19.7537C7.63884 19.9112 7.85677 20 8.08405 20C8.19951 19.9998 8.31396 19.9774 8.4207 19.934L12.1772 18.5345C12.5136 18.4339 12.7371 18.1236 12.7371 17.75V11.6579C12.7377 11.2591 12.8692 10.8709 13.1118 10.5504C13.1141 10.5473 13.1165 10.5443 13.1187 10.5411L19.804 1.33864C19.9946 1.07987 20.0207 0.73862 19.8716 0.45507C19.7247 0.175089 19.4294 -0.000593357 19.1076 1.50591e-06Z" fill="#6E8098"/>
          </svg>
        </button>

        <button class="button" type="button" @click.prevent="onSearch">
          <span v-if="device !== 'mobile'">Search</span>
          <svg  v-if="device === 'mobile'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3533 12.549H14.2603L19.9529 18.2531L18.2531 19.9529L12.549 14.2603V13.359L12.2353 13.0453C10.9405 14.1576 9.25775 14.8307 7.41535 14.8307C3.31979 14.8307 0 11.5109 0 7.41535C0 3.31979 3.31984 0 7.41535 0C11.5109 0 14.8306 3.31979 14.8306 7.41535C14.8306 9.25775 14.1576 10.9405 13.0396 12.2353L13.3533 12.549ZM2.28166 7.41535C2.28166 10.2503 4.58043 12.549 7.41535 12.549C10.2503 12.549 12.549 10.2503 12.549 7.41535C12.549 4.58043 10.2503 2.28166 7.41535 2.28166C4.58043 2.28166 2.28166 4.58043 2.28166 7.41535Z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="device === 'mobile'" class="filter-popup" :class="{ 'is-active': showPopup }" @click.stop.prevent.self="closeFilters">
      <div class="popup-container">
        <div class="input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="17" height="24" viewBox="0 0 17 24"><path fill="#5964E0" fill-rule="evenodd" d="M8.448 0a8.3 8.3 0 0 1 5.91 2.451c2.922 2.925 3.285 8.427.777 11.774l-6.687 9.669-6.697-9.682c-2.499-3.334-2.136-8.836.786-11.76A8.3 8.3 0 0 1 8.447 0ZM5.474 8.29a3.057 3.057 0 0 0 3.05 3.056 3.057 3.057 0 0 0 3.052-3.055 3.057 3.057 0 0 0-3.051-3.055 3.057 3.057 0 0 0-3.051 3.055Z" clip-rule="evenodd"/></svg>
          <input type="text" placeholder="Filter by location..." v-model="location" />
        </div>

        <div class="checkbox-wrapper">
          <input id="fullTimeMobile" class="checkbox-input" type="checkbox" name="fullTime" :checked="fullTime" @click.stop.prevent="toggleFullTime" />
          <label for="fullTimeMobile" class="checkbox-label" @click.stop.prevent="toggleFullTime">Full Time Only</label>
        </div>

        <button class="button full" type="button" @click.stop.prevent.self="onSearch">Search</button>
      </div>
    </div>

    <div class="jobs-listing">
      <div v-for="(job, index) in jobsToShow" :key="index" class="job-item" @click.prevent="onDetails(job.id)">
        <div class="job-logo" :style="`background: ${ job.logoBackground };`">
          <img class="logo" :src="job.logo" :alt="job.position">
        </div>
        <p class="job-time">{{ job.postedAt }} &bull; {{ job.contract }}</p>
        <h2 class="job-position">{{ job.position }}</h2>
        <p class="job-company">{{ job.company }}</p>
        <p class="job-location">{{ job.location }}</p>
      </div>
    </div>

    <button v-if="jobs.length > jobsToShow.length && jobsToShow.length === nbJobsToShow" class="button load-more" type="button" @click.prevent="onLoadMore">Load More</button>
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
    ...mapState('app', ['appTitle', 'mode', 'jobs']),
    ...mapGetters('app', ['getJobs']),
    jobsToShow: {
      get () {
        return this.getJobs(this.params.search, this.params.location, this.params.fullTime, this.params.nbJobsToShow)
      },

      set () {}
    }
  },
  data() {
    return {
      params: {
        search: '',
        location: '',
        fullTime: '',
        nbJobsToShow: 12
      },
      search: '',
      location: '',
      fullTime: false,
      nbJobsToShow: 12,
      device: 'desktop',
      showPopup: false
    }
  },
  methods: {
    onSearch() {
      this.nbJobsToShow = 12
      this.params.search = this.search
      this.params.location = this.location
      this.params.fullTime = this.fullTime
      this.params.nbJobsToShow = this.nbJobsToShow

      if (this.device === 'mobile' && this.showPopup)
        this.showPopup = false
    },
    onLoadMore() {
      this.nbJobsToShow += 3
      this.params.nbJobsToShow = this.nbJobsToShow
    },
    handleDevice() {
      if (window.innerWidth <= 699) {
        this.device = 'mobile'
      } else if (window.innerWidth <= 1024) {
        this.device = 'tablet'
      } else {
        this.device = 'desktop'
      }
    },
    closeFilters() {
      this.showPopup = false
    },
    toggleFilters() {
      this.showPopup = !this.showPopup
    },
    toggleFullTime() {
      this.fullTime = !this.fullTime
    },
    onDetails(id) {
      this.$router.push({ name: 'single', params: { id }})
    }
  },
  mounted() {
    this.handleDevice()

    window.addEventListener('resize', this.handleDevice)
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  height: 100%;
  padding: 80px 165px 104px;

  @media (max-width: 1024px) {
    padding: 85px 40px 60px;
  }

  @media (max-width: 699px) {
    padding: 85px 24px 62px;
  }

  &.is-dark {
    .tools-container {
      overflow: hidden;
    }

    .tool-filter,
    .jobs-listing .job-item {
      background: $darkBlue;
    }

    .jobs-listing .job-time,
    .jobs-listing .job-company {
      color: $grey;
    }

    .jobs-listing .job-position,
    .checkbox-label {
      color: $white;
    }

    .checkbox-input {
      background: rgba($white, .1);
    }

    .filter-popup {
      .popup-container {
        background: $darkBlue;
      }
    }

    .button.transparent {
      svg path {
        fill: $white;
      }
    }
  }

  .tools-container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: stretch;
    width: 100%;
    margin-top: -120px;
    border-radius: 6px;
    background: $white;
  }

  .tool-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% / 3);
    padding: 16px 16px 16px 32px;
    border-right: 1px solid rgba($darkGrey, .2);

    &:last-of-type {
      border-right: 0;
    }

    @media (max-width: 1024px) {
      padding: 16px 16px 16px 24px;
    }

    @media (max-width: 699px) {
      border-right: 0;
      width: auto;
    }
  }

  .input-wrapper {
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    input {
      width: 100%;
      margin: 0;
      padding: 0;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 16px;
      color: $grey;
      border: 0;
      background: transparent;

      &:focus,
      &:active {
       outline: 0;
      }
    }
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    margin-right: 28px;
  }

  .checkbox-label {
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    user-select: none;
    cursor: pointer;
  }

  .checkbox-input {
    position: relative;
    width: 24px;
    height: 24px;
    margin-right: 16px;
    color: $darkBlue;
    border-radius: 3px;
    appearance: none;
    outline: 0;
    cursor: pointer;
    background: rgba($darkBlue, .1);
    transition: background .4s ease-in-out;

    &:hover {
      background: rgba($violet, .25);
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 6.56948L4.57248 10.142L13.7144 1' stroke='white' stroke-width='2'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto;
      opacity: 0;
      transform: translate(-50%, -50%);
    }

    &:checked {
      background: $violet;

      &::before {
        opacity: 1;
      }

      ~ label::before {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
  }

  .jobs-listing {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 11px;
    grid-row-gap: 40px;
    margin-top: 105px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      margin-top: 70px;
    }

    @media (max-width: 425px) {
      grid-template-columns: 1fr;
      grid-gap: 49px;
    }

    .job-item {
      padding: 0 32px 36px;
      border-radius: 6px;
      background: $white;
      cursor: pointer;
    }

    .job-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin-top: calc(-25px);
      border-radius: 15px;
    }

    .job-time {
      margin: 24px 0 0;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 16px;
      color: $grey;
    }

    .job-position {
      margin: 13px 0 0;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 20px;
      color: $darkBlue;
    }

    .job-company {
      margin: 17px 0 0;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 16px;
      color: $grey;
    }

    .job-location {
      margin: 41px 0 0;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 14px;
      color: $violet;
    }
  }

  .filter-popup {
    position: fixed;
    inset: 0;
    z-index: 5;
    display: none;
    justify-content: center;
    align-items: center;
    background: rgba(black, .5);

    &.is-active {
      display: flex;
    }

    .popup-container {
      width: calc(100% - 48px);
      margin: 0 auto;
      border-radius: 6px;
      background: $white;
    }

    .input-wrapper {
      padding: 24px;
      border-bottom: 1px solid rgba($darkGrey, .2);
    }

    .checkbox-wrapper {
      padding: 24px;
    }

    .button {
      max-width: calc(100% - 48px);
      margin: 0 24px 24px;
    }
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

    &.load-more {
      display: block;
      margin: 56px auto 0;

      @media (max-width: 1024px) {
        padding: 16px 30px;
      }

      @media (max-width: 699px) {
        margin: 32px auto 0;
      }
    }

    &.full {
      width: 100%;
    }

    &.transparent {
      background: transparent;

      &:hover {
        background: transparent;
      }
    }
  }
}
</style>
