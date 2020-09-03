"use strict";
/**
 * This type will act as wrapper of the response comming back from npm
 * it will format the data so we can present the transitive packages
 * in the response.
 *
 * @example
 * {
 *   "name": "react",
     "version": "16.13.0",
 *   "dependencies": {
        "name": "loose-envify",
        "version": "1.4.0"
        "transitiveDependencies": {
            "name": ""
        }
 *
 *   }
 * }
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWrapper = exports.Dependency = void 0;
var Dependency = /** @class */ (function () {
    function Dependency(name, version) {
        this.transitiveDependency = [];
        this.name = name;
        this.version = version;
    }
    return Dependency;
}());
exports.Dependency = Dependency;
var ResponseWrapper = /** @class */ (function () {
    function ResponseWrapper(name, version) {
        this.dependencies = [];
        this.name = name;
        this.version = version;
    }
    return ResponseWrapper;
}());
exports.ResponseWrapper = ResponseWrapper;
//# sourceMappingURL=response.js.map