import { RequestHandler } from 'express';
import got from 'got';
import { NPMPackage } from './types';
import { ResponseWrapper, Dependency } from './response';

/**
 * Attempts to retrieve package data from the npm registry and return it
 */
export const getPackage: RequestHandler = async function (req, res, next) {
  const { name, version } = req.params;

  try {
    const rootPackage: NPMPackage = await getPackageFromNPM(name);

    let response = new ResponseWrapper(name, version);
    console.log("Repository " + response.name + " found " + response.version);

    const dependencies = rootPackage.versions[version].dependencies;
    for (let dependencyName in dependencies) {
      let dependencyVersion = dependencies[dependencyName].replace('^', '');
      let innerDependency = new Dependency(dependencyName, dependencyVersion);

      let innerPackage: NPMPackage = await getPackageFromNPM(dependencyName);
      const transitivePackage = innerPackage.versions[dependencyVersion].dependencies;
      
      for (let innerKey in transitivePackage) {
        let value = transitivePackage[innerKey];
        let transitiveDependency = new Dependency(innerKey, value);
        innerDependency.transitiveDependency?.push(transitiveDependency);
      }
      response.dependencies?.push(innerDependency);
      console.log(response);
    }
    return res.status(200).json({ response });
  } catch (error) {
    return next(error);
  }
};

async function getDependency(name, version, outerDependency){
  let innerDependency = new Dependency(name, version);
  let innerPackage: NPMPackage = await getPackageFromNPM(name);
  const transitivePackage = innerPackage.versions[version].dependencies;

  for (let innerName in transitivePackage) {
    let innerVersion = transitivePackage[innerName];
    let transitiveDependency = new Dependency(innerName, innerVersion);
    getDependency(innerName, innerVersion, innerDependency);
    innerDependency.transitiveDependency?.push(transitiveDependency);
  }
  outerDependency.transitiveDependency?.push(innerDependency);
}

async function getPackageFromNPM(pckg): Promise<NPMPackage> {
  try {
    const transitive: NPMPackage = await got(
      `https://registry.npmjs.org/` + pckg,
    ).json();

    return transitive;
  } catch (error) {
    return error;
  }

}