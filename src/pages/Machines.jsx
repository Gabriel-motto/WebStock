import { useState } from "react";
import machinesData from "../dbMachines.json";
import { CardComponent } from "../components/card/card-component.jsx";
import { SelectComponent } from "../components/ui/select-component.jsx";
import { AccordionComponent } from "../components/ui/accordion-component.jsx"
import "./Machines.css";

export default function MachinesPage() {
    const [machines, setMachines] = useState(machinesData);
    const [assemblyLine, setAssemblyLine] = useState("");

    const handleAssemblyLineChange = (value) => {
        setAssemblyLine(value);
    }

    let filteredMachines = machines;
    if (assemblyLine !== "") {
        filteredMachines = machines.filter(
            (machine) => machine.assemblyLine === assemblyLine
        );
    }

    const uniqueValues = [];
    machines.map((value) => {
        if (!uniqueValues.includes(value.assemblyLine)) {
            uniqueValues.push(value.assemblyLine);
        }
    });

    return (
        <main>
            <SelectComponent
                className="select"
                values={uniqueValues}
                dataFromChild={handleAssemblyLineChange}
            />
            <div className="grid-machines">
                {filteredMachines.map((machine, index) => (
                    <CardComponent
                        key={index}
                        title={machine.id}
                        description={machine.text.substring(
                            machine.text.indexOf("/") + 2
                        )}
                        footer={machine.assemblyLine}
                    />
                ))}
            </div>
        </main>
    )
}
