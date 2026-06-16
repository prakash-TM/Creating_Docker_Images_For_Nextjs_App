export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <p className="max-w-lg text-lg leading-8 text-red-600 dark:text-zinc-400">
            Day 2 - Creating docker image and push to docker hub
          </p>
        </div>
      </main>
    </div>
  );
}
