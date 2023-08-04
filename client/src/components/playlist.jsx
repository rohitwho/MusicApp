import React from 'react';
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function Playlist() {
    const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        
        <Accordion selectionMode="multiple">
            <AccordionItem key="1" aria-label="Pop" subtitle="Songs for You" title="Pop">
            {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="HipHop/Rap" subtitle="Songs for You" title="HipHop/Rap">
            {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Rock'n Roll" subtitle="Songs for You" title="Rock'n Roll">
            {defaultContent}
            </AccordionItem>
            <AccordionItem key="4" aria-label="EDM" subtitle="Songs for You" title="EDM">
            {defaultContent}
            </AccordionItem>
            <AccordionItem key="5" aria-label="Country" subtitle="Songs for You" title="Country">
            {defaultContent}
            </AccordionItem>
            <AccordionItem key="6" aria-label="Jazz" subtitle="Songs for You" title="Jazz">
            {defaultContent}
            </AccordionItem>
            <AccordionItem key="7" aria-label="R&B/Soul" subtitle="Songs for You" title="R&B/Soul">
            {defaultContent}
            </AccordionItem>
        </Accordion>
        
      );
}