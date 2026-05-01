import { Accordion, Card, useAccordionButton } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function CustomAccordion({
    component,
    activeKey,
    setActiveKey,
}) {
    return (
        <Accordion activeKey={activeKey} flush className="mb-3 w-75">
            <Card className="border-0">
                <div className="d-flex justify-content-between bg-secondary-subtle">
                    <span className="ms-1 d-flex flex-column justify-content-center align-items-center fw-bold">
                        Assignments
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

    function handleClick() {
        setActiveKey(activeKey === '0' ? null : '0')
        decoratedOnClick(eventKey)
    }

    return (
        <Button size="sm" variant="success" onClick={handleClick}>
            {children}
        </Button>
    )
}
