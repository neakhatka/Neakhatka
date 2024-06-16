"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function unless(conditions, middleware) {
    return (req, res, next) => {
        const shouldskip = conditions.some((conditions) => {
            const pathMatches = req.path.startsWith(conditions.path);
            const methodMatches = !conditions.method || req.method === conditions.method;
            return pathMatches && methodMatches;
        });
        if (shouldskip) {
            return next();
        }
        else {
            middleware(req, res, next);
        }
    };
}
exports.default = unless;
//# sourceMappingURL=unless-route.js.map