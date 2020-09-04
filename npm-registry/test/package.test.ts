import * as getPort from 'get-port';
import got from 'got';
import { Server } from 'http';
import { createApp } from '../src/app';

describe('/package/:name/:version endpoint', () => {
  let server: Server;
  let port: number;

  beforeAll(async (done) => {
    port = await getPort();
    server = createApp().listen(port, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const res: any = await got(
      `http://localhost:${port}/package/${packageName}/${packageVersion}`,
    ).json();

    expect(res.response.name).toEqual(packageName);
  });

  it('returns dependencies', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const res: any = await got(
      `http://localhost:${port}/package/${packageName}/${packageVersion}`,
    ).json();

    expect(res.response.dependencies[0].name).toEqual(
      'loose-envify'
    );
  });

  it('returns 404 Not Found', async () => {
    const packageName = 'UnexistingPackage';
    const packageVersion = '1.0.0';

    const res: any = await got(
      `http://localhost:${port}/package/${packageName}/${packageVersion}`,
    ).json().catch(error => {
      expect(error.name).toEqual("HTTPError");  
    });
  })
});
