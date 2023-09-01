export default function Description({ project, children }) {
  return (
    <>
      <div>{project.company}</div>
      <div>{project.work_order}</div>
      <div>{project.address}</div>
      <div>
        {project.city}, {project.state} {project.zip_code}
      </div>
      <div>{project.pm_name}</div>
      <div>{project.pm_phone}</div>
      <div>{project.pm_email}</div>
      <div>{project.tenant_name}</div>
      <div>{project.tenant_phone}</div>
      <div>{project.tenant_email}</div>
    </>
  );
}
