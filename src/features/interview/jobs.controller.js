import axios from "axios";

export default class JobsController {

    // function to fetch external jobs api
    async getJobsPage(req, res, next) {
        try {
            console.log("github hit")
            const gitHubJobs = await axios.get("https://github.com/topics/github-jobs-api");
            res.send(gitHubJobs.data);
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
}