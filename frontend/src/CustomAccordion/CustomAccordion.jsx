import { Accordion, Card, useAccordionButton } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function CustomAccordion({
    component,
    activeKey,
    setActiveKey,
    title,
}) {
    return (
        <Accordion activeKey={activeKey} flush className="mb-3 w-100">
            <Card className="border-0" style={{ background: 'transparent' }}>
                <div className="accordion-header px-2">
                    <span className="ms-1 d-flex flex-column justify-content-center align-items-center fw-bold">
                        {title}
                    </span>
                    <CustomToggle
                        eventKey="0"
                        activeKey={activeKey}
                        setActiveKey={setActiveKey}
                    >
                        New +
                    </CustomToggle>
                </div>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{component}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

function CustomToggle({ children, eventKey, activeKey, setActiveKey }) {
    const decoratedOnClick = useAccordionButton(eventKey)

    function toggleVisibility() {
        setActiveKey(activeKey === '0' ? null : '0')
        decoratedOnClick(eventKey)
    }

    return (
        <Button size="sm" variant="success" onClick={toggleVisibility}>
            {children}
        </Button>
    )
}
