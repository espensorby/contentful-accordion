import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

interface AccordionProps {
items: { 
  label: string; 
  content: string;
  key: string;
}[];
}

const Accordion = ({ items } : AccordionProps ) => {

// State to keep track of which accordion item is expanded
const [expandedIndex, setExpandedIndex] = useState(-1);

// Toggle the expanded state of an accordion item, always close the open item when another is opened
const handleClick = (nextIndex: number) => {
  setExpandedIndex(current => current === nextIndex ? -1 : nextIndex)
};

if (!items || items.length === 0) {
  return <p>No data to display.</p>;
}

const renderedItems = items.map((item, index) => {
  const isExpanded = index === expandedIndex;
  const icon = (
    <span>
      {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
    </span>
  );

  return (
    <div key={item.key}>
      <div onClick={() => handleClick(index)}>
        <h3>{item.label}</h3>
        {icon}
      </div>
      {isExpanded && <div>{item.content}</div>}
    </div>
  )
});

return <div>{renderedItems}</div>
}

export default Accordion;
