import { ProxyState } from "../AppState.js";
import { jobsService } from "../Services/JobsService.js";


//Private
function _draw() {
    let jobs = ProxyState.jobs
    let template = ''
    jobs.forEach(job => {
        template += job.Template
    })
    document.getElementById('jobs').innerHTML = template
}
// function showHouses() {
//     let house = (document.getElementById("houseApp"))
//     if (!car.classList('d-none')) {
//         car.classList.add('d-none')
//     } else {
//         car.classList.remove('d-none')
//     }
// }
// showCars()


//Public
export default class JobsController {
    constructor() {
        ProxyState.on('jobs', _draw);

        // REVIEW
        // GET CARS ON LOAD
        this.getJobs()
    }

    async getJobs() {
        try {
            await jobsService.getJobs()
        } catch (error) {
            console.error(error)
        }
    }

    async createJob() {
        try {
            window.event.preventDefault()
            const form = window.event.target
            let newJob = {
                // @ts-ignore
                company: form.company.value,
                // @ts-ignore
                jobTitle: form.jobTitle.value,
                // @ts-ignore
                hours: form.hours.value,
                rate: form.rate.value,
                // @ts-ignore  this converts the string to a number
                description: form.description.value,
                // @ts-ignore

            }
            await jobsService.createJob(newJob)

            // @ts-ignore
            form.reset()

            $('#new-job-form').modal('hide')
        } catch (error) {
            console.error(error)
        }
    }


    deleteJob(id) {
        try {
            jobsService.deleteJob(id)
        } catch (error) {
            console.error(error)
        }
    }

}