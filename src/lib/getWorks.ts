import { getCollection } from "astro:content";

export const getWorks = async () => {
  const imageInfo = await getCollection('imageInfo')
  const worksData = await getCollection('works')
  const works = imageInfo.reduce((ans, item) => {
    const work = worksData.find(it => it.data.base === item.id);
    if (!work) {
		  throw new Error(`作品集${item.id}页面不存在, 请检查!`);
    }
    return [
      ...ans,
      {
    	  ...work,
    	  data: {
    	    ...work.data,
    	    members: item.data,
    	  },
      }
    ];
  }, []);
  return works;
}
