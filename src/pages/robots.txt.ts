import type { APIRoute } from 'astro';
import getRobotTxt from '@hdud/common/libs/robot';

type RobotTxtFactory = Awaited<ReturnType<typeof getRobotTxt>>;

const robotTxtFactoryPromise = getRobotTxt() as Promise<RobotTxtFactory>;

export const GET: APIRoute = async ({ site }) => {
  const robotTxtFactory = await robotTxtFactoryPromise;
  return new Response(robotTxtFactory(site));
};
