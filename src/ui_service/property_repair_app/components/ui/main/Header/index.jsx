export default function ListHeader() {
  return (
    <>
      <div className="grid grid-cols-12 bg-black text-white rounded-t-lg">
        <div className="col-span-5">
          <div className="flex justify-center">Property Address</div>
        </div>
        <div className="col-span-2">
          <div className="flex justify-center">City</div>
        </div>
        <div className="">
          <div className="flex justify-center">State</div>
        </div>
        <div className="col-span-4">
          <div className="flex justify-center">Source</div>
        </div>
      </div>
    </>
  );
}
