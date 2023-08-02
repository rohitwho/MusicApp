import React from 'react';
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function Playlist() {

    return (
        <Accordion selectionMode="multiple">
            <AccordionItem key="1" aria-label="Pop" subtitle="Songs for You" title="Pop">
                
            </AccordionItem>
            <AccordionItem key="2" aria-label="HipHop/Rap" subtitle="Songs for You" title="HipHop/Rap">
                
            </AccordionItem>
            <AccordionItem key="3" aria-label="Rock'n Roll" subtitle="Songs for You" title="Rock'n Roll">
                
            </AccordionItem>
            <AccordionItem key="4" aria-label="EDM" subtitle="Songs for You" title="EDM">
                
            </AccordionItem>
            <AccordionItem key="5" aria-label="Country" subtitle="Songs for You" title="Country">
                
            </AccordionItem>
            <AccordionItem key="6" aria-label="Jazz" subtitle="Songs for You" title="Jazz">
                
            </AccordionItem>
            <AccordionItem key="7" aria-label="R&B/Soul" subtitle="Songs for You" title="R&B/Soul">
                
            </AccordionItem>
        </Accordion>

      );
}