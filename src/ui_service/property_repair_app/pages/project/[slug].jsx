import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Description,
  Instructions,
  Invoice,
  InvoiceButton,
  Message,
  Notes,
  Photos,
  Quote,
  QuoteButton,
  Schedule,
} from "@components/ui/project";

export default function Project() {
  // Load Project By Selecting Project from Redux State
  const router = useRouter();
  const slug = router.query.slug;
  const id = parseFloat(slug);

  const { projects } = useSelector((state) => state.projectData);

  function selectProject(projects) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].project_id === id) {
        return projects[i];
      }
    }
    return null;
  }

  const project = selectProject(projects);

  // Functions for Opening and Closing the Quote and Invoice Components
  const [openQuote, setOpenQuote] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);

  const handleQuoteClick = () => {
    setOpenQuote((prevOpenQuote) => !prevOpenQuote); // Toggle the state
  };

  const handleInvoiceClick = () => {
    setOpenInvoice((prevOpenInvoice) => !prevOpenInvoice); // Toggle the state
  };

  return (
    <>
      {project ? (
        <div className="pt-36 pb-8">
          <div className="mx-10">
            <QuoteButton
              project={project}
              handleQuoteClick={handleQuoteClick}
            />
            <InvoiceButton
              project={project}
              handleInvoiceClick={handleInvoiceClick}
            />
          </div>
          {openInvoice && <Invoice />}
          {openQuote && <Quote />}
          <Description project={project} />
          <Instructions project={project} />
          <Message project={project} />
          <Notes project={project} />
          <Photos project={project} />
          <Schedule project={project} />
        </div>
      ) : (
        <div className="pt-36">Project Not Found</div>
      )}
    </>
  );
}
