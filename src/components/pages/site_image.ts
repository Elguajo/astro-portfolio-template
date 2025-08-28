import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/site.config";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { getI18n } from "@/i18n/index"

const getLang = (pathname) => {
	for (const lang of ['en', 'zh-hant', 'ja', 'ko']) {
		if (pathname.indexOf(`/${lang}/`) === 0) return lang
	}
	return 'zh';
}

const ogOptions: SatoriOptions = {
	fonts: [
		{
			data: fs.readFileSync(path.resolve(process.cwd(), 'node_modules/@hdud/common/assets/汇文明朝体.otf')),
			name: "Huiwen",
			style: "normal",
			weight: 400,
		},
	],
	height: 630,
	width: 1200,
};

const markup = (i18n) =>
	html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
		<div tw="flex items-end justify-start w-full p-10 text-xl border-b border-[#2bbc89]">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="80px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
	      <path fill="none" stroke="#F39800" stroke-width="30" stroke-miterlimit="10" d="M982.021,418.117
		      c0,266.215-215.813,482.022-482.025,482.022c-266.212,0-482.021-215.807-482.021-482.022"/>
	      <path fill="none" stroke="#F39800" stroke-width="30" stroke-miterlimit="10" d="M345.601,745.744
		      c-180.942,0-327.625-146.686-327.625-327.626c0-180.942,146.683-327.625,327.625-327.625"/>
	      <path fill="none" stroke="#F39800" stroke-width="30" stroke-miterlimit="10" d="M654.396,90.493
		      c180.942,0,327.625,146.682,327.625,327.624S835.339,745.742,654.396,745.742"/>

		    <line fill="none" stroke="#F39800" stroke-width="30" stroke-miterlimit="10" x1="345.601" y1="436.191" x2="654.396" y2="436.191"/>

		    <line fill="none" stroke="#F39800" stroke-width="30" stroke-miterlimit="10" x1="669.346" y1="749.727" x2="669.346" y2="77.293"/>

		    <line fill="none" stroke="#F39800" stroke-width="30" stroke-miterlimit="10" x1="330.487" y1="754.469" x2="330.487" y2="82.033"/>
			</svg>
		  <p tw="ml-3 font-semibold">${i18n('mate.title')}</p>
		</div>
		<div class="flex flex-1 p-10 flex-col text-4xl">
		  <p>${i18n('mate.description')}</p>
		</div>
		<div class="flex p-10 flex-col text-4xl">
		  <p class="flex justify-end">By: ${siteConfig.author} (${siteConfig.site})</p>
		</div>
	</div>`;

export default async function(context) {
	const i18n = await getI18n(getLang(context.url.pathname), 'design')
	const svg = await satori(markup(i18n), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return [png, {
	  headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	}];
}
