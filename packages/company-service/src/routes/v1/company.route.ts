const ROUTE_PATHS = {
  COMPANY: {
    CREATE: "/",
    GETALL:"/",
    GET_BY_ID: "/:id",
    DELETE: "/:id",
    UPDATE: "/:id",
    // POST: "/postng",
  },
  POSTING: {
    POST: "/posting",
    GET_ALL_POST:"/posting",
    GET_BY_ID: "/post/:id",
    DELETE: "/post/:id",
    UPDATE: "/post/:id",
    // POST: "/postng",
  },
};
export default ROUTE_PATHS;
