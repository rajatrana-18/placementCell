import CSVRepository from "./csv.repository.js";


export default class CSVController {
    constructor() {
        this.csvRepository = new CSVRepository();
    }

    // route to fetch all the data from the student model database.
    async getData(req, res, next) {
        try {
            console.log("csv server hit")
            const allData = await this.csvRepository.getData();
            res.status(200).redirect("/api/students/all")
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
}