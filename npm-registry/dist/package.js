"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackage = void 0;
var got_1 = require("got");
var packagedependencies_1 = require("./packagedependencies");
/**
 * Attempts to retrieve package data from the npm registry and return it
 */
exports.getPackage = function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, name, version, rootPackage, response, dependencies, _c, _d, _i, dependencyName, dependencyVersion, innerDependency, loading, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = req.params, name = _b.name, version = _b.version;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, getPackageFromNPM(name)];
                case 2:
                    rootPackage = _e.sent();
                    response = new packagedependencies_1.Dependency(name, version);
                    console.log("Repository " + response.name + " found " + response.version);
                    dependencies = rootPackage.versions[version].dependencies;
                    _c = [];
                    for (_d in dependencies)
                        _c.push(_d);
                    _i = 0;
                    _e.label = 3;
                case 3:
                    if (!(_i < _c.length)) return [3 /*break*/, 6];
                    dependencyName = _c[_i];
                    dependencyVersion = dependencies[dependencyName].replace('^', '');
                    innerDependency = new packagedependencies_1.Dependency(dependencyName, dependencyVersion);
                    return [4 /*yield*/, getDependency(dependencyName, dependencyVersion, innerDependency)];
                case 4:
                    loading = _e.sent();
                    (_a = response.dependencies) === null || _a === void 0 ? void 0 : _a.push(innerDependency);
                    console.log(response);
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, res.status(200).json({ response: response })];
                case 7:
                    error_1 = _e.sent();
                    return [2 /*return*/, next(error_1)];
                case 8: return [2 /*return*/];
            }
        });
    });
};
function getDependency(name, version, outerDependency) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var innerDependency, innerPackage, transitivePackage, innerName, innerVersion, transitiveDependency, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    innerDependency = new packagedependencies_1.Dependency(name, version);
                    return [4 /*yield*/, getPackageFromNPM(name)];
                case 1:
                    innerPackage = _b.sent();
                    transitivePackage = innerPackage.versions[version].dependencies;
                    for (innerName in transitivePackage) {
                        innerVersion = transitivePackage[innerName];
                        transitiveDependency = new packagedependencies_1.Dependency(innerName, innerVersion);
                        getDependency(innerName, innerVersion, innerDependency);
                        (_a = outerDependency.dependencies) === null || _a === void 0 ? void 0 : _a.push(transitiveDependency);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    return [2 /*return*/, error_2];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getPackageFromNPM(pckg) {
    return __awaiter(this, void 0, void 0, function () {
        var transitive, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, got_1.default("https://registry.npmjs.org/" + pckg).json()];
                case 1:
                    transitive = _a.sent();
                    return [2 /*return*/, transitive];
                case 2:
                    error_3 = _a.sent();
                    return [2 /*return*/, error_3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=package.js.map