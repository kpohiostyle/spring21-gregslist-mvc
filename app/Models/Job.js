export default class Job {
    constructor({ company, jobTitle, hours, rate, description, id }) {
        // NOTE it is no longer our job to generate Id's
        this.id = id
        this.company = company
        this.jobTitle = jobTitle
        this.hours = hours
        this.rate = rate
        this.description = description

    }

    get Template() {
        return `
    <div class="col-md-4 mb-3">
      <div class="card shadow">
          <h4 class="card-title">Company: ${this.company} | ${this.jobTitle}</h4>
          <div class="card-body">
              <h5 class="card-title">Pay Rate: ${this.rate} | Hours: ${this.hours}</h5>
              <p class="card-text">${this.description}</p>
          </div>
          <div class="px-3 pb-3 d-flex justify-content-between">
              <button type="button" class="btn btn-danger" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
          </div>
      </div>
    </div>
    `
    }
}