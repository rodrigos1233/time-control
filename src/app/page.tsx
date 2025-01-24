import TimeControl from "@/app/components/time-control/timeControl";

export default function Home() {
    const currentYear = new Date().getFullYear();
    const startYear = 2025;
  return (
      <div className="flex flex-col items-stretch min-h-screen font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col md:flex-row items-stretch flex-grow">
              <div className="md:flex-[5_5_0%]">
                  <h1 className="text-center text-4xl">
                      CrikeTic.com
                  </h1>
              </div>
              <div className="md:flex-[4_4_0%] p-5 bg-secondaryBackground">
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
