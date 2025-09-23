import getPng from '@/components/pages/site_image'

export async function GET(context: APIContext) {
	const data = await getPng(context);
	return new Response(...data);
}
