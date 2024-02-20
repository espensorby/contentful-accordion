interface AccordionItem {
  text: string; 
  name: string; 
  sys: {
    id: string;
  }
}

interface AccordionFields {
  title: string;
  internalName: string;
  accordionItemsCollection: { 
    items: AccordionItem[]
  }
}

interface AccordionData {
  accordionCollection: {
    items: AccordionFields[];
  }
}

export type { AccordionData, AccordionFields, AccordionItem }
