const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    jobTitle: String,
    jobLocation: String,
    companyName: String,
    companyLogo: String,
    minPrice: String,
    maxPrice: String,
    salaryType: String,
    postingDate: String,
    experienceLevel: String,
    employmentType: String,
    description: String,
    postedBy: String,
});

// Export the Jobs model
module.exports = mongoose.model("Jobs", JobSchema);
