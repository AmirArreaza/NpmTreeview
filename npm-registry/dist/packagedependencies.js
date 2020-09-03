"use strict";
/**
 * This type will act as wrapper of the response comming back from npm
 * it will format the data so we can present the transitive packages
 * in the response.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = void 0;
var Dependency = /** @class */ (function () {
    function Dependency(name, version) {
        this.dependencies = [];
        this.name = name;
        this.version = version;
    }
    return Dependency;
}());
exports.Dependency = Dependency;
//# sourceMappingURL=packagedependencies.js.map