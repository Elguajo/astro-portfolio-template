import type { APIRoute } from 'astro';
import getRobotTxt from '@hdud/common/libs/robot';

const robotTxt = await getRobotTxt()

export const GET: APIRoute = ({ site }) => {
    return new Response(robotTxt(site));
};
