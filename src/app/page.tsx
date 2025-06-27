import Board from '@/components/kanban/Board';

export default function Home() {
  return (
    <div className="w-screen min-w-5xl min-h-screen h-screen font-sans p-8 overflow-auto">
      <main className="flex flex-col gap-[32px] w-fit mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Task Management
        </h1>
        <Board />
      </main>
    </div>
  );
}
