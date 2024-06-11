const ROUTE_PATHS = {
  COMPANY: {
    CREATE: "/",
    GETALL: "/",
    GET_BY_ID: "/:id",
    DELETE: "/:id",
    UPDATE: "/:id",
  },
  POSTING: {
    POST: "/jobs",
    GET_ALL_POST: "/jobs",
    GET_BY_ID: "/jobs/:id",
    DELETE: "/:companyid/jobs/:id",
    UPDATE: "/:companyid/jobs/:id",
    GET_JOBS_BY_CID:"/:companyid/jobs",
  },
};
export default ROUTE_PATHS;
