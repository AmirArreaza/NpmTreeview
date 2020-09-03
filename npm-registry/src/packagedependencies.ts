/**
 * This type will act as wrapper of the response comming back from npm
 * it will format the data so we can present the transitive packages
 * in the response.
 */

export class Dependency{
    constructor(name: string, version: string){
        this.name = name;
        this.version = version;
    }
    name: string;
    version: string;

    dependencies?: Array<Dependency> = [];
}