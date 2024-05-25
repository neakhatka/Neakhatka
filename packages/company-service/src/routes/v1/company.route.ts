const ROUTE_PATHS = {
  COMPANY: {
    CREATE: "/",
    GET_BY_ID: "/:id",
    DELETE: "/:id",
    UPDATE: "{id}",
    // POST: "/postng",
  },
  POSTING: {
    POST: "/posting",
    GET_BY_ID: "/post/:id",
    DELETE: "/post/:id",
    UPDATE: "/post{id}",
    // POST: "/postng",
  },
};
export default ROUTE_PATHS;
