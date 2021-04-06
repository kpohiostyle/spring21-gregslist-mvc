import { ProxyState } from "../AppState.js";
import Job from "../Models/Job.js";
import { api } from "./AxiosService.js";


class JobsService {
    async getJobs() {
        let res = await api.get('jobs')
        console.log(res.data)
        ProxyState.jobs = res.data.map(j => new Job(j))
    }

    async createJob(newJob) {
        // NOTE post creates data in the server, the first argument to extend the url the second is the data to send
        let res = await api.post('jobs', newJob)
        console.log(res.data)


        // the lazy way
        // this.getCars()

        // the longhand way
        res.data.id = res.data._id
        let job = new Job(res.data)
        ProxyState.jobs = [...ProxyState.jobs, job]
    }

    async deleteJob(id) {
        // restful convention for a delete route is '/collectionName/:id' (the ':' indicates a variable value does not need to be added)
        await api.delete('jobs/' + id)
        ProxyState.job = ProxyState.jobs.filter(job => job.id != id)
    }

}

export const jobsService = new JobsService();