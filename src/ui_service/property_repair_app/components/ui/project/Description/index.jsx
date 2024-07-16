export default function Description({ project, children }) {
  return (
    // Container Div
    <div>
      {/* Establish our rows div */}
      <div className="grid grid-rows-2 mx-10 mt-10">
        {/* First Row Div */}
        <div className="flex flex-row items-center justify-between rounded-3xl bg-white">
          {/* Address Div */}
          <div className="mx-auto">
            <div className="text-3xl font-semibold underline mb-4">Address</div>
            <div className="text-3xl font-bold">
              <div>{project.address}</div>
              <div>
                {project.city}, {project.state} {project.zip_code}
              </div>
            </div>
          </div>
          {/* Company/WO Div */}
          <div className="mx-auto space-y-4 tracking-wide">
            <div>
              <div className="text-xl font-semibold underline mb-2 ">
                Work Order
              </div>
              <div className="text-3xl font-semibold">
                <div>{project.wo}</div>
              </div>
              <div></div>
              <div>
                <div className="text-xl font-semibold underline mb-2 ">
                  Company
                </div>
                <div className="text-3xl font-semibold">
                  <div>{project.company}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Second Row Div */}
        <div className="flex flex-row w-full my-4">
          {/* Tenant Info Div */}
          <div className="flex flex-col w-full mr-2 font-medium">
            <div className="">
              <div className="">
                <div className="rounded-t-xl bg-white">
                  <div className="px-8 py-4">{project.tenant_name}</div>
                </div>
                <div className="text-white rounded-b-xl bg-black">
                  <div className="px-8 py-2">Tenant Name</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="rounded-t-xl bg-white">
                  <div className="px-8 py-4">{project.tenant_phone}</div>
                </div>
                <div className="text-white rounded-b-xl bg-black">
                  <div className="px-8 py-2">Tenant Phone Number</div>
                </div>
              </div>
            </div>
          </div>
          {/* PM Info Div */}
          <div className="w-full ml-2">
            <div className="">
              <div className="">
                <div className="rounded-t-xl bg-white">
                  <div className="px-8 py-4">{project.pm_name}</div>
                </div>
                <div className="text-white rounded-b-xl bg-black">
                  <div className="px-8 py-2">Property Manager Name</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="rounded-t-xl bg-white">
                  <div className="px-8 py-4">{project.pm_phone}</div>
                </div>
                <div className="text-white rounded-b-xl bg-black">
                  <div className="px-8 py-2">Property Manager Phone Number</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
