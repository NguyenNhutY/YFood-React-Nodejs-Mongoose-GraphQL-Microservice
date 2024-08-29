import React from "react";
import { Job } from "../../types/dbJobs";
import "./job.scss";
interface JobDetailProps {
  job: Job;
  onApply: (jobId: string) => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onApply }) => (
  <div className='job-detail'>
    <h2>{job.title}</h2>
    <ul>
      <li> {job.location}</li>
      <li>
        {job.applicationPeriod.startDate} -&gt;
        {job.applicationPeriod.endDate}
      </li>
      <li> {job.description}</li>
      <li> {job.responsibilities}</li>
      <li> {job.requirements}</li>
      <li> {job.preferredQualifications}</li>
      <li>{job.benefits}</li>
      <li> {job.careerGrowth}</li>
      <li> {job.workEnvironment}</li>
    </ul>

    <button className='application-success' onClick={() => onApply(job.id)}>
      Apply Now
    </button>
  </div>
);

export default JobDetail;
