export const runtime = "edge";
import TimeControl from "@/app/components/time-control/TimeControl";
import './i18n';
import { useTranslations } from "next-intl";

export default function Home() {
    const currentYear = new Date().getFullYear();
    const startYear = 2025;

    const t = useTranslations();

    type ListItemProps = {
        title: string;
        content: string;
    };

    const instructions: ListItemProps[] = t.raw("instructions");

    const ListItem: React.FC<ListItemProps> = ({ title, content }) => {
        return (
            <li>
                <span className="font-semibold">{title}</span> {content}
            </li>
        );
    };

    const footerYearDisplay = currentYear === startYear ? `${startYear}` : `${startYear} - ${currentYear}`;

  return (
      <div className="flex flex-col items-stretch min-h-screen font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col md:flex-row items-stretch flex-grow">
              <div className="md:flex-[5_5_0%] flex-grow flex flex-col justify-center gap-8 align-start p-2 md:p-20">
                  <h1 className=" text-4xl">
                      {t("title")}
                  </h1>
                  <p className="text-lg mb-6">
                      {t("description")}
                  </p>
                  <ul className="list-disc space-y-3 text-left pl-5">
                      {instructions.map((item, index) => (
                          <ListItem content={item.content} title={item.title} key={index} />
                      ))}
                  </ul>
              </div>
              <div className="md:flex-[4_4_0%] p-2 md:p-6 bg-secondaryBackground flex justify-center align-center">
                  <TimeControl/>
              </div>
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-2 md:p-6">
              <p className="font-extralight text-xs">
                  {t("footer", { year: footerYearDisplay })}
              </p>
          </footer>
      </div>
  );
}
