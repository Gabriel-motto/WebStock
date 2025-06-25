import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { CardComponent } from "../components/card/card-component.jsx";
import { SelectComponent } from "../components/ui/select-component.jsx";
import "./Machines.css";

export default function MachinesPage() {
    const [machines, setMachines] = useState([]);
    const [assemblyLines, setAssemblyLines] = useState([]);
    const [selectedALine, setSelectedAline] = useState("");

    const handleAssemblyLineChange = (value) => {
        setSelectedAline(value);
    };

    useEffect(() => {
        async function getMachines() {
            const { data: machines } = await supabase
                .from("Machines")
                .select();
            setMachines(machines);
        }
        getMachines();
    }, []);

    useEffect(() => {
        async function getAssemblyLines() {
            const { data: assemblyLines } = await supabase
                .from("Assembly Lines")
                .select();
            setAssemblyLines(assemblyLines)
        }
        getAssemblyLines();
    }, []);

    let filteredMachines = machines;
    if (selectedALine !== "") {
        filteredMachines = machines.filter(
            (machine) => machine.assembly_line === selectedALine
        );
    }

    return (
        <main>
            <SelectComponent
                className="select"
                values={assemblyLines}
                dataFromChild={handleAssemblyLineChange}
            />
            <div className="grid-machines">
                {filteredMachines.map((machine, index) => (
                    <CardComponent
                        className="machines-card"
                        key={index}
                        title={machine.name}
                        description={machine.description}
                        footer={machine.assembly_line}
                    />
                ))}
            </div>
        </main>
    );
}
