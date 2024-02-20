import { useState } from 'react'
import { GoChevronDown, GoChevronLeft } from 'react-icons/go'
import './accordion.scss'

interface AccordionProps {
items: { 
  label: string; 
  content: string;
  key: string;
}[];
}

const Accordion = ({ items } : AccordionProps ) => {

// State to keep track of which accordion item is expanded
const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

// Toggle the expanded state of an accordion item, always close the open item when another is opened
const handleClick = (nextIndex: number) => {
  setExpandedIndex(current => current === nextIndex ? -1 : nextIndex)
};

if (!items || items.length === 0) {
  return <p>No data to display.</p>;
}

const renderedItems = items.map((item, index) => {
  const isExpanded = index === expandedIndex;

  // Prevent browser from automatically toggling the open attribute on details elements, then run handleClick
  const handleSummaryClick = (event: React.MouseEvent) => {
    event.preventDefault();
    handleClick(index);
  };

  return (
    <li key={item.key}>
      <details className='accordion-item' open={isExpanded}>
        <summary className='accordion-header' onClick={handleSummaryClick}>
          <h3>{item.label}</h3>
          {isExpanded ? <GoChevronDown aria-label="Arrow down" /> : <GoChevronLeft aria-label="Arrow left" />} 
        </summary>
        {isExpanded && <p className='accordion-content'>{item.content}</p>}
      </details>
    </li>
  )
});

return <ul className='accordion'>{renderedItems}</ul>
}

export default Accordion;
