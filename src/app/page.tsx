import TimeControl from "@/app/components/time-control/timeControl";

export default function Home() {
    const currentYear = new Date().getFullYear();
    const startYear = 2025;

    type ListItemProps = {
        title: string;
        content: string;
    };

    const listItems: ListItemProps[] = [
        {
            title: "Select a Duration:",
            content: "Choose from 15, 30, 45, or 60 minutes.",
        },
        {
            title: "Set Subdivisions:",
            content: "Break the time into smaller intervals for better focus.",
        },
        {
            title: "Hit Start:",
            content: "Watch the analog clock tick and track progress visually.",
        },
        {
            title: "Auditory Cues:",
            content: "Hear crickets at each interval and a bell when time is up.",
        },
        {
            title: "Stay on Track:",
            content: "Use visual and sound cues to manage your time effectively.",
        },
    ];

    const ListItem: React.FC<ListItemProps> = ({ title, content }) => {
        return (
            <li>
                <span className="font-semibold">{title}</span> {content}
            </li>
        );
    };

  return (
      <div className="flex flex-col items-stretch min-h-screen font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col md:flex-row items-stretch flex-grow">
              <div className="md:flex-[5_5_0%] flex flex-col justify-center gap-8 align-start p-20">
                  <h1 className=" text-4xl">
                      CrikeTic.com
                  </h1>
                  <p className="text-lg mb-6">
                      An interactive timer for focus, rhythm, and productivity.
                  </p>
                  <ul className="list-disc space-y-3 text-left pl-5">
                      {listItems.map((item, index) => (
                          <ListItem key={index} title={item.title} content={item.content}/>
                      ))}
                  </ul>
              </div>
              <div className="md:flex-[4_4_0%] p-5 bg-secondaryBackground flex justify-center align-center">
                  <TimeControl/>
              </div>
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-6">
              <p className="font-extralight text-xs">
              &copy; {currentYear === startYear ? `${startYear}` : `${startYear} - ${currentYear}`} Rodrigo Salazar. All
                  rights reserved.
              </p>
          </footer>
      </div>
  );
}
