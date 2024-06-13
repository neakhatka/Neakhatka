const ROUTE_PATHS = {
  COMPANY: {
    CREATE: "/",
    GETALL: "/",
    GET_BY_ID: "/{id}",
    DELETE: "/{id}",
    UPDATE: "/{id}",
  },
  POSTING: {
    POST: "/:companyid/jobs",  //   POST JOBS
    GET_ALL_POST: "jobs",       // GET ALL POST
    GET_BY_ID: "/:companyid/jobs/:id", // GET SPECIFIC JOB WITH COMPANY AND JOB ID
    DELETE: "/:companyid/jobs/:id",    // DELETE SPECIFIC JOB WITH COMPANY AND JOB ID
    UPDATE: "/:companyid/jobs/:id",   // UPDATE SPECIFIC JOB WITH COMPANY AND JOB ID
    GET_JOBS_BY_CID:"/:companyid/jobs",// GET ALL JOB THAT COMPANY POSTED
  },
};
export default ROUTE_PATHS;
