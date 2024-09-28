export default function Post({ agent }) {
  if (!agent) {
    return <div>No Agents Found</div>;
  }

  return (
    <div className="relative flex justify-between flex-col mt-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 mx-3">
      <div className="p-4">
        <div className="flex justify-between">
          <h5 className="mb-2 text-slate-800 text-xl font-semibold">
            {agent.name}
          </h5>
        </div>

        <p className="text-slate-600 leading-normal font-light">
          {agent.detail}
        </p>
      </div>
      <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
        <span className="text-sm text-slate-500">
          {new Date(agent.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
