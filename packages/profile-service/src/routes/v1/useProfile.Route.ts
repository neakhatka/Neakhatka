const ROUTE_PATHS = {
  PROFILE: {
    CREATE:"/",
    GET_ALL: "/",
    UPDATE: "/:id", // As an example
    GET_BY_ID: "/:id",
    DELETE: "/:id",
    ADD_TO_FAVORITES: "/:postId/favorites",
  },
  // Define other route groups as needed
};

export default ROUTE_PATHS;
