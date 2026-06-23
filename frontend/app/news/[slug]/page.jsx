import Breadcrumb from "@/components/Breadcrumb";
import Category from "@/components/Category";
import RecentNews from "@/components/news/RecentNews";
import RelatedNews from "@/components/news/RelatedNews";
import HtmlParser from "react-html-parser";
import Search from "@/components/news/Search";
import { base_api_url } from "@/config/config";

const Details = async ({ params }) => {
  const { slug } = await params;

  const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
    next: {
      revalidate: 1,
    },
  });

  const { news, relatedNews } = await res.json();

  const formattedDescription = news?.description?.replace(
    /<iframe\b([^>]*)>/gi,
    (match, attrs) => {
      let newAttrs = attrs;

      // thêm style
      if (/style\s*=/i.test(newAttrs)) {
        newAttrs = newAttrs.replace(
          /style\s*=\s*["']([^"']*)["']/i,
          `style="$1; display:block; margin:0 auto"`,
        );
      } else {
        newAttrs += ` style="display:block; margin:0 auto"`;
      }

      // xử lý sandbox: nếu iframe là YouTube, đảm bảo có allow-scripts và allow-same-origin
      const srcMatch = /src\s*=\s*["']([^"']*)["']/i.exec(newAttrs);
      const src = srcMatch ? srcMatch[1] : "";
      const isYouTube = /youtube\.com|youtu\.be/.test(src);

      if (isYouTube) {
        if (/sandbox\s*=/i.test(newAttrs)) {
          newAttrs = newAttrs.replace(
            /sandbox\s*=\s*["']([^"']*)["']/i,
            (m, value) => {
              let permissions = value.split(" ").filter(Boolean);

              if (!permissions.includes("allow-scripts")) {
                permissions.push("allow-scripts");
              }

              if (!permissions.includes("allow-same-origin")) {
                permissions.push("allow-same-origin");
              }

              return `sandbox="${permissions.join(" ")}"`;
            },
          );
        } else {
          newAttrs += ` sandbox="allow-scripts allow-same-origin"`;
        }
      } else {
        if (/sandbox\s*=/i.test(newAttrs)) {
          newAttrs = newAttrs.replace(
            /sandbox\s*=\s*["']([^"']*)["']/i,
            (m, value) => {
              let permissions = value.split(" ").filter(Boolean);
              if (!permissions.includes("allow-scripts"))
                permissions.push("allow-scripts");
              if (!permissions.includes("allow-same-origin"))
                permissions.push("allow-same-origin");
              return `sandbox="${permissions.join(" ")}"`;
            },
          );
        }
      }

      return `<iframe${newAttrs}>`;
    },
  );

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={news?.category} two={news?.title} />
        </div>
      </div>

      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="flex flex-col gap-y-5 bg-white">
                  <img src={news?.image} alt="" />
                  <div className="flex flex-col gap-y-4 px-6 pb-6">
                    <h3 className="text-red-700 uppercase font-medium text-xl">
                      {news?.category}
                    </h3>
                    <h2 className="text-3xl text-gray-700 font-bold">
                      {news?.title}
                    </h2>
                    <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                      <span className="font-bold">{news?.date}</span>
                      <span className="font-bold">By {news?.writerName}</span>
                    </div>
                    <div>{HtmlParser(formattedDescription)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <Category titleStyle={"text-gray-700 font-bold"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <RelatedNews news={relatedNews} type="Related News" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
