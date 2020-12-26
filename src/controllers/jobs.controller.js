const httpStatus = require("http-status");
const APIError = require("../utils/APIError");
const Job = require("../models/job.model");

exports.get = async (req, res) => {
  try {
    const response = { payLoad: {} };
    const page = parseInt(req.query.page) - 1 || 0;
    const pageSize = parseInt(req.query["page-size"]) || 10;
    const jobs = await Job.find()
      .sort({ dateTime: -1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .exec();
    response.payLoad = jobs;
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

exports.post = async (req, res) => {
  try {
    if (req.user.role !== "recruiter")
      throw new APIError(
        `Unauthorized only Recruiter can create a job`,
        httpStatus.UNAUTHORIZED
      );
    const response = { payLoad: {} };
    req.body.recruiter = req.user._id;
    const job = new Job(req.body);
    const createdJob = await job.save();
    if (!createdJob)
      throw new APIError(`Job not created`, httpStatus.INTERNAL_SERVER_ERROR);
    response.payLoad = createdJob;
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId))
      throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST);
    const response = { payLoad: {} };
    const job = await Job.findById(req.params.jobId).exec();
    response.payLoad = job;
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

exports.jobsByRecruiter = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const response = { payLoad: [] };
    const ObjectID = mongoose.Types.ObjectId;
    var query = {
      recruiter: new ObjectID(req.user._id),
    };
    const jobs = await Job.find(query);
    for (let index = 0; index < jobs.length; index++) {
      var job_id = jobs[index]["_id"];
      var application_count = await sql.query(
        `SELECT COUNT(*) as count FROM job_application WHERE job_id = '${job_id}'`
      );
      var save_count = await sql.query(
        `SELECT COUNT(*) as count FROM saved_job WHERE job_id = '${job_id}'`
      );
      var convertedJobJSON = JSON.parse(JSON.stringify(jobs[index]));
      convertedJobJSON.application_count = application_count[0].count;
      convertedJobJSON.save_count = save_count[0].count;
      response.payLoad.push(convertedJobJSON);
    }
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

exports.putOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId))
      throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST);
    const response = { payLoad: {}, message: "" };
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId).exec();
    if (!job)
      throw new APIError(
        `No job associated with id: ${jobId}`,
        httpStatus.NOT_FOUND
      );
    for (const key in req.body) {
      if (
        job.schema.obj.hasOwnProperty(key) &&
        key !== "id" &&
        key !== "_id" &&
        key !== "recruiter"
      ) {
        job[key] = req.body[key];
      }
    }
    const updatedJob = await job.save();
    if (updatedJob) {
      response.message = "SUCCESS";
      response.payLoad = updatedJob;
    } else {
      throw new APIError(
        `Job with id: ${jobId} not updated`,
        httpStatus.NOT_FOUND
      );
    }
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId))
      throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST);
    const response = { payLoad: {}, message: "" };
    const deleteJob = await Job.findByIdAndDelete(req.params.jobId).exec();
    if (deleteJob) {
      response.message = "SUCCESS";
      res.status(httpStatus.OK);
      res.send(response);
    } else {
      throw new APIError(
        `Job with id: ${req.params.jobId} not deleted`,
        httpStatus.NOT_FOUND
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.recommendation = async (req, res, next) => {
  try {
    const user = await Applicant.findOne({ id: req.user._id }).exec();
    const skills = user.skills ? user.skills : [];
    const response = { payLoad: [] };
    const jobs = await Job.find().exec();
    let passesCriteria = false;
    for (let index = 0, addCount = 0; index < jobs.length; index++) {
      const element = jobs[index];
      if (skills.length > 0 && element.skills) {
        passesCriteria = false;
        skills.forEach((skill) => {
          if (element.skills.includes(skill)) passesCriteria = true;
        });
      }
      if (passesCriteria && addCount < 12) {
        response.payLoad.push(element);
        jobs.splice(index, 1);
        addCount++;
      }
    }
    if (response.payLoad.length < 12) {
      let lat = null;
      let long = null;
      if (user.address) {
        if (user.address.coordinates) {
          lat = user.address.coordinates.latitude
            ? user.address.coordinates.latitude
            : null;
          long = user.address.coordinates.longitude
            ? user.address.coordinates.longitude
            : null;
        }
        for (let index = 0; index < jobs.length; index++) {
          const element = jobs[index];
          response.payLoad.push(element);
          jobs.splice(index, 1);
        }
      }
    }
    if (response.payLoad.length < 12) {
      for (let index = 0; index < jobs.length && index < 10; index++) {
        const element = jobs[index];
        response.payLoad.push(element);
        jobs.splice(index, 1);
      }
    }

    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    next(error);
  }
};
