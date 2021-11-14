import { isNil } from 'lodash'

export default {
  newContentAvailable: state => !isNil(state.SWRegistrationForNewContent),
  getJobById: state => id => {
    return state.jobs.find(item => item.id === id)
  },
  getJobs: state => (search, location, fullTime, nbItemToShow) => {
    let results = state.jobs

    if (search !== '') {
      results = results.filter(item => {
        return item.company.toLowerCase().includes(search.toLowerCase())
            || item.position.toLowerCase().includes(search.toLowerCase())
            || item.description.toLowerCase().includes(search.toLowerCase())
            || item.requirements.content.toLowerCase().includes(search.toLowerCase())
            || item.role.content.toLowerCase().includes(search.toLowerCase())
      })
    }

    if (location !== '') {
      results = results.filter(item => {
        return item.location.toLowerCase().includes(location.toLowerCase())
      })
    }

    if (fullTime) {
      results = results.filter(item => {
        return item.contract === 'Full Time'
      })
    }

    results = results.slice(0, nbItemToShow)

    return results
  }
}
