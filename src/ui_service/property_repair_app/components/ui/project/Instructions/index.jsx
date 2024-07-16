export default function Instructions({ project, children }) {
  return (
    <>
      {/* Conatainer Div */}
      <div className="rounded-3xl bg-white p-8 mx-10 mb-4">
        {/* Title Div */}
        <div className="text-3xl font-semibold underline mb-4">
          Instructions
        </div>
        {/* List Div */}
        <div className="text-xl">{project.instructions}</div>
      </div>
    </>
  );
}
