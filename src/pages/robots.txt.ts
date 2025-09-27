import type { APIRoute } from 'astro';
import getRobotTxt from '@hdud/common/libs/robot';

const robotTxtFactoryPromise = getRobotTxt() as unknown as Promise<unknown>;
const robotTxtFactory = (await robotTxtFactoryPromise) as (site: URL | undefined) => string;

export const GET: APIRoute = ({ site }) => {
  return new Response(robotTxtFactory(site));
};
