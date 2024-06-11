const ROUTE_PATHS = {
  COMPANY: {
    CREATE: "/",
    GETALL: "/get",
    GET_BY_ID: "/:id",
    DELETE: "/:id",
    UPDATE: "/:id",
    // POST: "/postng",
  },
  POSTING: {
    POST: "/postjob",
    GET_ALL_POST: "/postjob",
    GET_BY_ID: "/post/:id",
    DELETE: "/post/:id",
    UPDATE: "/post/:id",
    GET_FT_COMPANYID:"/posts",
    // POST: "/postng",
  },
};
export default ROUTE_PATHS;
