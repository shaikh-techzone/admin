const express = require("express");

const user = require("../schemas/login");
const job = require("../schemas/job");
const activity = require("../schemas/activities");

const router = express.Router();

router.get("/admin/dashboard/job", async (req, res) => {
  const job_toast = req.flash("job_toast");
  let Admin, AdminEmail, Details;

  if (!req.session.user) {
    return res.status(401).redirect("/admin/login");
  } else {
    Admin = req.session.user;
    AdminEmail = req.session.email;
    await user
      .findOne({ email: AdminEmail })
      .then((result) => {
        Details = result;
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(Details)
    res.status(201).render("job", { title: "Admin | Job", Details, job_toast });
  }
});

router.post("/admin/dashboard/job", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).redirect("/admin/login");
  } else {
    let title = req.body.title;
    let location = req.body.location;
    let job_nature = req.body.job_nature;
    let salary_range = req.body.salary_range;
    let job_desc = req.body.job_desc;
    let responsibility = req.body.responsibility;
    let qualification = req.body.qualification;
    let vacancy = req.body.vacancy;
    let category = req.body.category;
    let company_detail = req.body.companydetails;
    let deadline = req.body.deadline;
    let city = req.body.city;

    const Job = new job({
      title,
      location,
      job_nature,
      salary_range,
      job_desc,
      responsibility,
      qualification,
      vacancy,
      category,
      company_detail,
      deadline,
      city,
    });
    Job.save()
      .then(() => {
        job_toast = {
          type: "success",
          intro: "Success!",
          message: ": Job created successfully!",
        };
        req.flash("job_toast", job_toast);

        res.status(201).redirect("/admin/dashboard/job");
      })
      .catch((err) => {
        job_toast = {
          type: "danger",
          intro: "Failed!",
          message: ": Job creation unsuccessfully!",
        };
        req.flash("job_toast", job_toast);

        res.status(201).redirect("/admin/dashboard/job");
        console.log(err);
      });
    let user = req.session.user;
    let task = `job ${title}`;

    const Activity = activity({
      user,
      task,
    })
      .save()
      .then(() => {})
      .catch((err) => {});
  }
});

module.exports = router;
