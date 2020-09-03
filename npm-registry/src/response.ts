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

export class Dependency{
    constructor(name: string, version: string){
        this.name = name;
        this.version = version;
    }
    name: string;
    version: string;

    transitiveDependency?: Array<Dependency> = [];
}

export class ResponseWrapper {

    constructor(name: string, version: string){
        this.name = name;
        this.version = version;
    }
    name: string;
    version: string;
    dependencies?: Array<Dependency> = [];
}